import React from "react";

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className="w-full border border-secondary-grey rounded-xl pl-5 h-[40px] text-sm outline-none focus:border-primary-dark"
    />
  );
};

export default Input;
