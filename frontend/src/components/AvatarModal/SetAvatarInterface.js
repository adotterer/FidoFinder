import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadAvatar } from "../../store/avatar_actions";

export default function SetAvatarInterFace() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [avatar, setAvatar] = useState();

  const handleSubmit = async (e) => {
    dispatch(uploadAvatar(avatar, sessionUser.id));
  };

  return (
    <form onSubmit={handleSubmit}>
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
  );
}
