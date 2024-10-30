import { useEffect, useState } from "react";
import axios from "axios";

import categories from "../../../backend/config/categories";
import CategoryMenu from "../components/CategoryMenu";
import SearchBar from "../components/SearchBar";
import TitlePage from "../components/TitlePage";
import Results from "../components/Results";
import Navbar from "../components/Navbar";
import Center from "../components/Center";

const fetchStudies = async (query = "", category = "Tudo") => {
  const endpoint = query
    ? `http://localhost:5000/api/v1/studies/search?q=${query}`
    : category === "Tudo"
    ? "http://localhost:5000/api/v1/studies/all"
    : `http://localhost:5000/api/v1/studies/search?q=${category}`;

  const response = await axios.get(endpoint);
  return response.data.studies;
};

const Homepage = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("Tudo");
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setResults([]);
      setIsSearchOpen(false);
      return;
    }

    try {
      const studies = await fetchStudies(query);
      setResults(studies);
      setIsSearchOpen(true);
    } catch (error) {
      console.error(
        "Erro ao buscar estudos:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studies = await fetchStudies("", selectedCategory);
        setResults(studies);
        setIsSearchOpen(false);
      } catch (error) {
        console.error(
          "Erro ao buscar estudos:",
          error.response?.data || error.message
        );
      }
    };

    fetchData();
  }, [selectedCategory]);

  return (
    <>
      <Navbar />
      <Center className="font-outfit">
        <div>
          <TitlePage text={"Descubra"} />
          <p className="text-sm text-medium-grey">
            Selecione o tema do estudo que deseja ver
          </p>
        </div>

        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />
      </Center>

      <CategoryMenu
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <Center>
        <Results results={results} />
      </Center>
    </>
  );
};

export default Homepage;
