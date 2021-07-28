import { useDispatch } from "react-redux";

export default function SetAvatarInterFace() {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState();

  const handleSubmit = async (e) => {
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
          />
        </div>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
