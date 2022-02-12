import { useEffect } from "react";
import Icon from "../../components/UI/Icons";
import Wrapper from "../../components/Wrapper/Wrapper";
import { WRAPPER_VERTICAL_CENTER } from "../../constants/constants";
import "./Logout.scss";

const Logout = () => {
  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem("token");
      window.location.reload();
    }, 1500);
  }, []);

  return (
    <Wrapper type={WRAPPER_VERTICAL_CENTER}>
      <div className="sign-card">
        <div className="logout-box">
          <h1>You are about to logout</h1>
          <p>Just a second...</p>
          <Icon.Spinner size="40" />
        </div>
      </div>
    </Wrapper>
  );
};

export default Logout;
