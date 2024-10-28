import { Link } from "react-router-dom";
import { useState } from "react";

import { useAuthStore } from "../store/authStore";

import { Menu, X } from "lucide-react";
import Center from "./Center";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { logout } = useAuthStore();

  return (
    <>
      <Center>
        <header>
          <nav className="flex items-center justify-between">
            <Link to={"/"}>
              <h1 className="text-3xl font-domine font-bold">studies.</h1>
            </Link>

            <button onClick={toggleMenu} className="relative">
              <Menu
                size={40}
                className={`absolute right-0 -top-5 transition-opacity duration-200 ease-in-out ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />

              <X
                size={40}
                className={`z-50 absolute right-0 -top-5 transition-opacity duration-200 ease-in-out ${
                  isMenuOpen ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>

            <div
              className={` fixed top-0 right-0 h-full bg-white shadow-lg w-4/5 max-w-xs transition-transform duration-300 ease-in-out z-40 ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <ul className="flex flex-col p-6 space-y-4">
                <Link
                  to={"/about-me"}
                  className="text-lg font-semibold hover:text-gray-500 cursor-pointer"
                >
                  Minha conta
                </Link>
                <li className="text-lg font-semibold hover:text-gray-500 cursor-pointer">
                  Meus estudos
                </li>
                <li className="text-lg font-semibold hover:text-gray-500 cursor-pointer">
                  Configurações
                </li>

                <li
                  onClick={logout}
                  className="text-lg font-semibold hover:text-gray-500 cursor-pointer"
                >
                  Sair da conta
                </li>
              </ul>
            </div>

            {isMenuOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-30"
                onClick={toggleMenu}
              />
            )}
          </nav>
        </header>
      </Center>
      <div className="h-[1px] bg-black opacity-20" />
    </>
  );
};

export default Navbar;
