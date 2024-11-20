import HomepageStudyCard from "./HomepageStudyCard";

const Results = ({ results }) => {
  return (
    <div className="my-5">
      <h1 className="font-semibold text-2xl">Resultados</h1>
      <ul className="list-none p-0">
        {Array.isArray(results) && results.length > 0 ? (
          results.map((study) => (
            <li key={study._id} className="py-2 border-b">
              <HomepageStudyCard
                _id={study._id}
                key={study._id}
                title={study.title}
                bannerImage={study.bannerImage}
                userImage={study.author.userImage}
                description={study.description}
                username={study.author.username}
                createdAt={study.createdAt}
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
