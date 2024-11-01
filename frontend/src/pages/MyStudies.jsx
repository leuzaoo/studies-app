import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

import { useStudyStore } from "../store/studyStore";

import TitlePage from "../components/TitlePage";
import StudyCard from "../components/StudyCard";
import Navbar from "../components/Navbar";
import Center from "../components/Center";

const MyStudies = () => {
  const { fetchUserStudies, studies, error, isLoading } = useStudyStore();

  console.log(studies);
  useEffect(() => {
    fetchUserStudies();
  }, [fetchUserStudies]);

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
              <StudyCard
                key={study._id}
                _id={study._id}
                category={study.category}
                username={study.author.username}
                createdAt={study.createdAt}
                title={study.title}
                content={study.content}
              />
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
