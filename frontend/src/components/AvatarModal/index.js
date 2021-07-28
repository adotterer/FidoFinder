import { Modal } from "../../context/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleAvatarModal } from "../../store/avatar_actions";

export default function AvatarModal() {
  const dispatch = useDispatch();
  const avatarRedux = useSelector((state) => {
    console.log(state);
    return state.avatarActions;
  });

  return (
    <>
      <button onClick={() => dispatch(toggleAvatarModal(true))}>
        Change avatar
      </button>
      {avatarRedux.open && (
        <Modal onClose={() => dispatch(toggleAvatarModal(false))}>
          Put form in here.
        </Modal>
      )}
    </>
  );
}
