import React from "react";

import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const TextEditor = ({ value, onChange }) => {
  return (
    <>
      <ReactQuill
        value={value}
        onChange={onChange}
        className="custom-editor"
        modules={{
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
          ],
        }}
        placeholder="Comece a escrever seu artigo aqui..."
      />
    </>
  );
};

export default TextEditor;
