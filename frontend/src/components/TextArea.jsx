import React from "react";

const TextArea = ({ type, id, placeholder, value, onChange, className }) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={
        className +
        " pt-3 px-5 w-full border border-secondary-grey rounded-xl h-[180px] text-sm outline-none focus:border-primary-dark"
      }
    />
  );
};

export default TextArea;
