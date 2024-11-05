import React from "react";

const Input = ({ type, placeholder, value, onChange, className }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={
        className +
        " w-full border placeholder:font-light placeholder:text-base border-secondary-grey rounded-xl pl-5 h-[40px] text-sm md:text-lg outline-none focus:border-primary-dark"
      }
    />
  );
};

export default Input;
