import { useCallback, useEffect, useState } from "react";
import { Skeleton } from "antd";

import categories from "../../../backend/config/categories";
import { useStudyStore } from "../store/studyStore";

import CategoryMenu from "../components/CategoryMenu";
import Navbar from "../components/navbar/Navbar";
import SearchBar from "../components/SearchBar";
import TitlePage from "../components/TitlePage";
import Results from "../components/Results";
import Center from "../components/Center";

const Homepage = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tudo");
  const [results, setResults] = useState([]);

  const { fetchStudies, isLoading } = useStudyStore();

  const fetchAndSetResults = useCallback(
    async (query = "", category = "Tudo") => {
      try {
        const studies = await fetchStudies(query, category);
        setResults(studies);
        setIsSearchOpen(!!query);
      } catch (error) {
        console.error(
          "Erro ao buscar estudos:",
          error.response?.data || error.message
        );
      }
    },
    [fetchStudies]
  );

  const handleSearch = (query) => {
    if (!query.trim()) {
      setResults([]);
      setIsSearchOpen(false);
      return;
    }
    fetchAndSetResults(query, selectedCategory);
  };

  useEffect(() => {
    fetchAndSetResults("", selectedCategory);
  }, [selectedCategory, fetchAndSetResults]);

  return (
    <>
      <Navbar />
      <Center>
        <section>
          <TitlePage text={"Descubra"} />
          <p className="text-sm text-medium-grey">
            Selecione o tema do estudo que deseja ver
          </p>
        </section>

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

        {isLoading ? (
          <>
            <ul className="mt-5 flex flex-col gap-12 justify-between h-full">
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </ul>
          </>
        ) : (
          <Results results={results} />
        )}
      </Center>
    </>
  );
};

export default Homepage;
