import { Center } from "../components/Center";
import { Search } from "lucide-react";

const Homepage = () => {
  const toggleSearch = (e) => {
    e.preventDefault();

    setIsSearchOpen(!isSearchOpen);
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

        <search>
          <div className="relative mt-5 z-10">
            <input
              className="w-full bg-primary-grey placeholder:text-medium-grey placeholder:text-sm pl-4 h-10 rounded-[20px] focus:outline-primary-orange outline-none"
              type="text"
              placeholder="Pesquisar"
            />
  
            <button onClick={toggleSearch}>
              <Search
                color="grey"
                className="absolute right-4 top-2 bg-transparent"
              />
            </button>
          </div>
        </search>
      </Center>
    </>
  );
};

export default Homepage;
