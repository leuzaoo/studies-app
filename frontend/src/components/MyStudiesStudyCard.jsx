import { Link } from "react-router-dom";

import { formatDate } from "../utils/formatDate.js";
import { MessageCircle } from "lucide-react";

const MyStudiesStudyCard = ({
  title,
  description,
  bannerImage,
  _id,
  createdAt,
  isPublic,
  commentsCount,
}) => {
  return (
    <>
      <Link
        to={"/study/" + _id}
        className="flex gap-5 items-center justify-between w-full"
      >
        <div className="flex flex-col justify-between space-y-1">
          <h2 className="font-semibold text-lg md:text-xl leading-none">
            {title}
          </h2>
          <p className="leading-none text-sm md:text-base font-light">
            {description}
          </p>
          <div className="flex items-center gap-3 w-full">
            <p className="font-light text-terciary-grey text-[12px] md:text-sm mt-1">
              Criado em {formatDate(createdAt)}
            </p>
            <p className="text-[12px] md:text-sm mt-1">{isPublic}</p>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle size={16} strokeWidth={2} />
            <span className="text-sm">{commentsCount}</span>
          </div>
        </div>
        <img
          src={`${bannerImage || "./banner.jpg"}`}
          className="mr-5 object-cover min-w-[120px] max-w-[120px] h-[68px] rounded-xl shadow-lg"
        />
      </Link>
    </>
  );
};

export default MyStudiesStudyCard;
