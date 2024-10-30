import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { ToastContainer } from "react-toastify";
import { XCircle } from "lucide-react";

import { useAuthStore } from "../store/authStore";
import Button from "../components/Button";
import Center from "../components/Center";
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
      <Center>
        <section>
          <h1 className="mx-auto leading-none mt-[60px] w-[190px] font-medium text-[40px]">
            Crie agora sua conta!
          </h1>
        </section>
        <form onSubmit={handleSignUp} className="mt-10 flex flex-col">
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
            <div className="flex items-center gap-2 text-sm mb-6">
              <XCircle className="text-red-600 size-5" />
              <p className="text-red-600 font-semibold">{error}</p>
            </div>
          )}

          <div className="mt-5 text-center">
            <Button primary content={"Criar conta"} />
            <p className="text-primary-dark font-medium text-sm my-2 text-center">
              já possui uma conta?
            </p>
            <Link to={"/login"}>
              <Button content={"Fazer login"} />
            </Link>
          </div>
        </form>
        <footer className="mt-[160px] text-center">
          <h1 className="text-primary-dark text-sm">
            feito por Leonardo Costa.
          </h1>
        </footer>
      </Center>
    </>
  );
};

export default Signup;
