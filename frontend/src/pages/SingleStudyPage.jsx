import { useEffect, useRef, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Skeleton } from "antd";

import { useCommentStore } from "../store/commentsStore.js";
import styles from "../assets/singleStudyPage.module.css";
import { useStudyStore } from "../store/studyStore.js";
import { useAuthStore } from "../store/authStore.js";
import Button from "../components/Button.jsx";

import ProgressBar from "../components/ProgressBar.jsx";
import { Trash2, UserCircle2Icon } from "lucide-react";
import Navbar from "../components/navbar/Navbar.jsx";
import { formatDate } from "../utils/formatDate.js";
import Center from "../components/Center.jsx";

const SingleStudyPage = () => {
  const mainRef = useRef(null);
  const { id } = useParams();

  const { user } = useAuthStore();

  const { fetchSingleStudy } = useStudyStore();
  const { fetchComments, addComment, comments, deleteComment } =
    useCommentStore();

  const [study, setStudy] = useState(null);
  const [newComment, setNewComment] = useState("");

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
      fetchComments(id);
    }
  }, [id, fetchSingleStudy, fetchComments]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    await addComment(id, { content: newComment });
    setNewComment("");
    fetchComments(id);
  };

  const handleDeleteComment = (id) => {
    confirmAlert({
      title: "Deseja excluir o comentário selecionado?",
      buttons: [
        {
          label: "Sim",
          onClick: () => deleteComment(id),
        },
        {
          label: "Não",
        },
      ],
    });
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
            {!user ? (
              <>
                <div className="flex items-start gap-3">
                  <UserCircle2Icon size={48} color="grey" strokeWidth={1} />
                  <div className="border w-full rounded-md p-3">
                    <p>Para comentar você precisa estar logado.</p>
                    <div className="flex itemscenter gap-3">
                      <Link to={"/login"}>
                        <Button
                          className="!max-w-max px-4 mt-3 w-full cursor-pointer"
                          content={"Entrar"}
                          primary
                        />
                      </Link>
                      <Link to={"/signup"}>
                        <Button
                          className="!max-w-max px-4 mt-3 w-full cursor-pointer"
                          content={"Criar conta"}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-5 w-full">
                  <div className="flex items-start justify-end gap-3">
                    <img
                      src={user.userImage}
                      className="size-12 rounded-full"
                      alt={`${user.username} profile image`}
                    />
                    <textarea
                      className="w-full p-3 focus:outline-none rounded max-h-20"
                      rows="3"
                      placeholder="Adicione um comentário..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                  </div>

                  <div className="flex items-end justify-end">
                    <Button
                      type="submit"
                      className={
                        "!max-w-max  w-full px-6 mt-3 disabled:cursor-not-allowed disabled:opacity-50"
                      }
                      onClick={handleAddComment}
                      primary
                      disabled={!newComment.trim()}
                      content={"Comentar"}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex items-center justify-between gap-3 border mb-3 p-3 rounded-md"
            >
              <div className="flex items-center gap-3">
                <img
                  src={comment?.author?.userImage}
                  className="size-10 rounded-full shadow-md"
                  alt={`${comment?.author?.username} profile image`}
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-semibold">
                      {comment?.author?.name}
                    </p>
                    <p className="text-sm font-light text-terciary-grey">
                      @{comment?.author?.username}
                    </p>
                    <p className="text-xs font-light text-terciary-grey">
                      {formatDate(comment?.createdAt)}
                    </p>
                  </div>
                  <p>{comment?.content}</p>
                </div>
              </div>
              {user?.username === comment?.author?.username && (
                <button onClick={() => handleDeleteComment(comment?._id)}>
                  <Trash2 size={20} color="red" />
                </button>
              )}
            </div>
          ))}
        </div>
      </Center>
    </>
  );
};

export default SingleStudyPage;
