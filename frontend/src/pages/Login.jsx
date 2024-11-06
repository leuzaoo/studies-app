import { useState } from "react";

import Button from "../components/Button";
import Center from "../components/Center";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

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
      <Center>
        <section>
          <h1 className="mx-auto leading-none mt-[60px] w-[210px] font-medium text-[40px]">
            Acesse aqui sua conta!
          </h1>
        </section>
        <form onSubmit={handleLogin} className="mt-10 flex flex-col">
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
            <div className="flex items-center gap-2 text-sm mb-6">
              <XCircle className="text-red-600 size-5" />
              <p className="text-red-600 font-semibold">{error}</p>
            </div>
          )}

          <div className="mt-5 text-center">
            <Button primary content={"Entrar"} />
            <p className="text-primary-dark font-medium text-sm my-2 text-center">
              não possui uma conta?
            </p>
            <Link to={"/signup"}>
              <Button content={"Criar conta"} />
            </Link>
          </div>
        </form>
        {/* <footer className="mt-[264px] text-center">
          <h1 className="text-primary-dark text-sm">
            feito por Leonardo Costa.
          </h1>
        </footer> */}
      </Center>
    </>
  );
};

export default Login;
