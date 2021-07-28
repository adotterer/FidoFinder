import { useSelector } from "react-redux";
import NewDogModal from "../NewDogModal";
import AvatarModal from "../AvatarModal";

function ProfileMe({ userId }) {
  const sessionUser = useSelector((state) => state.session.user);

  if (Number(sessionUser.id) !== Number(userId)) return null;
  else {
    return (
      <div>
        <NewDogModal />
        <AvatarModal />
      </div>
    );
  }
}

export default ProfileMe;
