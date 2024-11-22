import { useAuthStore } from "../store/authStore";
import HomepageStudyCard from "./HomepageStudyCard";

const Results = ({ results }) => {
  const { user } = useAuthStore();

  return (
    <div className="my-5">
      <h1 className="font-semibold text-2xl">Resultados</h1>
      <ul className="list-none p-0">
        {Array.isArray(results) && results.length > 0 ? (
          results.map((study) => (
            <li key={study._id} className="py-2 border-b">
              <HomepageStudyCard
                key={study._id}
                _id={study._id}
                title={study.title}
                description={study.description}
                userImage={study.author.image}
                bannerImage={study.bannerImage}
                username={study.author.username}
                createdAt={study.createdAt}
                commentsCount={study.comments.length}
                likesCount={study.likes.length}
                hasLiked={user ? study.likes.includes(user._id) : false}
              />
            </li>
          ))
        ) : (
          <li className="text-sm text-gray-500">
            Não foi encontrado estudos com esses filtros.
          </li>
        )}
      </ul>
    </div>
  );
};

export default Results;
