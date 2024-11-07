import { Link } from "react-router-dom";

import { formatDate } from "../utils/formatDate.js";

const HomepageStudyCard = ({
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
      <Link
        to={"/studies/posted/" + _id}
        className="flex gap-5 items-center py-3"
      >
        <div className="flex flex-col justify-between gap-3">
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
            <p className="font-light text-terciary-grey lowercase text-[12px] md:text-sm">
              <span className="mr-2">{username}</span>•
              <span className="ml-2">{formatDate(createdAt)}</span>
            </p>
          </div>
        </div>
        <img
          src={`${bannerImage || "./banner.jpg"} `}
          className="object-cover h-[80px] w-[80px] shadow-md rounded-xl"
        />
      </Link>
    </>
  );
};

export default HomepageStudyCard;
