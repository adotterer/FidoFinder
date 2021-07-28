import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { uploadAvatar } from "../../store/avatar_actions";
import "./avatar.css";

export default function SetAvatarInterFace() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const [avatar, setAvatar] = useState();
  const [dogAvatar, setDogAvatar] = useState();
  const [dogPics, setDogPics] = useState();

  useEffect(() => {
    console.log("avatar", dogAvatar);
  }, [dogAvatar]);

  useEffect(() => {
    if (!dogPics) {
      fetch("/api/user/me/dogs/pics")
        .then((res) => res.json())
        .then((resBody) => {
          setDogPics(resBody);
          console.log("resbody", resBody);
        });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (avatar) {
      dispatch(uploadAvatar(avatar));
    }
  };

  return (
    <div className="avatar__interface">
      <form onSubmit={handleSubmit}>
        {avatar && (
          <img
            className="img__preview"
            alt="preview"
            src={avatar ? URL.createObjectURL(avatar) : null}
          />
        )}
        <label>
          <h3>Upload Image</h3>
          <div>
            <input
              name="avatar"
              type="file"
              onChange={(e) => {
                setAvatar(e.target.files[0]);
                setDogAvatar();
              }}
              accept="image/x-png,image/gif,image/jpeg"
            />
          </div>
        </label>
        {dogPics && (
          <label>
            <h3>Or choose an existing photo</h3>
            {dogPics.map((dogURL) => {
              return (
                <div
                  className="avatar__dog__container"
                  onClick={() => {
                    setAvatar();
                    setDogAvatar(dogURL.id);
                  }}
                >
                  <img
                    className="avatar__dog__choose"
                    key={dogURL}
                    src={dogURL.URL}
                  />
                </div>
              );
            })}
          </label>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
