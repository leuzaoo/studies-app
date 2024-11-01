import { Link } from "react-router-dom";

import { formatDate } from "../utils/formatDate.js";

const StudyCard = ({
  title,
  description,
  category,
  _id,
  username,
  createdAt,
}) => {
  return (
    <>
      <Link to={"/studies/posted/" + _id} className="flex py-3">
        <img
          src={`./banner.jpg`}
          className="object-cover h-[100px] w-[100px] shadow-md rounded-[20px]"
        />
        <div className="flex flex-col justify-between ml-4">
          <span className="text-terciary-grey font-medium text-sm">
            {category}
          </span>

          <h2 className="font-semibold">{title}</h2>
          <p className="text-sm">{description}</p>
          <div className="flex items-center">
            <img src="/user.jpg" className="w-6 h-6 rounded-full" />
            <p className="ml-2 text-terciary-grey font-medium lowercase text-[12px]">
              <span className="mr-2">{username}</span>•
              <span className="ml-2">{formatDate(createdAt)}</span>
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default StudyCard;
