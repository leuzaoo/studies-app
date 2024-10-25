import { useState } from "react";
import axios from "axios";

import SearchBar from "../components/SearchBar";
import { Center } from "../components/Center";
import Results from "../components/Results";

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = async (query) => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/studies/search?q=${query}`
      );
      console.log("Resposta da API:", response.data);
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
    <Center className="font-outfit">
      <div>
        <h2 className="text-2xl font-medium">Descubra</h2>
        <p className="text-sm text-medium-grey">
          Selecione o tema do estudo que deseja ver
        </p>
      </div>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />

      {isSearchOpen && <Results results={results} />}
    </Center>
  );
};

export default Homepage;
