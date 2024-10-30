import React, { useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Button from "./Button";

const TextEditor = ({ onSave }) => {
  const [content, setContent] = useState("");

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSave = () => {
    onSave(content);
  };

  return (
    <>
      <ReactQuill
        value={content}
        className="custom-editor"
        onChange={handleContentChange}
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
      <div className="flex items-center mt-5">
        <Button primary content={"Salvar"} onClick={handleSave} />
      </div>
    </>
  );
};

export default TextEditor;
