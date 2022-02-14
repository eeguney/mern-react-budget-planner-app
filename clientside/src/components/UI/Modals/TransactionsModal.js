import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";

const Backdrop = ({ setModal }) => {
  return <div className="backdrop" onClick={setModal} />;
};

const ModalOverlay = ({ children }) => {
  return <>{children}</>;
};

const TransactionsModal = ({ children, setModal }) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop setModal={setModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay setModal={setModal}>{children}</ModalOverlay>,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default TransactionsModal;
