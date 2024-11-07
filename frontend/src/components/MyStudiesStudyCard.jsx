import { Link } from "react-router-dom";

import { formatDate } from "../utils/formatDate.js";

const MyStudiesStudyCard = ({
  title,
  description,
  userImage,
  bannerImage,
  _id,
  username,
  createdAt,
}) => {
  return (
    <>
      <Link to={"/studies/posted/" + _id} className="flex gap-5 items-center">
        <div className="flex flex-col justify-between">
          <h2 className="font-semibold text-lg md:text-xl leading-none">
            {title}
          </h2>
          <p className="leading-none text-sm md:text-base font-light">
            {description}
          </p>
          <div className="flex items-center">
            {/* <img
              src={`${userImage || "./user.jpg"} `}
              className="w-6 h-6 rounded-full"
            /> */}
            <p className="font-light text-terciary-grey text-[12px] md:text-sm mt-1">
              Criado em {formatDate(createdAt)}
            </p>
          </div>
        </div>
        <img
          src={`${bannerImage || "./banner.jpg"} `}
          className="hidden md:block object-cover h-[80px] w-[80px] shadow-md rounded-xl"
        />
      </Link>
    </>
  );
};

export default MyStudiesStudyCard;
