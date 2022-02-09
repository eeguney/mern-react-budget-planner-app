import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Welcome.scss";

const Welcome = () => {
  const user = useSelector((state) => state.user)
  return (
    <section className="welcome">
      { user.fullname !== null ? <>
        <div className="welcome-text"><strong>Welcome</strong>, { user.fullname }. How are you feeling today?</div>
        <div className="logout"><Link to="/logout">Logout</Link></div>
      </>
      : <div className="welcome-text"><strong>Welcome</strong>, if you wanna your records not to be lost please <Link to="/signin">sign in</Link>.</div>
    }
    
    </section>
  );
};

export default Welcome;
