import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useAuthStore } from "../../store/authStore";

import {
  LogOut,
  NotebookIcon,
  NotebookPen,
  Settings2Icon,
  User,
} from "lucide-react";

const MenuItems = ({ isMenuOpen }) => {
  const { logout, user } = useAuthStore();

  const handleLogout = (e) => {
    e.preventDefault();

    logout();

    window.location.reload();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg w-4/5 max-w-xs transition-transform duration-300 ease-in-out z-40 ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <ul className="flex flex-col justify-between h-full p-7">
        <div className="flex flex-col space-y-6 font-light">
          <Link
            to={"/about-me"}
            className="flex items-center gap-5 text-lg hover:text-gray-500 cursor-pointer"
          >
            <User strokeWidth={1} size={24} />
            Perfil
          </Link>
          <Link
            to={"/new-study"}
            className="flex items-center gap-5 text-lg hover:text-gray-500 cursor-pointer"
          >
            <NotebookPen strokeWidth={1} size={24} />
            Criar estudo
          </Link>
          <Link to={"/my-studies"}>
            <li className="flex items-center gap-5 text-lg hover:text-gray-500 cursor-pointer">
              <NotebookIcon strokeWidth={1} size={24} />
              Estudoteca
            </li>
          </Link>
          <li className="flex items-center gap-5 text-lg hover:text-gray-500 cursor-pointer">
            <Settings2Icon strokeWidth={1} size={24} />
            Configurações
          </li>
        </div>
        {user ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-3 bg-primary-orange max-w-max px-4 py-1 rounded-lg mx-auto text-white font-light cursor-pointer"
          >
            Sair
            <LogOut
              size={16}
              className="bg-transparent"
              color="white"
              strokeWidth={2}
            />
          </motion.button>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default MenuItems;
