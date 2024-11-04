import React from "react";

const LabelFormTitle = ({ text, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 text-sm md:text-lg font-medium text-medium-grey"
    >
      {text}
    </label>
  );
};

export default LabelFormTitle;
