import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import { useState } from "react";

import { ToastContainer } from "react-toastify";
import { XCircle } from "lucide-react";

import { useAuthStore } from "../store/authStore";

import Button from "../components/Button";
import Input from "../components/Input";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");

  const { login, isLoading, error } = useAuthStore();

  const onCaptchaChange = (token) => {
    console.log("Captcha resolvido, token recebido:", token);
    setCaptchaToken(token);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const success = await login(username, password, captchaToken);

    if (!success) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        setShowCaptcha(true);
      }
    } else {
      setAttempts(0);
      setShowCaptcha(false);
      setCaptchaToken("");
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="relative h-screen w-screen">
        <img
          src="/login-bg.jpg"
          className="absolute inset-0 h-full w-full object-cover"
          alt="Login Background"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute left-1/2 top-1/2 min-w-[350px] -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-white/85 px-6 py-10 shadow-lg">
          <h1 className="mx-auto max-w-[190px] text-center text-[32px] font-medium leading-none">
            Acesse aqui sua conta!
          </h1>

          <form
            onSubmit={handleLogin}
            className="mx-auto mt-8 flex max-w-[400px] flex-col"
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
              <div className="mb-6 mt-4 flex items-center gap-2 text-sm text-red-600">
                <XCircle className="size-5" />
                <p className="font-semibold">{error}</p>
              </div>
            )}

            {showCaptcha && (
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={onCaptchaChange}
              />
            )}

            <div className="mt-5 text-center">
              {isLoading ? (
                <Button disabled primary content={"Carregando..."} />
              ) : (
                <Button
                  content={"Entrar"}
                  primary
                  disabled={showCaptcha && !captchaToken}
                />
              )}

              <p className="my-3 text-sm font-medium text-primary-dark">
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
