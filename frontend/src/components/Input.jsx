import React from "react";

const Input = ({ type, maxLength, placeholder, value, onChange, className }) => {
  return (
    <input
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={
        className +
        " w-full border border-secondary-grey rounded-xl pl-5 h-[40px] text-sm outline-none focus:border-primary-dark"
      }
    />
  );
};

export default Input;
