const router = require("express").Router();
const { requireAuth } = require("../../utils/auth");
const asyncHandler = require("express-async-handler");
const {
  User,
  UserDetail,
  Dog,
  DogProfile,
  Image,
  image_User,
} = require("../../db/models");
const {
  singlePublicFileUpload,
  singleMulterUpload,
} = require("../../utils/awsS3");

router.get(
  "/:userId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const userProfile = await User.findByPk(userId, {
      include: [
        {
          model: UserDetail,
          include: { model: Image, as: "Avatar" },
        },
        {
          model: Dog,
          include: [
            { model: DogProfile },
            { model: Image, as: "ProfileImage" },
          ],
        },
      ],
    }).catch((e) => console.error(e));
    // console.log("USER PROFILE ->", userProfile.toJSON());
    return res.json(userProfile.toJSON());
  })
);

router.get(
  "/:userId/status",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const userDetails = await User.findByPk(userId, {
      include: {
        model: UserDetail,
      },
    }).then((user) => user.toJSON());
    return res.json(userDetails.UserDetail.status);
  })
);

router.post(
  "/status",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { status } = req.body;

    const updatedStatusTime = await req.user
      .getUserDetail()
      .then((userDetail) => userDetail.update({ status }))
      .then((updatedUserDetail) => updatedUserDetail.toJSON())
      .then((userDetailObj) => {
        const now = new Date();
        return userDetailObj.updatedAt
          ? userDetailObj.updatedAt
          : now.toLocaleString();
      })
      .catch((e) => console.error(e));

    return res.json(updatedStatusTime);
  })
);

router.get(
  "/me/phone",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    // console.log(req.user.id, "user.id");
    // const userDetail = await UserDetail.findOne({
    //   where: { userId: req.user.id },
    // });
    // req.user.update();
    // const user = req.user.toJSON();
    // console.log(req.user.phoneNumber, "PHONE NUMBER");
    res.json(req.user.phoneNumber);
  })
);

router.post(
  "/me/phone",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { newNumber } = req.body;
    await req.user.update({ phoneNumber: newNumber });
    const user = req.user.toJSON();

    return res.json(user);
  })
);

router.get(
  "/me/dogs/pics",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    // should send all of the dog profile picture URL's
    // the user is able to select one of these as their avatar
    // include any User profile pictures

    const userDogs = await Dog.findAll({
      where: { ownerId: req.user.id },
      include: [{ model: Image, as: "ProfileImage" }],
    });
    const dogPics = userDogs.map((dog) => {
      return dog.ProfileImage.info;
    });
    return res.json(dogPics);
  })
);

router.post(
  "/me/avatar",
  requireAuth,
  singleMulterUpload("avatar"),
  asyncHandler(async (req, res, next) => {
    const { imageId } = req.body;
    const userDetail = await req.user.getUserDetail();

    if (imageId && userDetail) {
      let userDog = await Dog.findOne({ where: { profileImageId: imageId } });
      userDog = userDog.toJSON();
      if (userDog.ownerId === req.user.id) {
        userDetail.profileImageId = Number(imageId);
        await userDetail.save();
        let image = await Image.findByPk(imageId);
        let { URL } = image.toJSON();
        return res.json(URL);
      } else {
        next(new Error("USER NOT OWNER OF DOG PICTURE"));
        return res.json({ message: "reload" });
      }
    }
    if (!imageId && req.file) {
      // console.log("no imageId!");
      // console.log(req.file, "req.files");
      const avatarURL = await singlePublicFileUpload(req.file);
      // console.log(avatarURL);
      const newImage = await Image.create(
        {
          URL: avatarURL,
        },
        { returning: true }
      );
      image_User.create({
        userId: req.user.id,
        imageId: newImage.id,
      });
      userDetail.profileImageId = newImage.id;
      await userDetail.save();

      return res.json(avatarURL);
    }
  })
);

module.exports = router;
