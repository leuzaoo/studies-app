const Results = ({ results }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Resultados:</h3>
      <ul className="border border-gray-200 p-4">
        {Array.isArray(results) && results.length > 0 ? (
          results.map((study) => (
            <li key={study._id} className="py-2 border-b">
              <strong>{study.title}</strong> - {study.category}
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
