import { MessageCircle, Heart, TriangleAlert } from "lucide-react";
import { useMetricsStore } from "../store/metricsStore";
import { useAuthStore } from "../store/authStore.js";
import { formatDate } from "../utils/formatDate.js";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Dropdown } from "antd";

const HomepageStudyCard = ({
  title,
  description,
  userImage,
  bannerImage,
  _id,
  username,
  createdAt,
  commentsCount,
  likesCount,
  hasLiked,
}) => {
  const toggleStudyLike = useMetricsStore((state) => state.toggleStudyLike);
  const [likes, setLikes] = useState(likesCount || 0);
  const [liked, setLiked] = useState(hasLiked || false);
  const { user } = useAuthStore();

  const [showPopup, setShowPopup] = useState(false);

  const handleLike = async () => {
    if (!user) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1500);
      return;
    }

    const newLikedState = !liked;
    const newLikesCount = newLikedState ? likes + 1 : likes - 1;

    setLiked(newLikedState);
    setLikes(newLikesCount);

    try {
      const response = await toggleStudyLike(_id);
      setLikes(response.likes);
      setLiked(response.hasLiked);
    } catch (error) {
      setLiked(!newLikedState);
      setLikes(newLikedState ? likes - 1 : likes + 1);
      console.error("Erro ao alternar like:", error);
    }
  };

  return (
    <Link
      to={"/study/" + _id}
      className="flex gap-10 items-center justify-between py-3"
    >
      <div className="flex flex-col justify-between gap-3 max-w-[520px]">
        <h2 className="font-semibold md:text-2xl leading-none">{title}</h2>
        <p className="font-domine leading-none text-[12px] md:text-base font-light">
          {description.length > 60
            ? description.substring(0, 60) + "..."
            : description}
        </p>
        <div className="flex gap-2 items-center">
          <img
            src={`${userImage || "./avatar2.png"} `}
            className="w-6 h-6 rounded-full"
          />
          <p className="font-extralight text-terciary-grey lowercase text-[12px] md:text-sm">
            <span className="mr-2">{username}</span>•
            <span className="ml-2">{formatDate(createdAt)}</span>
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex gap-1 items-center">
            <MessageCircle strokeWidth={2} color="grey" size={16} />
            <span className="text-sm text-terciary-grey font-light">
              {commentsCount}
            </span>
          </div>
          <Dropdown
            open={showPopup}
            overlay={
              <div className="bg-white border flex items-center gap-2 rounded-md p-2 shadow">
                <TriangleAlert size={20} color="red" />
                <p className="text-sm font-medium text-red-500">
                  Você precisa estar logado.{" "}
                  <Link to={"/login"} className="underline text-blue-500">
                    Entrar
                  </Link>
                </p>
              </div>
            }
            placement="top"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                handleLike();
              }}
              className="flex gap-1 items-center"
            >
              <Heart
                strokeWidth={2}
                color={liked ? "red" : "grey"}
                fill={liked ? "red" : "none"}
                size={16}
              />
              <span className="text-sm text-terciary-grey font-light">
                {likes}
              </span>
            </button>
          </Dropdown>
        </div>
      </div>
      <img
        src={`${bannerImage || "./banner.jpg"} `}
        className="object-cover min-w-[120px] max-w-[120px] h-[68px] md:max-w-[160px] md:min-w-[200px] md:h-[112px] rounded-xl shadow-lg"
      />
    </Link>
  );
};

export default HomepageStudyCard;
