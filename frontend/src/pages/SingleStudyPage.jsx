import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStudyStore } from "../store/studyStore.js";

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
