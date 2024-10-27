import React from "react";

const Input = ({ type, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border border-secondary-grey rounded-xl pl-5 h-[40px] text-sm outline-none focus:border-primary-dark"
    />
  );
};

export default Input;
