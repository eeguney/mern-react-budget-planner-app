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
    const { children, className, label, setSuccess, icon, style, ...prop } = props;
    return (
      <button type="submit" style={style} setSuccess={setSuccess} className={`_submit--btn ${className}`} {...prop}>
        {icon}
        {label}
        {children}
      </button>
    );
  },
  SignButton: (props) => {
    const { children, className, label, icon, ...prop } = props.prop;
    return (
      <button type="button" onClick={props.onClick} className={`_sign--btn ${className}`} {...prop}>
        {icon}
        {label}
        {children}
      </button>
    );
  },
};

export default Button;
