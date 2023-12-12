import React from "react";
import { Button, Modal } from "react-daisyui";
import { BsFillQuestionCircleFill } from "react-icons/bs";

function YesNoModal(props) {
  /***************************************************************************************/
  //States
  /***************************************************************************************/
  const [modalOpen, setModalOpen] = React.useState(false);
  const [text, setText] = React.useState("");

  /***************************************************************************************/
  //Var
  /***************************************************************************************/

  /***************************************************************************************/
  //Callbacks
  /***************************************************************************************/
  React.useEffect(() => {
    if ("forward" in props && props.forward !== null) {
      setText(props.forward.text);
    }
    if ("show" in props && props.show !== null) {
      setModalOpen(props.show);
    }
  }, [props]);

  function onClosedCb() {
    setModalOpen(false);
    props.forward.cb(false);
  }

  return (
    <Modal
      open={modalOpen}
      onClickBackdrop={onClosedCb}
      className={props.className}
      style={props.style ?? {}}
    >
      <Modal.Header className="mb-5 flex items-center border-b border-b-gray-500 pb-3 text-xl font-bold">
        <BsFillQuestionCircleFill size={22} className="mr-3 text-blue-600" />
        <span>Confirmation</span>
      </Modal.Header>

      <Modal.Body className="pb-5 text-base">{text}</Modal.Body>

      <Modal.Actions>
        <Button
          className="min-h-6 h-10 w-[60px] text-xs text-white bg-green-500 border-green-500"
          size="sm"
          color="success"
          onClick={(e) => {
            e.preventDefault();
            setModalOpen(false);
            props.forward.cb(true);
          }}
        >
          Yes
        </Button>
        <Button
          className="min-h-6 h-10 w-[60px] text-xs text-white"
          size="sm"
          color="error"
          onClick={(e) => {
            e.preventDefault();
            setModalOpen(false);
            props.forward.cb(false);
          }}
        >
          No
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default YesNoModal;
