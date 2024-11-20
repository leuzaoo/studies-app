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
    <aside
      className={`fixed top-0 right-0 h-full bg-white shadow-lg w-4/5 max-w-xs transition-transform duration-300 ease-in-out z-40 ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <Link to={"/profile"} className="hidden">
        <h4>Perfil</h4>
      </Link>
      <Link to={"/new-study"} className="hidden">
        <h4>Novo estudo</h4>
      </Link>
      <Link to={"/my-studies"} className="hidden">
        <h4>Estudoteca</h4>
      </Link>
      <Link to={"/settings"} className="hidden">
        <h4>Configurações</h4>
      </Link>
      <ul className="flex flex-col justify-between h-full p-7">
        <div className="flex flex-col space-y-6 font-light">
          {!user ? (
            <Link
              to={`/login`}
              className="flex items-center gap-5 text-lg hover:text-gray-500 cursor-pointer"
            >
              <User strokeWidth={1} size={24} />
            </Link>
          ) : (
            <Link
              to={`/${user?.username}`}
              className="flex items-center gap-5 text-lg hover:text-gray-500 cursor-pointer"
            >
              <User strokeWidth={1} size={24} />
              Perfil
            </Link>
          )}
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
          <Link to={"/settings"}>
            <li className="flex items-center gap-5 text-lg hover:text-gray-500 cursor-pointer">
              <Settings2Icon strokeWidth={1} size={24} />
              Configurações
            </li>
          </Link>
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
          <>
            <div className="flex items-center gap-5 justify-center">
              <Link to={"/signup"} className="">
                <button className="border border-primary-orange px-3 py-1 rounded-md text-primary-orange">
                  Criar conta
                </button>
              </Link>

              <Link to={"/login"} className="">
                <button className="px-3 py-1 bg-primary-orange border-primary-orange border text-white rounded-md">
                  Entrar
                </button>
              </Link>
            </div>
          </>
        )}
      </ul>
    </aside>
  );
};

export default MenuItems;
