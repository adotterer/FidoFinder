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

    const updatedStatusTime = await User.findByPk(req.user.toJSON().id)
      .then((user) => user.getUserDetail())
      .then((userDetail) => userDetail.update({ status }))
      .then((updatedUserDetail) => updatedUserDetail.toJSON())
      .then((userDetailObj) => {
        const now = new Date();
        return userDetailObj.updatedAt
          ? userDetailObj.updatedAt
          : now.toLocaleString();
      })
      .catch((e) => console.error(e));
    console.log(updatedStatusTime);
    return res.json(updatedStatusTime);
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
    if (imageId) {
      let userDog = await Dog.findOne({ where: { profileImageId: imageId } });
      userDog = userDog.toJSON();
      if (userDog.ownerId === req.user.id) {
        const userDetail = await req.user.getUserDetail();
        console.log("setting imageId", imageId);
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
      image_User.create({
        userId: sessionUserId,
        chatRoomId: newChatRoom.id,
      });

      return res.json(avatarURL);
    }
  })
);

module.exports = router;
