import { useAuthStore } from "../store/authStore";

import LabelFormTitle from "../components/LabelFormTitle";
import TitlePage from "../components/TitlePage";
import TextArea from "../components/TextArea";
import Center from "../components/Center";
import Navbar from "../components/Navbar";
import Input from "../components/Input";

const AboutMe = () => {
  const { user, error, isLoading } = useAuthStore();
  return (
    <>
      <Navbar />
      <Center>
        <TitlePage text="Sobre mim" />

        <form>
          <div className="mt-2">
            <LabelFormTitle htmlFor="fotoPerfil" text="Foto do perfil" />
            <div className="flex items-center mt-2 gap-5 max-w-max">
              <img
                src="./user.jpg"
                className="size-10 rounded-full shadow-md"
                alt="user profile image"
              />
              <div className="flex flex-col">
                <input type="file" id="fotoPerfil" className="hidden" />
                <label
                  className="text-sm cursor-pointer bg-cyan-600 text-primary-bg px-2 py-2 rounded-lg"
                  htmlFor="fotoPerfil"
                >
                  Alterar imagem
                </label>
              </div>
              <button className="text-sm cursor-pointer bg-red-100 text-red-600 px-2 py-2 rounded-lg">
                Remover imagem
              </button>
            </div>
          </div>

          <div className="mt-5">
            <LabelFormTitle text="Nome pessoal" />
            <Input
              type="text"
              value={user?.name}
              className={"mt-2 font-semibold"}
            />
          </div>

          <div className="mt-5">
            <LabelFormTitle text="Nome de usuário" />
            <Input
              type="text"
              value={user?.username}
              className={"mt-2 font-semibold"}
            />
          </div>

          <div className="mt-5">
            <LabelFormTitle text="Email" />
            <Input
              type="email"
              value={user?.email}
              className={"mt-2 font-semibold"}
            />
          </div>

          <div className="mt-5">
            <LabelFormTitle text="Sobre mim" />
            <TextArea
              type="text"
              value={user?.about}
              className={"mt-2 font-semibold"}
            />
          </div>

          <div className="w-full text-right mt-5">
            <button
              className="text-sm h-8 max-w-max px-3 rounded-lg bg-cyan-600 text-primary-bg "
              type="submit"
            >
              Salvar alterações
            </button>
          </div>
        </form>
      </Center>
    </>
  );
};

export default AboutMe;
