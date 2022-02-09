import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Form from "../../components/UI/Form";
import Icon from "../../components/UI/Icons";
import Notification from "../../components/UI/Notification/Notification";
import Wrapper from "../../components/Wrapper/Wrapper";
import { ERROR, WRAPPER_VERTICAL_CENTER } from "../../constants/constants";
import * as API from "../../api";
import { signIn } from "../../store/actions/user";
import "./SignIn.scss";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);
  const [form, setform] = useState({ email: "", password: "" });

  const errorShow = () => {
    return (
      <Notification
        type={ERROR}
        label="Something went wrong"
        text="Your email or password was incorrect..."
      />
    );
  };

  const inputHandler = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    setloading(true);
    setTimeout(() => {
      login();
    }, 500);
    const login = async () => {
      try {
        const { data } = await API.signIn(form);
        dispatch(signIn(data, navigate))
      } catch (error) {
        seterror(true);
      }
      setloading(false);
    };
  };

  return (
    <Wrapper type={WRAPPER_VERTICAL_CENTER}>
      <div className="sign-card">
        <Form.Form>
          <h1>Sign In</h1>
          <Form.SignInput
            type="text"
            label="Email adress"
            placeholder="email@provider.com"
            name="email"
            onBlur={inputHandler}
          />
          <Form.SignInput
            type="password"
            label="Password"
            placeholder="Your password"
            name="password"
            onBlur={inputHandler}
          />
          <Form.SignButton
            label={loading ? <Icon.Spinner size="18" /> : "Continue"}
            style={loading ? { padding: "12.5px 30px" } : {}}
            onClick={submitHandler}
          />
          <div className="pageChange">
            <Link to="/signup">Don't have an account yet?</Link>
          </div>
        </Form.Form>
      </div>
      {error ? errorShow() : ""}
    </Wrapper>
  );
};

export default SignIn;
