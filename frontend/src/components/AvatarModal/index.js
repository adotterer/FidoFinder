import { Modal } from "../../context/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleAvatarModal } from "../../store/avatar_actions";

export default function AvatarModal() {
  const dispatch = useDispatch();
  const avatarRedux = useSelector((state) => state.avatarModal);

  return (
    <>
      <button onClick={() => dispatch(toggleAvatarModal(true))}>
        Change avatar
      </button>
      {avatarRedux.open && (
        <Modal onClose={() => dispatch(toggleAvatarModal(false))}>
          It's the edge of glory
        </Modal>
      )}
    </>
  );
}
