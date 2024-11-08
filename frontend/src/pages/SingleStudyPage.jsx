import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import styles from "../assets/singleStudyPage.module.css";
import { useStudyStore } from "../store/studyStore.js";
import { formatDate } from "../utils/formatDate.js";

import ProgressBar from "../components/ProgressBar.jsx";
import Center from "../components/Center.jsx";
import Navbar from "../components/Navbar.jsx";

const SingleStudyPage = () => {
  const mainRef = useRef(null);

  const { id } = useParams();

  const { fetchSingleStudy } = useStudyStore();
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

  if (!study)
    return (
      <div>
        Carregando estudo. Se não carregar o estudo selecionado, avise-nos.
      </div>
    );

  return (
    <>
      <ToastContainer />
      <Navbar />

      <Center className={"bg-primary-bg"}>
        <div ref={mainRef} className="max-w-screen-sm mx-auto bg-primary-bg">
          <ProgressBar target={mainRef} />
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
