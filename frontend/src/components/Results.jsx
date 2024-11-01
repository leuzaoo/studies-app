import { Link } from "react-router-dom";

import { formatDate } from "../utils/formatDate";

const Results = ({ results }) => {
  return (
    <div className="my-5">
      <h3 className="font-semibold text-2xl">Resultados</h3>
      <ul className="list-none p-0">
        {Array.isArray(results) && results.length > 0 ? (
          results.map((study) => (
            <li key={study._id} className="py-2 border-b">
              <Link to={"/studies/posted/" + study._id} className="flex py-3">
                <img
                  src={`./banner.jpg`}
                  className="object-cover h-[100px] w-[100px] shadow-md rounded-[20px]"
                />
                <div className="flex flex-col justify-between ml-4">
                  <span className="text-terciary-grey font-medium text-sm">
                    {study.category}
                  </span>
                  <p className="font-semibold">{study.title}</p>
                  <div className="flex items-center">
                    <img src="/user.jpg" className="w-6 h-6 rounded-full" />
                    <p className="ml-2 text-terciary-grey font-medium lowercase text-[12px]">
                      <span className="mr-2">{study.author?.username}</span>•
                      <span className="ml-2">
                        {formatDate(study.createdAt)}
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <li className="text-sm text-gray-500">
            Nenhum resultado encontrado.
          </li>
        )}
      </ul>
    </div>
  );
};

export default Results;
