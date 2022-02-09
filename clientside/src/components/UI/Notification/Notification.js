import { useState, useEffect } from "react";
import {
  ERROR,
  LOADING,
  SUCCESSFUL,
  WARNING,
} from "../../../constants/constants";
import NotificationModal from "../Modals/NotificationModal";

const Notification = ({ dispatch, type, label, text }) => {
  const [modalType, setmodalType] = useState("error");

  useEffect(() => {
    switch (type) {
      case ERROR:
        setmodalType("error");
        break;
      case SUCCESSFUL:
        setmodalType("successful");
        break;
      case WARNING:
        setmodalType("warning");
        break;
      case LOADING:
        setmodalType("loading");
        break;
      default:
        break;
    }
  }, []);
  
  return (
    <NotificationModal dispatch={dispatch}>
      <div className={`notification--modal ${modalType}`}>
        <label>{label}</label>
        <p>{text}</p>
      </div>
    </NotificationModal>
  );
};

export default Notification;
