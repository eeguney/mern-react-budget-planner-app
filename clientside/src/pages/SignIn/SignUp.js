import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Form from "../../components/UI/Form";
import Notification from "../../components/UI/Notification/Notification";
import Wrapper from "../../components/Wrapper/Wrapper";
import { ERROR, WRAPPER_VERTICAL_CENTER } from "../../constants/constants";
import validateEmail from "../../utils/validateEmail";
import "./SignIn.scss";
import { signUp } from "../../store/actions/user";

const SignUp = () => {
  const dispatch = useDispatch();
  const initializeError = {
    fullname: false,
    email: false,
    password: false,
    repassword: false,
    submit: "",
  };
  const [error, seterror] = useState(initializeError);

  const [order, setorder] = useState({
    fullname: { content: "", toggle: true },
    email: { content: "", toggle: false },
    password: { content: "", toggle: false },
    repassword: { content: "", toggle: false },
    finished: { toggle: false },
  });

  const orderHandler = (orderType) => {
    switch (orderType) {
      case "fullname":
        if (order.fullname.content.length > 3) {
          setorder({
            ...order,
            fullname: { ...order.fullname, toggle: false },
            email: { toggle: true },
          });
        } else {
          seterror({ ...error, fullname: true });
        }

        break;
      case "email":
        if (validateEmail(order.email.content)) {
          setorder({
            ...order,
            email: { ...order.email, toggle: false },
            password: { toggle: true },
          });
        } else {
          seterror({ ...error, email: true });
        }

        break;
      case "password":
        if (order.password.content.length > 7) {
          setorder({
            ...order,
            password: { ...order.password, toggle: false },
            repassword: { toggle: true },
          });
        } else {
          seterror({ ...error, password: true });
        }
        break;
      case "repassword":
        if (order.repassword.content === order.password.content) {
          setorder({
            ...order,
            repassword: { ...order.repassword, toggle: false },
            finished: { toggle: true },
          });
          submit();
        } else {
          seterror({ ...error, repassword: true });
        }
        break;
      case "finished":
        setorder({
          ...order,
          finished: { toggle: false },
        });
        break;
      default:
        break;
    }
  };

  const submit = async () => {
    dispatch(
      signUp({
        fullname: order.fullname.content,
        email: order.email.content,
        password: order.password.content,
      })
    )
      .then(() => {
        seterror({ ...error, submit: false });
      })
      .catch(() => {
        seterror({ ...error, submit: true });
      });
  };

  const errorShow = () => {
    return (
      <Notification
        type={ERROR}
        label="Something went wrong"
        text={
          error.fullname
            ? "Your full name must be at least 4 characters."
            : error.email
            ? "Your email is not valid."
            : error.password
            ? "Password must be at least 8 characters."
            : error.repassword
            ? "Password and repassword must be same."
            : ""
        }
      />
    );
  };

  const setFalseAllError = () => {
    seterror(initializeError);
  };

  return (
    <Wrapper type={WRAPPER_VERTICAL_CENTER}>
      <div className="sign-card">
        <Form.Form>
          {order.fullname.toggle && (
            <div className={`${order.fullname.toggle ? "fadeInAndScale" : "fadeOutAndScale"}`}>
              <h1>Sign Up</h1>
              <p>First, enter your fullname...</p>
              <Form.SignInput
                type="text"
                label="Full name"
                placeholder="Full name"
                order={order}
                name="fullname"
                onChange={setorder}
                onClick={setFalseAllError}
              />
              <Form.SignButton
                label="Continue"
                onClick={() => orderHandler("fullname")}
              />
              <div className="pageChange">
                <Link to="/signin">Are you already member?</Link>
              </div>
            </div>
          )}
          {order.email.toggle && (
            <div className={`${order.email.toggle ? "fadeInAndScale" : "fadeOutAndScale"}`}>
              <h1>Sign Up</h1>
              <p>First, enter your email...</p>
              <Form.SignInput
                type="text"
                label="Email adress"
                placeholder="email@provider.com"
                order={order}
                name="email"
                onChange={setorder}
                onClick={setFalseAllError}
              />
              <Form.SignButton
                label="Continue"
                onClick={() => orderHandler("email")}
              />
              <div className="pageChange">
                <Link to="/signin">Are you already member?</Link>
              </div>
            </div>
          )}
          {order.password.toggle && (
            <div className={`${order.password.toggle ? "fadeInAndScale" : "fadeOutAndScale"}`}>
              <p>And, enter your password...</p>
              <Form.SignInput
                type="password"
                label="Password"
                placeholder="Your password"
                order={order}
                name="password"
                onChange={setorder}
                onClick={setFalseAllError}
              />
              <Form.SignButton
                label="Continue"
                onClick={() => orderHandler("password")}
              />
            </div>
          )}
          {order.repassword.toggle && (
            <div
              className={`${order.repassword.toggle ? "fadeInAndScale" : "fadeOutAndScale"}`}
            >
              <p>At last, enter your password again...</p>
              <Form.SignInput
                type="password"
                label="Password"
                placeholder="Your password"
                order={order}
                name="repassword"
                onChange={setorder}
                onClick={setFalseAllError}
              />
              <Form.SignButton
                label="Finish"
                onClick={() => orderHandler("repassword")}
              />
            </div>
          )}
          {order.finished.toggle && (
            <div
              className={`${order.finished.toggle ? "fadeInAndScaleSlow" : "fadeOutAndScale"}`}
            >
              <h1>{error.submit ? "Something went wrong!" : "Thank you!"}</h1>
              <p className="finish-text fadeInDelay">
                {error.submit ? (
                  <>
                    We are sorry, do you wanna <Link to="/">go home</Link>?
                  </>
                ) : (
                  <>
                    You can <Link to="/signin">sign in</Link> now.
                  </>
                )}
              </p>
            </div>
          )}
        </Form.Form>
      </div>
      {(error.fullname || error.email || error.password || error.repassword) &&
        errorShow()}
    </Wrapper>
  );
};

export default SignUp;
