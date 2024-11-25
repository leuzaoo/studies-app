import React, { useState } from "react";
import { useMetricsStore } from "../../store/metricsStore";

const LikeButton = ({ studyId, initialLikes, hasLiked }) => {
  const toggleStudyLike = useMetricsStore((state) => state.toggleStudyLike);
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(hasLiked);

  const handleLike = async () => {
    try {
      const response = await toggleStudyLike(studyId);
      setLikes(response.likes);
      setLiked(response.hasLiked);
    } catch {
      console.error("Erro ao curtir estudo.");
    }
  };
  return (
    <button onClick={handleLike} className={liked ? "liked" : "not-liked"}>
      {liked ? "liked" : "not-liked"} {likes}
    </button>
  );
};

export default LikeButton;
