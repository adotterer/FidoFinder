import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import NewDogForm from "./NewDogForm";

function NewDogModal() {
  const [showDogModal, setShowDogModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowDogModal(true)}>Add a new dog</button>
      {showDogModal && (
        <Modal onClose={() => setShowDogModal(false)}>
          <NewDogForm />
        </Modal>
      )}
    </>
  );
}

export default NewDogModal;
