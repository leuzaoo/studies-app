import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

import { useAuthStore } from "../store/authStore";

import {
  LogOut,
  Menu,
  NotebookIcon,
  NotebookPen,
  Settings2Icon,
  User,
  X,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { logout } = useAuthStore();

  return (
    <>
      <header>
        <nav className="bg-primary-bg px-5 max-w-screen-2xl mx-auto py-3 flex items-center justify-between">
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
            className={`fixed top-0 right-0 h-full bg-white shadow-lg w-4/5 max-w-xs transition-transform duration-300 ease-in-out z-40 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <ul className="flex flex-col justify-between h-full p-6 bg-primary-bg">
              <div className="flex flex-col space-y-6 font-light">
                <Link
                  to={"/new-study"}
                  className="flex items-center gap-3 text-lg hover:text-gray-500 cursor-pointer"
                >
                  <NotebookPen strokeWidth={1} />
                  Novo estudo
                </Link>
                <Link
                  to={"/about-me"}
                  className="flex items-center gap-3 text-lg hover:text-gray-500 cursor-pointer"
                >
                  <User strokeWidth={1} />
                  Minha conta
                </Link>
                <Link to={"/my-studies"}>
                  <li className="flex items-center gap-3 text-lg hover:text-gray-500 cursor-pointer">
                    <NotebookIcon strokeWidth={1} />
                    Meus estudos
                  </li>
                </Link>
                <li className="flex items-center gap-3 text-lg hover:text-gray-500 cursor-pointer">
                  <Settings2Icon strokeWidth={1} />
                  Configurações
                </li>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="flex items-center gap-2 bg-primary-orange max-w-max px-3 py-1 rounded-lg mx-auto text-white font-light cursor-pointer"
              >
                Sair
                <LogOut
                  size={16}
                  className="bg-transparent"
                  color="white"
                  strokeWidth={2}
                />
              </motion.button>
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

      <div className="h-[1px] bg-black opacity-5" />
    </>
  );
};

export default Navbar;
