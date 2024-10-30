import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useAuthStore } from "../store/authStore";
import { ToastContainer } from "react-toastify";

import LabelFormTitle from "../components/LabelFormTitle";
import TitlePage from "../components/TitlePage";
import TextArea from "../components/TextArea";
import Center from "../components/Center";
import Navbar from "../components/Navbar";
import Input from "../components/Input";

const AboutMe = () => {
  const { user, error, isLoading, updateUserProfile, message } = useAuthStore();

  const [name, setName] = useState(user?.name || "");
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [about, setAbout] = useState(user?.about || "");
  // const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
      setEmail(user.email);
      setAbout(user.about);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      name,
      username,
      email,
      about,
      // ...(profilePicture && { avatar: profilePicture }), // Caso a imagem seja atualizada
    };

    try {
      await updateUserProfile(updatedData);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    }
  };

  // const handleProfilePictureChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setProfilePicture(file);
  //   }
  // };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <Navbar />
      <Center>
        <TitlePage text="Sobre mim" />
        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <LabelFormTitle htmlFor="fotoPerfil" text="Foto do perfil" />
            <div className="flex items-center mt-2 gap-5 max-w-max">
              <img
                src={user?.avatar || "./user.jpg"}
                className="size-10 rounded-full shadow-md"
                alt="user profile image"
              />
              <div className="flex flex-col">
                <input
                  type="file"
                  id="fotoPerfil"
                  className="hidden"
                  // onChange={handleProfilePictureChange}
                />
                <label
                  className="text-sm cursor-pointer bg-cyan-600 text-primary-bg px-2 py-2 rounded-lg hover:bg-cyan-500 transition-all duration-200"
                  htmlFor="fotoPerfil"
                >
                  Alterar imagem
                </label>
              </div>
              <button
                type="button"
                className="text-sm cursor-pointer bg-red-100 text-red-600 px-2 py-2 rounded-lg hover:bg-red-200 transition-all duration-200"
                onClick={() => setProfilePicture(null)}
              >
                Remover imagem
              </button>
            </div>
          </div>

          <div className="mt-5">
            <LabelFormTitle text="Nome pessoal" />
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 font-semibold"
            />
          </div>

          <div className="mt-5">
            <LabelFormTitle text="Nome de usuário" />
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 font-semibold"
            />
          </div>

          <div className="mt-5">
            <LabelFormTitle text="Email" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 font-semibold"
            />
          </div>

          <div className="mt-5">
            <LabelFormTitle text="Sobre mim" />
            <TextArea
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="mt-2 font-semibold"
            />
          </div>

          {error && <p className="text-red-500 mt-3">{error}</p>}
          {message && <p className="text-green-500 mt-3">{message}</p>}

          <div className="w-full text-right mt-5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm h-8 max-w-max px-3 rounded-lg bg-cyan-600 text-primary-bg"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Salvar alterações"}
            </motion.button>
          </div>
        </form>
      </Center>
    </>
  );
};

export default AboutMe;
