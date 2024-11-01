import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

import { useStudyStore } from "../store/studyStore";

import TitlePage from "../components/TitlePage";
import Navbar from "../components/Navbar";
import Center from "../components/Center";

const MyStudies = () => {
  const { fetchUserStudies, studies, error, isLoading } = useStudyStore();

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
              <div
                key={study._id}
                className="p-4 mb-4 border rounded-md shadow-sm"
              >
                <h2 className="text-lg font-bold">{study.title}</h2>
                <p className="text-sm text-gray-500">{study.category}</p>
                <p className="mt-2">{study.content.substring(0, 100)}...</p>
                <a
                  href={`/studies/${study._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Ver mais
                </a>
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
