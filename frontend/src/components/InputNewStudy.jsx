import React from "react";

const InputNewStudy = ({ type, placeholder, value, onChange, className }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={
        className +
        " w-full border-b md:text-lg border-secondary-grey pl-2 h-[40px] outline-none focus:border-primary-dark"
      }
    />
  );
};

export default InputNewStudy;
