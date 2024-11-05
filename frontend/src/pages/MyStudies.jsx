import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import "../assets/react-alert.css";
import { useEffect } from "react";

import { useStudyStore } from "../store/studyStore.js";

import TitlePage from "../components/TitlePage";
import StudyCard from "../components/StudyCard";
import Navbar from "../components/Navbar";
import Center from "../components/Center";

const MyStudies = () => {
  const { fetchUserStudies, deleteStudy, studies, error, isLoading } =
    useStudyStore();

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserStudies();
  }, [fetchUserStudies]);

  const handleDelete = (id) => {
    confirmAlert({
      title: "Você tem certeza que deseja excluir este conteúdo?",
      buttons: [
        {
          label: "Sim",
          onClick: async () => {
            if (typeof id === "string") {
              await deleteStudy(id);

              setTimeout(() => {
                window.location.reload();
              });
            } else {
              console.error("ID inválido: ", id);
            }
          },
        },
        {
          label: "Não",
        },
      ],
    });
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Center>
        <TitlePage text="Meus estudos" />
        <div className="mt-5">
          {isLoading ? (
            <p>Carregando estudos...</p>
          ) : error ? (
            <p>{error}</p>
          ) : studies.length > 0 ? (
            studies.map((study) => (
              <div
                key={study._id}
                className="flex items-center justify-between"
              >
                <StudyCard
                  _id={study._id}
                  category={study.category}
                  username={study.author.username}
                  createdAt={study.createdAt}
                  title={study.title}
                  content={study.content}
                />
                <button
                  onClick={() => handleDelete(study._id)}
                  className="flex items-center gap-3 bg-red-500 text-sm text-white px-3 py-2 rounded hover:bg-red-300 transition-all duration-200"
                >
                  <Trash2 color="white" size={16} />
                </button>
              </div>
            ))
          ) : (
            <p>Você ainda não criou nenhum estudo.</p>
          )}
        </div>
      </Center>
    </>
  );
};

export default MyStudies;
