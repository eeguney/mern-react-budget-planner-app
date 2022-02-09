import React from "react";
import ReactDOM from "react-dom";
import { toggleExpense } from "../../../store/actions/addExpense";
import { toggleIncome } from "../../../store/actions/addIncome";
import "./style.scss";

const Backdrop = ({ dispatch }) => {
  return <div className="backdrop" onClick={() => {dispatch(toggleExpense()); dispatch(toggleIncome())}} />;
};

const ModalOverlay = ({ children }) => {
  return <>{children}</>;
};

const FormModal = ({ children, dispatch }) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop dispatch={dispatch} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay dispatch={dispatch}>{children}</ModalOverlay>,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default FormModal;
