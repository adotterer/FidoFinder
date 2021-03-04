import { Modal } from "../../context/Modal";
import NewDogForm from "./NewDogForm";
import { useSelector, useDispatch } from "react-redux";
import { toggleDogModal } from "../../store/dog_actions";

function NewDogModal() {
  const dispatch = useDispatch();
  const newDogRedux = useSelector((state) => state.newDog);

  return (
    <>
      <button onClick={() => dispatch(toggleDogModal(true))}>
        Add a new dog
      </button>
      {newDogRedux.open && (
        <Modal onClose={() => dispatch(toggleDogModal(false))}>
          <NewDogForm />
        </Modal>
      )}
    </>
  );
}

export default NewDogModal;
