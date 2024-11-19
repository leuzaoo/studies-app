import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Skeleton } from "antd";

import { useCommentStore } from "../store/commentsStore.js";
import styles from "../assets/singleStudyPage.module.css";
import { useStudyStore } from "../store/studyStore.js";

import ProgressBar from "../components/ProgressBar.jsx";
import Navbar from "../components/navbar/Navbar.jsx";
import { formatDate } from "../utils/formatDate.js";
import Center from "../components/Center.jsx";

const SingleStudyPage = () => {
  const mainRef = useRef(null);
  const { id } = useParams();

  const { fetchSingleStudy } = useStudyStore();
  const { fetchComments, addComment, comments } = useCommentStore();

  const [study, setStudy] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const getStudy = async () => {
      try {
        const fetchedStudy = await fetchSingleStudy(id);

        console.log(fetchedStudy);
        setStudy(fetchedStudy);
      } catch (error) {
        console.error("Erro ao buscar estudo:", error);
      }
    };

    if (id) {
      getStudy();
      fetchComments(id);
    }
  }, [id, fetchSingleStudy, fetchComments]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    await addComment(id, { content: newComment });
    setNewComment("");
    fetchComments(id);
  };

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
        <div ref={mainRef} className="max-w-screen-md mx-auto">
          <ProgressBar target={mainRef} />

          <img
            src={
              study?.bannerImage && study.bannerImage.trim() !== ""
                ? study.bannerImage
                : "/banner.jpg"
            }
            className="w-full rounded-xl shadow-lg mb-5"
            alt="Banner image"
          />

          <span className="font-extralight text-terciary-grey">
            {study.category}
          </span>

          <h1 className="font-bold text-3xl md:text-5xl">{study.title}</h1>

          <p className="font-domine my-5 text-base md:text-xl">
            {study.description}
          </p>

          <div className="mt-3 mb-5 flex gap-3 items-center justify-between">
            <Link
              to={`/${study.author.username}`}
              className="flex items-center gap-3"
            >
              <img
                src={study?.author?.userImage || "/avatar2.png"}
                className="size-10 rounded-full shadow-md"
                alt="user profile image"
              />
              <div>
                <p className="text-sm md:text-base">{study.author.username}</p>
                <span className="text-xs md:text-sm font-extralight text-terciary-grey">
                  {formatDate(study.createdAt)}
                </span>
              </div>
            </Link>
          </div>

          <div className="h-[1px] bg-black opacity-20 mb-5" />
          <div
            className={`${styles.content}`}
            dangerouslySetInnerHTML={{ __html: study.content }}
          />

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Comentários</h2>
            <div className="mb-5">
              <textarea
                className="w-full p-3 border rounded"
                rows="3"
                placeholder="Adicione um comentário..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleAddComment}
              >
                Comentar
              </button>
            </div>

            {Array.isArray(comments) && comments ? (
              comments.map((comment) => (
                <div key={comment._id} className="mb-5 border-b pb-3">
                  <p className="font-semibold">{comment.user.username}</p>
                  <p>{comment.content}</p>
                  <span className="text-xs text-gray-500">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
              ))
            ) : (
              <p>Nenhum comentário disponível.</p>
            )}
          </div>
        </div>
      </Center>
    </>
  );
};

export default SingleStudyPage;
