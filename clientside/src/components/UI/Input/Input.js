import { useState } from "react";

const SignInput = ({ prop }) => {
  const { label, type, placeholder, className, onChange, onBlur, onClick, order, name } = prop;
  const [clicked, setclicked] = useState(false);

  return (
    <div className={`input-wrapper ${clicked && "clicked"}`}>
      <label onClick={() => setclicked(!clicked)}>{label}</label>
      <input onClick={onClick} type={type} placeholder={placeholder} name={name} onBlur={onBlur} className={`${className}`} onChange={onChange ? (e) => onChange({ ...order,  [name]: { ...order[name], content: e.target.value  }   }) : () => ("")} />
    </div>
  );
};

export { SignInput };
