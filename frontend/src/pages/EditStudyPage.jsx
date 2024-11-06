import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Select } from "antd";

import LabelFormTitle from "../components/LabelFormTitle";
import { useStudyStore } from "../store/studyStore.js";
import { useAuthStore } from "../store/authStore.js";
import TextEditor from "../components/TextEditor";
import TitlePage from "../components/TitlePage";
import Center from "../components/Center.jsx";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Input from "../components/Input";

const EditStudyPage = () => {
  const { fetchSingleStudy, updateStudy, study, isCheckingAuth } =
    useStudyStore();
  const { user } = useAuthStore();
  const userId = user._id;

  const [title, setTitle] = useState(study?.title || "");
  const [description, setDescription] = useState(study?.description || "");
  const [content, setContent] = useState(study?.content || "");
  const [category, setCategory] = useState(study?.category || "");
  const [tags, setTags] = useState(study?.tags || "");

  const [isAuthorized, setIsAuthorized] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getStudy = async () => {
      try {
        if (user.author._id && id) {
          const fetchedStudy = await fetchSingleStudy(id);

          if (fetchedStudy.author._id === userId) {
            setIsAuthorized(true);
            setTitle(fetchedStudy.title);
            setDescription(fetchedStudy.description);
            setContent(fetchedStudy.content);
            setCategory(fetchedStudy.category);
            setTags(fetchedStudy.tags);
          } else {
            toast.error("Você não tem permissão para editar este estudo.");
            navigate("/unauthorized");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar estudo:", error);
      }
    };

    if (!isCheckingAuth && id) {
      getStudy();
    }
  }, [id, fetchSingleStudy, userId, user, isCheckingAuth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      title,
      description,
      content,
      category,
      tags,
    };

    try {
      await updateStudy(id, updatedData);
      toast.success("Estudo atualizado com sucesso!");
      navigate(`/my-studies`);
    } catch (error) {
      toast.error("Erro ao atualizar estudo.");
    }
  };

  const handleChange = (value) => {
    setCategory(value);
  };

  const handleTagsChange = (value) => {
    setTags(value);
  };

  if (!isAuthorized) {
    return (
      <>
        <Navbar />
        <ToastContainer />
        <Center>
          <h2>Você não tem permissão para editar este conteúdo</h2>
        </Center>
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Center>
        <TitlePage text={"Modo de edição"} />
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col my-5">
            <LabelFormTitle text={"Título"} />
            <Input
              className={"mb-3"}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <LabelFormTitle text={"Descrição"} />
            <Input
              className={"mb-3"}
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <LabelFormTitle text={"Categoria"} />
            <Select
              value={category}
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
              suffixIcon={null}
              mode="tags"
              style={{ width: "100%", marginBottom: 14 }}
              placeholder="Guerra, Nazismo, Judeus"
              onChange={handleTagsChange}
              value={tags}
              notFoundContent={null}
            />

            <TextEditor value={content} onChange={setContent} />

            <Button
              className={"mt-5"}
              type="submit"
              primary
              content={"Salvar"}
            />
          </div>
        </form>
      </Center>
    </>
  );
};

export default EditStudyPage;
