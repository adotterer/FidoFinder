import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { uploadAvatar } from "../../store/avatar_actions";
import "./avatar.css";

export default function SetAvatarInterFace() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const [avatar, setAvatar] = useState();
  const [dogPics, setDogPics] = useState();

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
    dispatch(uploadAvatar(avatar));
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
              onChange={(e) => setAvatar(e.target.files[0])}
              accept="image/x-png,image/gif,image/jpeg"
              required
            />
          </div>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
