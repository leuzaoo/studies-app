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
        className="flex gap-10 items-center justify-between py-3"
      >
        <div className="flex flex-col justify-between gap-3 max-w-[520px]">
          <h2 className="font-semibold  md:text-2xl leading-none">{title}</h2>
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
        </div>
        <img
          src={`${bannerImage || "./banner.jpg"} `}
          className="object-cover h-[60px] w-[60px] md:h-[100px] md:w-[100px] shadow-md rounded-xl"
        />
      </Link>
    </>
  );
};

export default HomepageStudyCard;
