import { Link } from "react-router-dom";
import { useState } from "react";

import { useAuthStore } from "../../store/authStore";

import { LucideMenu, NotebookPen, X } from "lucide-react";
import MenuItems from "./MenuItems";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthStore();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header>
        <nav className="px-5 max-w-screen-2xl mx-auto py-3 flex items-center justify-between">
          <Link to={"/"}>
            <h1 className="text-3xl font-domine font-bold">studies.</h1>
          </Link>

          <Link to={"/new-study"}>
            <NotebookPen strokeWidth={1} size={36} />
          </Link>

          <div onClick={toggleMenu} className="flex items-center space-x-4">
            <img
              src={user?.avatar || "./avatar1.png"}
              alt="user img"
              className="hidden xl:block size-9 rounded-full object-cover cursor-pointer"
            />

            <button className="relative">
              <LucideMenu
                size={40}
                className={`xl:hidden absolute right-0 -top-5 transition-opacity duration-200 ease-in-out ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />

              <X
                size={40}
                className={`z-50 absolute right-0 -top-5 transition-opacity duration-200 ease-in-out ${
                  isMenuOpen ? "opacity-100" : "opacity-0"
                } xl:hidden`}
              />
            </button>
          </div>

          <MenuItems isMenuOpen={isMenuOpen} />

          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-30"
              onClick={toggleMenu}
            />
          )}
        </nav>
      </header>

      <div className="h-[1px] bg-black opacity-5" />
    </>
  );
};

export default Navbar;
