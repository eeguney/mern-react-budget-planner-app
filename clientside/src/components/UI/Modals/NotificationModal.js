import ReactDOM from "react-dom";
import "./style.scss";

const NotificationOverlay = ({ children }) => {
  return <>{children}</>;
};

const NotificationModal = ({ children, dispatch }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <NotificationOverlay dispatch={dispatch}>
          {children}
        </NotificationOverlay>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default NotificationModal;
