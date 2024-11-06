import { useEffect, useState } from "react";

import categories from "../../../backend/config/categories";
import CategoryMenu from "../components/CategoryMenu";
import { useStudyStore } from "../store/studyStore";
import SearchBar from "../components/SearchBar";
import TitlePage from "../components/TitlePage";
import Results from "../components/Results";
import Navbar from "../components/Navbar";
import Center from "../components/Center";

const Homepage = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("Tudo");
  const [results, setResults] = useState([]);

  const { fetchStudies } = useStudyStore();

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

        <CategoryMenu
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        <Results results={results} />
      </Center>
    </>
  );
};

export default Homepage;
