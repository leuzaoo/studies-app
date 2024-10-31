import { ToastContainer } from "react-toastify";
import { useState } from "react";

import { Select } from "antd";

import LabelFormTitle from "../components/LabelFormTitle";
import TextEditor from "../components/TextEditor";
import TitlePage from "../components/TitlePage";
import Navbar from "../components/Navbar";
import Center from "../components/Center";
import Input from "../components/Input";

const NewStudy = () => {
  const [tags, setTags] = useState([]);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const handleTagsChange = (value) => {
    setTags(value);
    console.log("Tags:", value);
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="max-w-4xl mx-auto ">
        <Center>
          <TitlePage text={"Criar novo estudo"} />
          <form className="mt-5 flex flex-col">
            <LabelFormTitle text={"Título"} />
            <Input
              className={"mb-3"}
              placeholder={"Você sabe tudo sobre o nazismo?"}
            />

            <LabelFormTitle text={"Categoria"} />
            <Select
              defaultValue=""
              style={{
                width: 160,
                marginBottom: 12,
              }}
              onChange={handleChange}
              options={[
                { value: "política", label: "Política" },
                { value: "esportes", label: "Esportes" },
                { value: "programação", label: "Programação" },
                { value: "ciência", label: "Ciência" },
                { value: "história", label: "História" },
                { value: "arte", label: "Arte" },
                { value: "outros", label: "Outros" },
              ]}
            />

            <LabelFormTitle text={"Tags"} />
            <Select
              suffixIcon={null}
              mode="tags"
              style={{ width: "100%", marginBottom: 12 }}
              placeholder="Guerra, Nazismo, Judeus"
              onChange={handleTagsChange}
              value={tags}
              notFoundContent={null}
            />

            <TextEditor />
          </form>
        </Center>
      </div>
    </>
  );
};

export default NewStudy;
