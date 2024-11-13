import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { Skeleton } from "antd";

import styles from "../assets/singleStudyPage.module.css";
import { useStudyStore } from "../store/studyStore.js";
import { formatDate } from "../utils/formatDate.js";

import ProgressBar from "../components/ProgressBar.jsx";
import Navbar from "../components/navbar/Navbar.jsx";
import Center from "../components/Center.jsx";

const SingleStudyPage = () => {
  const mainRef = useRef(null);

  const { id } = useParams();

  const { fetchSingleStudy, isLoading } = useStudyStore();
  const [study, setStudy] = useState(null);
  console.log(study);

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
      <>
        <Navbar />
        <Center>
          <div>
            <ul className="mt-5 mx-auto max-w-screen-sm flex flex-col gap-12 justify-between h-full">
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </ul>
          </div>
        </Center>
      </>
    );

  return (
    <>
      <ToastContainer />
      <Navbar />

      <Center>
        <div ref={mainRef} className="max-w-screen-sm mx-auto">
          <ProgressBar target={mainRef} />
          <p className="font-extralight text-terciary-grey">{study.category}</p>
          <h1 className="font-bold text-2xl">{study.title}</h1>
          <div className="mt-3 mb-5 flex gap-3 items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={study?.author?.userImage || "/avatar2.png"}
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
