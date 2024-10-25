import { Search } from "lucide-react";

const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="relative mt-5">
      <input
        className="w-full bg-primary-grey placeholder:text-medium-grey placeholder:text-sm pl-4 h-10 rounded-[20px] focus:outline-primary-orange outline-none"
        type="text"
        placeholder="Pesquisar"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button onClick={() => onSearch(searchQuery)}>
        <Search
          color="grey"
          className="absolute right-4 top-2 z-50 bg-transparent"
        />
      </button>
    </div>
  );
};

export default SearchBar;
