import axios from "axios";

import { Center } from "../components/Center";
import { Search } from "lucide-react";
import { useState } from "react";

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = async (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);

    if (searchQuery.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/studies/search?q=${searchQuery}`
      );
      console.log("Resposta da API:", response.data);
      console.log("Dados de estudos:", response.data.studies);
      setResults(response.data.studies);
      setIsSearchOpen(true);
    } catch (error) {
      console.error(
        "Erro ao buscar estudos:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <Center className={"font-outfit"}>
        <div>
          <h2 className="text-2xl font-medium">Descubra</h2>
          <p className="text-sm text-medium-grey">
            Selecione o tema do estudo que deseja ver
          </p>
        </div>

        <div className="relative mt-5">
          <input
            className="w-full bg-primary-grey placeholder:text-medium-grey placeholder:text-sm pl-4 h-10 rounded-[20px] focus:outline-primary-orange outline-none"
            type="text"
            placeholder="Pesquisar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button onClick={toggleSearch}>
            <Search
              color="grey"
              className="absolute right-4 top-2 z-50 bg-transparent"
            />
          </button>
        </div>

        {isSearchOpen && (
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
        )}
      </Center>
    </>
  );
};

export default Homepage;
