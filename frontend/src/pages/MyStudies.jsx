import { confirmAlert } from "react-confirm-alert";
import { ToastContainer } from "react-toastify";
import { Edit3, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import "react-confirm-alert/src/react-confirm-alert.css";
import "../assets/react-alert.css";

import MyStudiesStudyCard from "../components/MyStudiesStudyCard";
import { useStudyStore } from "../store/studyStore";
import TitlePage from "../components/TitlePage";
import Navbar from "../components/Navbar";
import Center from "../components/Center";

const MyStudies = () => {
  const { fetchUserStudies, deleteStudy, studies, error, isLoading } =
    useStudyStore();

  useEffect(() => {
    fetchUserStudies();
  }, [fetchUserStudies]);

  const handleDelete = (id) => {
    confirmAlert({
      title: "Você tem certeza que deseja excluir este conteúdo?",
      buttons: [
        {
          label: "Sim",
          onClick: () => deleteStudyById(id),
        },
        {
          label: "Não",
        },
      ],
    });
  };

  const deleteStudyById = async (id) => {
    if (typeof id !== "string") {
      console.error("ID inválido: ", id);
      return;
    }

    try {
      await deleteStudy(id);
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (err) {
      console.error("Erro ao excluir estudo:", err);
    }
  };

  const renderStudies = () => {
    if (isLoading) {
      return <p>Carregando estudos...</p>;
    }

    if (error) {
      return <p>Ocorreu um erro: {error}</p>;
    }

    if (studies.length === 0) {
      return <p>Você ainda não criou nenhum estudo.</p>;
    }

    return studies.map((study) => (
      <div key={study._id} className="flex items-start justify-between mb-10">
        <MyStudiesStudyCard
          _id={study._id}
          category={study.category}
          username={study.author.username}
          createdAt={study.createdAt}
          title={study.title}
          content={study.content}
        />
        <div className="flex items-center gap-3">
          <Link
            to={`/edit-study/${study._id}`}
            className="text-sm hover:underline"
          >
            <button className="bg-primary-dark p-2 rounded-full hover:bg-terciary-grey">
              <Edit3 size={16} color="white" />
            </button>
          </Link>
          <button
            onClick={() => handleDelete(study._id)}
            className="flex items-center gap-3 bg-red-500 text-sm text-white p-2 rounded-full hover:bg-red-300 transition-all duration-200"
          >
            <Trash2 color="white" size={16} />
          </button>
        </div>
      </div>
    ));
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Center>
        <TitlePage text="Meus estudos" />
        <div className="mt-5">{renderStudies()}</div>
      </Center>
    </>
  );
};

export default MyStudies;
