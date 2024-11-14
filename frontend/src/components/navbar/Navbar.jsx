import { Link } from "react-router-dom";
import { useState } from "react";

import { useAuthStore } from "../../store/authStore";

import {
  LucideMenu,
  NotebookPen,
  Plus,
  PlusCircle,
  UserCircle2Icon,
  X,
} from "lucide-react";

import MenuItems from "./MenuItems";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthStore();
  const pathname = window.location.pathname;

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

          {user ? (
            <>
              <div className="flex items-center gap-10">
                {pathname !== "/new-study" && (
                  <Link
                    to={"/new-study"}
                    className="md:flex items-center gap-2 p-1 md:px-3 md:py-1 rounded-md bg-primary-orange"
                  >
                    <Plus strokeWidth={2} size={20} color="white" />
                    <p className="hidden md:block text-white font-light">Novo estudo</p>
                  </Link>
                )}
                <div
                  onClick={toggleMenu}
                  className="flex items-center space-x-4"
                >
                  <img
                    src={user?.userImage}
                    alt="user img"
                    className="hidden md:block size-9 rounded-full object-cover cursor-pointer"
                  />

                  <button className="relative">
                    <LucideMenu
                      size={40}
                      className={`md:hidden absolute right-0 -top-5 transition-opacity duration-200 ease-in-out ${
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
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-5">
                <div
                  onClick={toggleMenu}
                  className="flex items-center space-x-4"
                >
                  <Link to={"/signup"}>
                    <button className="border border-primary-orange px-3 py-1 rounded-md text-primary-orange">
                      Criar conta
                    </button>
                  </Link>

                  <Link to={"/login"}>
                    <button className="px-3 py-1 bg-primary-orange border-primary-orange border text-white rounded-md">
                      Entrar
                    </button>
                  </Link>

                  <UserCircle2Icon
                    size={36}
                    strokeWidth={1}
                    color="grey"
                    className="cursor-pointer"
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
              </div>
            </>
          )}

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
