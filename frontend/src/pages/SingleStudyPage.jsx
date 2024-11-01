import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useStudyStore } from "../store/studyStore.js";
import { formatDate } from "../utils/formatDate.js";
import styles from "../assets/singleStudyPage.module.css";

import Center from "../components/Center.jsx";
import Navbar from "../components/Navbar.jsx";

const SingleStudyPage = () => {
  const { id } = useParams();

  const { fetchSingleStudy, isLoading, error } = useStudyStore();
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

  return (
    <>
      <Navbar />
      <Center>
        <p className="font-extralight text-terciary-grey">{study.category}</p>
        <h1 className="font-bold text-2xl">{study.title}</h1>
        <div className="mt-3 mb-5 flex gap-3 items-center">
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
        <div className="h-[1px] bg-black opacity-20 mb-5" />
        <div
          className={`${styles.content}`}
          dangerouslySetInnerHTML={{ __html: study.content }}
        />
      </Center>
    </>
  );
};

export default SingleStudyPage;
