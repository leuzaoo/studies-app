import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";

import LabelFormTitle from "../components/LabelFormTitle";
import { useStudyStore } from "../store/studyStore.js";
import TextEditor from "../components/TextEditor";
import TitlePage from "../components/TitlePage";
import Center from "../components/Center.jsx";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Input from "../components/Input";

const EditStudyPage = () => {
  const { fetchSingleStudy, updateStudy, study } = useStudyStore();

  const [title, setTitle] = useState(study?.title || "");
  const [description, setDescription] = useState(study?.description || "");
  const [content, setContent] = useState(study?.content || "");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getStudy = async () => {
      try {
        const fetchedStudy = await fetchSingleStudy(id);
        setTitle(fetchedStudy.title);
        setDescription(fetchedStudy.description);
        setContent(fetchedStudy.content);
      } catch (error) {
        console.error("Erro ao buscar estudo:", error);
      }
    };

    if (id) {
      getStudy();
    }
  }, [id, fetchSingleStudy]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      title,
      description,
      content,
    };

    try {
      await updateStudy(id, updatedData);
      toast.success("Estudo atualizado com sucesso!");
      navigate(`/my-studies`);
    } catch (error) {
      toast.error("Erro ao atualizar estudo.");
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Center>
        <TitlePage text={"Modo de edição"} />
        <form onSubmit={handleSubmit}>
          <LabelFormTitle text={"Título"} />
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <LabelFormTitle text={"Descrição"} />
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextEditor value={content} onChange={setContent} />

          <Button type="submit" primary content={"Salvar"} />
        </form>
      </Center>
    </>
  );
};

export default EditStudyPage;
