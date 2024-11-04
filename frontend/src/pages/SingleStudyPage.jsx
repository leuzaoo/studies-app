import { useNavigate, useParams } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import { useEffect, useState } from "react";

import styles from "../assets/singleStudyPage.module.css";
import { useStudyStore } from "../store/studyStore.js";
import { formatDate } from "../utils/formatDate.js";
import "../assets/react-alert.css";

import Center from "../components/Center.jsx";
import Navbar from "../components/Navbar.jsx";
import { Trash2 } from "lucide-react";

const SingleStudyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { fetchSingleStudy, isLoading, error, deleteStudy } = useStudyStore();
  const [study, setStudy] = useState(null);

  useEffect(() => {
    const getStudy = async () => {
      try {
        const fetchedStudy = await fetchSingleStudy(id);
        setStudy(fetchedStudy);
      } catch (error) {
        console.error("Erro ao buscar estudo:", error);
      }
    };

    if (id) {
      getStudy();
    }
  }, [id, fetchSingleStudy]);

  if (!study) return <div>Estudo não encontrado.</div>;

  const handleDelete = () => {
    confirmAlert({
      title: "Você tem certeza que deseja excluir este conteúdo?",
      buttons: [
        {
          label: "Sim",
          onClick: async () => {
            await deleteStudy(id);
            navigate("/my-studies");
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
      <Navbar />
      <Center>
        <div className="max-w-screen-sm mx-auto">
          <p className="font-extralight text-terciary-grey">{study.category}</p>
          <h1 className="font-bold text-2xl">{study.title}</h1>
          <div className="mt-3 mb-5 flex gap-3 items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={study?.user?.avatar || "/user.jpg"}
                className="size-10 rounded-full shadow-md"
                alt="user profile image"
              />
              <div>
                <p className="text-sm">{study.author.username}</p>
                <span className="text-sm font-extralight text-terciary-grey">
                  {formatDate(study.createdAt)}
                </span>
              </div>
            </div>
            <button
              onClick={handleDelete}
              className="flex items-center gap-3 bg-red-500 text-sm text-white px-3 py-2 rounded hover:bg-red-300 transition-all duration-200"
            >
              <Trash2 color="white" size={16} />
            </button>
          </div>
          <div className="h-[1px] bg-black opacity-20 mb-5" />
          <div
            className={`${styles.content}`}
            dangerouslySetInnerHTML={{ __html: study.content }}
          />
        </div>
      </Center>
    </>
  );
};

export default SingleStudyPage;
