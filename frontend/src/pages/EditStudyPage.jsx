import { ToastContainer, toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Select } from "antd";

import InputNewStudy from "../components/InputNewStudy.jsx";
import LabelFormTitle from "../components/LabelFormTitle";
import { useStudyStore } from "../store/studyStore.js";
import { useAuthStore } from "../store/authStore.js";
import TextEditor from "../components/TextEditor";
import TitlePage from "../components/TitlePage";
import Center from "../components/Center.jsx";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

const EditStudyPage = () => {
  const { fetchSingleStudy, updateStudy } = useStudyStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const userId = user._id;
  const { id } = useParams();

  const [loadedStudy, setLoadedStudy] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    const getStudy = async () => {
      try {
        const fetchedStudy = await fetchSingleStudy(id);
        if (fetchedStudy.author._id === userId) {
          setLoadedStudy(fetchedStudy);
          setTitle(fetchedStudy.title);
          setDescription(fetchedStudy.description);
          setContent(fetchedStudy.content);
          setCategory(fetchedStudy.category);
          setTags(fetchedStudy.tags);
        } else {
          navigate("/not-authorized");
        }
      } catch (error) {
        console.error("Erro ao buscar estudo:", error);
      }
    };

    getStudy();
  }, [id, fetchSingleStudy, userId, navigate]);

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

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Center>
        {loadedStudy ? (
          <>
            <TitlePage text={"Modo de edição"} />
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col my-5">
                <LabelFormTitle text={"Título"} />
                <InputNewStudy
                  className={"mb-3"}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <LabelFormTitle text={"Descrição"} />
                <InputNewStudy
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
          </>
        ) : (
          <div>Sem autorização para acessar esta página.</div>
        )}
      </Center>
    </>
  );
};

export default EditStudyPage;
