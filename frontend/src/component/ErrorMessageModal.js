import React from "react";
import { Modal, Button } from "react-daisyui";
import { AiOutlineWarning } from "react-icons/ai";

function ErrorMessageModal({ isOpen, closeHandler, errorMessage }) {
  return (
    <Modal open={isOpen} onClickBackdrop={closeHandler}>
      <Modal.Header className="flex items-center border-b border-b-gray-500 pb-3 text-xl font-bold">
        <AiOutlineWarning size={22} className="mr-3 text-red-600" />
        <span>Error Message</span>
      </Modal.Header>

      <Modal.Body className="pb-5 text-base">{errorMessage}</Modal.Body>

      <Modal.Actions>
        <Button
          className="h-10 text-white"
          color="error"
          onClick={closeHandler}
        >
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ErrorMessageModal;
