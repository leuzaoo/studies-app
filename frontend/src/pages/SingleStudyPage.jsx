import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStudyStore } from "../store/studyStore.js";

const SingleStudyPage = () => {
  const { studyId } = useParams();
  const { fetchSingleStudy, isLoading, error } = useStudyStore();
  const [study, setStudy] = useState(null);

  useEffect(() => {
    const getStudy = async () => {
      console.log("studyId:", studyId);
      if (!studyId) {
        console.error("studyId é undefined");
        return;
      }

      try {
        const fetchedStudy = await fetchSingleStudy(studyId);
        setStudy(fetchedStudy);
      } catch (error) {
        console.error("Erro ao buscar estudo:", error);
      }
    };

    if (studyId) {
      getStudy();
    }
  }, [studyId, fetchSingleStudy]);

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!study) return <div>Estudo não encontrado.</div>;

  return (
    <>
      <h1>{study.title}</h1>
      <p>{study.category}</p>
      <p>{study.tags}</p>
      <textarea name="" id="" className="h-[300px] border border-black">
        {study.content}
      </textarea>
    </>
  );
};

export default SingleStudyPage;
