import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useStudyStore } from "../store/studyStore.js";

const EditStudyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { fetchSingleStudy, updateStudy } = useStudyStore();
  const [study, setStudy] = useState({
    title: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    const getStudy = async () => {
      try {
        const fetchedStudy = await fetchSingleStudy(id);
        setStudy({
          title: fetchedStudy.title,
          content: fetchedStudy.content,
          category: fetchedStudy.category,
        });
      } catch (error) {
        console.error("Erro ao buscar estudo:", error);
      }
    };

    if (id) {
      getStudy();
    }
  }, [id, fetchSingleStudy]);

  const handleChange = (e) => {
    setStudy({
      ...study,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStudy(id, study);
      toast.success("Estudo atualizado com sucesso!");
      navigate(`/study/${id}`);
    } catch (error) {
      toast.error("Erro ao atualizar estudo.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div>
        <h1>Editar Estudo</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Título:
            <input
              type="text"
              name="title"
              value={study.title}
              onChange={handleChange}
            />
          </label>
          <label>
            Conteúdo:
            <textarea
              name="content"
              value={study.content}
              onChange={handleChange}
            />
          </label>
          <label>
            Categoria:
            <input
              type="text"
              name="category"
              value={study.category}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Salvar</button>
        </form>
      </div>
    </>
  );
};

export default EditStudyPage;
