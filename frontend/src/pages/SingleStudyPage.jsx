import { useEffect, useRef, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Input, Skeleton, Tooltip } from "antd";

import { useCommentStore } from "../store/commentsStore.js";
import { useMetricsStore } from "../store/metricsStore.js";
import styles from "../assets/singleStudyPage.module.css";
import { useStudyStore } from "../store/studyStore.js";
import { useAuthStore } from "../store/authStore.js";
import Button from "../components/Button.jsx";

import { MessageCircle, Trash2, UserCircle2Icon, Heart } from "lucide-react";
import ProgressBar from "../components/ProgressBar.jsx";
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

  const { toggleStudyLike } = useMetricsStore();

  const [study, setStudy] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const getStudy = async () => {
      try {
        const fetchedStudy = await fetchSingleStudy(id);
        setStudy(fetchedStudy);
        setLikes(fetchedStudy?.likes?.length || 0);
        setLiked(fetchedStudy?.likes?.includes(user?._id));
      } catch (error) {
        console.error("Erro ao buscar estudo:", error);
      }
    };

    if (id) {
      getStudy();
      fetchComments(id);
    }
  }, [id, fetchSingleStudy, fetchComments, user]);

  const handleLike = async () => {
    if (!user) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 4000);
      return;
    }

    const newLikedState = !liked;
    const newLikesCount = newLikedState ? likes + 1 : likes - 1;

    setLiked(newLikedState);
    setLikes(newLikesCount);

    try {
      const response = await toggleStudyLike(id);
      setLikes(response.likes.length);
      setLiked(response.likes.includes(user._id));
    } catch (error) {
      setLiked(!newLikedState);
      setLikes(newLikedState ? likes - 1 : likes + 1);
      console.error("Erro ao alternar like:", error);
    }
  };

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

          <section className="my-3 flex items-center gap-3">
            <h2 className="hidden">Métricas</h2>
            <div className="flex items-center gap-1">
              <MessageCircle size={20} color="grey" strokeWidth={1} />
              <span className="text-terciary-grey">
                {study.comments.length}
              </span>
            </div>
            <Tooltip
              title={
                <p className="text-white">
                  Faça login para curtir.
                  <Link className="ml-1 underline font-bold" to={"/login"}>
                    Entrar
                  </Link>
                </p>
              }
              open={showTooltip}
              color="red"
            >
              <button onClick={handleLike} className="flex items-center gap-1">
                <Heart
                  size={20}
                  strokeWidth={1}
                  color={liked ? "red" : "grey"}
                  fill={liked ? "red" : "none"}
                />
                <span className="text-terciary-grey">{likes}</span>
              </button>
            </Tooltip>
          </section>

          <div
            className={`${styles.content}`}
            dangerouslySetInnerHTML={{ __html: study.content }}
          />

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Comentários</h2>
            {!user ? (
              <div className="flex items-start gap-3">
                <UserCircle2Icon size={48} color="grey" strokeWidth={1} />
                <div className="border w-full rounded-md p-3">
                  <p>Para comentar você precisa estar logado.</p>
                  <div className="flex items-center gap-3">
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
            ) : (
              <div className="mb-5 w-full">
                <div className="flex items-start justify-end gap-3">
                  <img
                    src={user.userImage}
                    className="size-12 rounded-full"
                    alt={`${user.username} profile image`}
                  />
                  <Input
                    allowClear
                    showCount
                    maxLength={200}
                    className="p-3 focus:outline-none rounded-xl"
                    placeholder="Adicione um comentário..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                </div>
                <div className="flex items-end justify-end">
                  <Button
                    type="submit"
                    className="!max-w-max w-full px-6 mt-3 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={handleAddComment}
                    primary
                    disabled={!newComment.trim()}
                    content={"Comentar"}
                  />
                </div>
              </div>
            )}
          </div>

          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex items-start justify-between gap-3 border mb-3 p-3 rounded-md"
            >
              <div className="flex items-start gap-3 w-full">
                <img
                  src={comment?.author?.userImage}
                  className="size-10 rounded-full shadow-md"
                  alt={`${comment?.author?.username} profile image`}
                />
                <div className="flex flex-col w-full">
                  <div className="flex flex-col items-start">
                    <div className="flex items-center justify-between w-full">
                      <Link
                        to={`/${comment?.author?.username}`}
                        className="hover:underline"
                      >
                        <p className="font-bold text-base">
                          {comment?.author?.username}
                        </p>
                      </Link>
                      <span className="text-xs font-extralight text-terciary-grey">
                        {formatDate(comment?.createdAt)}
                      </span>
                    </div>
                  </div>
                  <p className="break-all text-sm mt-2">{comment?.content}</p>
                </div>
              </div>
              {user?._id === comment.author._id && (
                <button
                  onClick={() => handleDeleteComment(comment._id)}
                  className="hover:opacity-70 cursor-pointer"
                >
                  <Trash2 size={20} color="red" strokeWidth={1} />
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
