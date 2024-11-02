import StudyCard from "./StudyCard";

const Results = ({ results }) => {
  console.log(results);
  return (
    <div className="my-5">
      <h3 className="font-semibold text-2xl">Resultados</h3>
      <ul className="list-none p-0">
        {Array.isArray(results) && results.length > 0 ? (
          results.map((study) => (
            <li key={study._id} className="py-2 border-b">
              <StudyCard
                _id={study._id}
                key={study._id}
                title={study.title}
                description={study.description}
                username={study.author.username}
                category={study.category}
                createdAt={study.createdAt}
              />
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
