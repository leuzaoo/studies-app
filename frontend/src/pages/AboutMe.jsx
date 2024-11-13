import imageCompression from "browser-image-compression";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { toast, ToastContainer } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";

import LabelFormTitle from "../components/LabelFormTitle";
import Navbar from "../components/navbar/Navbar";
import TitlePage from "../components/TitlePage";
import TextArea from "../components/TextArea";
import Center from "../components/Center";
import Input from "../components/Input";

const AboutMe = () => {
  const { user, error, isLoading, message } = useAuthStore();
  const { updateUserProfile } = useUserStore();

  const [name, setName] = useState(user?.name || "");
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [about, setAbout] = useState(user?.about || "");
  const [profilePicture, setProfilePicture] = useState("");

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    const MAX_FILE_SIZE = 2 * 1024 * 1024;

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("O tamanho da imagem deve ser no máximo 2MB.");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Formato da imagem inválido.");
        return;
      }

      if (file) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };

        try {
          const compressedFile = await imageCompression(file, options);
          const reader = new FileReader();
          reader.onloadend = () => {
            setProfilePicture(reader.result);
          };
          reader.readAsDataURL(compressedFile);
        } catch (error) {
          console.error("Erro ao comprimir imagem:", error);
          toast.error(
            "Erro ao processar a imagem. Tente novamente mais tarde."
          );
        }
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (user) {
      setProfilePicture(user.userImage);
      setUsername(user.username);
      setEmail(user.email);
      setAbout(user.about);
      setName(user.name);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      name,
      username,
      email,
      about,
      userImage: profilePicture,
    };

    try {
      await updateUserProfile(updatedData);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    }
  };

  return (
    <>
      <ToastContainer autoClose={1500} />
      <Navbar />
      <Center>
        <TitlePage text="Sobre mim" className={"hidden"} />
        <form onSubmit={handleSubmit}>
          <div>
            <LabelFormTitle htmlFor="fotoPerfil" text="Foto do perfil" />
            <div className="flex items-center mt-2 gap-5 max-w-max">
              <img
                src={profilePicture || user?.userImage || "./avatar2.png"}
                className="size-10 rounded-full shadow-md"
                alt="user profile image"
              />
              <div className="flex flex-col">
                <input
                  type="file"
                  id="fotoPerfil"
                  className="hidden"
                  onChange={handleProfilePictureChange}
                />
                <label
                  className="text-sm md:text-base cursor-pointer bg-cyan-600 text-primary-bg px-2 py-2 rounded-lg hover:bg-cyan-500 transition-all duration-200"
                  htmlFor="fotoPerfil"
                >
                  Alterar imagem
                </label>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <LabelFormTitle text="Nome pessoal" />
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 font-bold font-domine"
            />
          </div>

          <div className="mt-5">
            <LabelFormTitle text="Nome de usuário" />
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 font-bold font-domine"
            />
          </div>

          <div className="mt-5">
            <LabelFormTitle text="Email" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 font-bold font-domine"
            />
          </div>

          <div className="mt-5">
            <LabelFormTitle text="Sobre mim" />
            <TextArea
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="mt-2 font-bold font-domine"
            />
          </div>

          {error && <p className="text-red-500 mt-3">{error}</p>}
          {message && <p className="text-green-500 mt-3">{message}</p>}

          <div className="w-full text-right mt-5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm md:text-base h-8 max-w-max px-3 rounded-lg bg-cyan-600 text-primary-bg"
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
