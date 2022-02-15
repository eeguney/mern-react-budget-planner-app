import { useState } from "react"
import "./Button.scss";

const Button = {
  DrawerNavButton: (props) => {
    const { children, className, label, icon, ...prop } = props;
    return (
      <button className={`drawer-nav-button ${className}`} {...prop}>
        {icon}
        <label>{label}</label>
        {children}
      </button>
    );
  },
  AddExpense: (props) => {
    const { children, className, label, icon, ...prop } = props;
    return (
      <button
        className={`_addExpense--btn hover-bounce ${className}`}
        {...prop}
      >
        {icon}
        {label}
        {children}
      </button>
    );
  },
  AddIncome: (props) => {
    const { children, className, label, icon, ...prop } = props;
    return (
      <button className={`_addIncome--btn hover-bounce ${className}`} {...prop}>
        {icon}
        {label}
        {children}
      </button>
    );
  },
  Submit: (props) => {
    const { children, className, label, setSuccess, icon, style, ...prop } =
      props;
    return (
      <button
        type="submit"
        style={style}
        setsuccess={setSuccess}
        className={`_submit--btn ${className}`}
        {...prop}
      >
        {icon}
        {label}
        {children}
      </button>
    );
  },
  SignButton: (props) => {
    const { children, className, label, icon, ...prop } = props.prop;
    return (
      <button
        type="button"
        onClick={props.onClick}
        className={`_sign--btn ${className}`}
        {...prop}
      >
        {icon}
        {label}
        {children}
      </button>
    );
  },
  OnOffButton: () => {
    const [toggle, settoggle] = useState(false)
    return (
      <button
        type="button"
        onClick={() => settoggle(!toggle)}
        value={toggle}
        className={`onOffButton ${toggle && "on"}`}
      >
        <div className={`inner ${toggle && "on"}`}>
          <span className="_inner_active" />
          <span className="_inner_inactive" />
        </div>
      </button>
    );
  },
};

export default Button;
