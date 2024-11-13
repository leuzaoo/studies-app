import { Link } from "react-router-dom";

import { formatDate } from "../utils/formatDate.js";

const MyStudiesStudyCard = ({
  title,
  description,
  bannerImage,
  _id,
  createdAt,
}) => {
  return (
    <>
      <Link
        to={"/study/" + _id}
        className="flex gap-5 items-center justify-between w-full"
      >
        <div className="flex flex-col justify-between">
          <h2 className="font-semibold text-lg md:text-xl leading-none">
            {title}
          </h2>
          <p className="leading-none text-sm md:text-base font-light">
            {description}
          </p>
          <p className="font-light text-terciary-grey text-[12px] md:text-sm mt-1">
            Criado em {formatDate(createdAt)}
          </p>
        </div>
        <img
          src={`${bannerImage || "./banner.jpg"}`}
          className="mr-5 object-cover h-[80px] w-[80px] shadow-md rounded-xl"
        />
      </Link>
    </>
  );
};

export default MyStudiesStudyCard;
