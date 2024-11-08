import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { ToastContainer } from "react-toastify";
import { XCircle } from "lucide-react";

import { useAuthStore } from "../store/authStore";
import Button from "../components/Button";
import Input from "../components/Input";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(name, username, email, password);
      navigate("/");
    } catch (error) {
      console.log("Erro ao clicar no botão de signup: ", error);
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="relative w-screen h-screen">
        <img
          src="/login-bg.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Signup Background"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="bg-white/85 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-10 min-w-[350px] rounded-2xl shadow-lg">
          <h1 className="text-center text-[32px] font-medium max-w-[190px] mx-auto leading-none">
            Crie agora sua conta!
          </h1>

          <form
            onSubmit={handleSignUp}
            className="mt-8 flex flex-col max-w-[400px] mx-auto"
          >
            <div className="space-y-3">
              <Input
                type="text"
                placeholder="Nome e sobrenome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                <Button type="submit" primary content={"Criar conta"} />
              )}
              <p className="text-primary-dark font-medium text-sm my-3">
                Já possui uma conta?
              </p>
              <Link to={"/login"}>
                <Button content={"Fazer login"} />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
