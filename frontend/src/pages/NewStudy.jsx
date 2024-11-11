import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Select } from "antd";

import LabelFormTitle from "../components/LabelFormTitle";
import InputNewStudy from "../components/InputNewStudy";
import { useStudyStore } from "../store/studyStore";
import TextEditor from "../components/TextEditor";
import Navbar from "../components/navbar/Navbar";
import TitlePage from "../components/TitlePage";
import Button from "../components/Button";
import Center from "../components/Center";

const NewStudy = () => {
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [content, setContent] = useState();
  const [title, setTitle] = useState();
  const [tags, setTags] = useState([]);

  const { createStudy } = useStudyStore();
  const navigate = useNavigate();

  const handleChange = (value) => {
    setCategory(value);
  };

  const handleTagsChange = (value) => {
    setTags(value);
  };

  const handleCreateStudy = async (e) => {
    e.preventDefault();

    try {
      await createStudy(title, description, content, category, tags);
      navigate("/my-studies");
    } catch (error) {
      console.log("Erro ao clicar no botão de criar estudo: ", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <Center>
          <TitlePage text={"Criar novo estudo"} />
          <form onSubmit={handleCreateStudy} className="mt-5 flex flex-col">
            <LabelFormTitle text={"Título"} />
            <InputNewStudy
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              className={"mb-3"}
              placeholder={"Escreva um título interessante"}
            />

            <LabelFormTitle text={"Descrição"} />
            <InputNewStudy
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              type="text"
              className={"mb-3"}
              placeholder={"Resuma o que você quer contar"}
            />

            <LabelFormTitle text={"Categoria"} />
            <Select
              defaultValue=""
              style={{
                width: 160,
                marginBottom: 12,
                fontSize: 20,
              }}
              onChange={handleChange}
              options={[
                { value: "Política", label: "Política" },
                { value: "Esportes", label: "Esportes" },
                { value: "Programação", label: "Programação" },
                { value: "Ciência", label: "Ciência" },
                { value: "História", label: "História" },
                { value: "Arte", label: "Arte" },
                { value: "Outros", label: "Outros" },
              ]}
            />

            <LabelFormTitle text={"Tags"} />
            <Select
              allowClear
              suffixIcon={null}
              mode="tags"
              style={{
                width: "100%",
                marginBottom: 14,
              }}
              placeholder="Termos para os usuários encontrarem o seu estudo"
              onChange={handleTagsChange}
              value={tags}
              notFoundContent={null}
            />

            <TextEditor value={content} onChange={setContent} />

            <Button className="mt-5" type="submit" content={"Finalizar"} />
          </form>
        </Center>
      </div>
    </>
  );
};

export default NewStudy;
