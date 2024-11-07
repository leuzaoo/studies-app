import { Link } from "react-router-dom";
import { useState } from "react";

import { ToastContainer } from "react-toastify";
import { XCircle } from "lucide-react";

import { useAuthStore } from "../store/authStore";
import Button from "../components/Button";
import Center from "../components/Center";
import Input from "../components/Input";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();

    await login(username, password);
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="relative w-screen h-screen">
        {/* Imagem de fundo */}
        <img
          src="/login-bg.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Login Background"
        />
        {/* Overlay escurecido */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Formulário centralizado sobre a imagem */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-bg px-6 py-10 min-w-[350px] rounded-2xl shadow-lg">
          <h1 className="text-center text-[32px] font-medium max-w-[190px] mx-auto leading-none">
            Acesse aqui sua conta!
          </h1>

          <form
            onSubmit={handleLogin}
            className="mt-8 flex flex-col max-w-[400px] mx-auto"
          >
            <div className="space-y-3">
              <Input
                type="text"
                placeholder="Nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm mt-4 mb-6 text-red-600">
                <XCircle className="size-5" />
                <p className="font-semibold">{error}</p>
              </div>
            )}

            <div className="mt-5 text-center">
              {isLoading ? (
                <Button disabled content={"Carregando..."} />
              ) : (
                <Button content={"Entrar"} primary />
              )}

              <p className="text-primary-dark font-medium text-sm my-3">
                Não possui uma conta?
              </p>
              <Link to={"/signup"}>
                <Button content={"Criar conta"} />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
