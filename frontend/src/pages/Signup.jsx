import Button from "../components/Button";
import Center from "../components/Center";
import Input from "../components/Input";

const Signup = () => {
  return (
    <Center>
      <section>
        <h1 className="mx-auto leading-none mt-[60px] w-[190px] font-medium text-[40px]">
          Crie agora sua conta!
        </h1>
      </section>
      <form className="mt-10 flex flex-col">
        <div className="space-y-3">
          <Input type="text" placeholder="Nome e sobrenome" />
          <Input type="text" placeholder="Nome de usuário" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Senha" />
        </div>
        <div className="mt-5 text-center">
          <Button primary content={"Criar conta"} />
          <p className="text-primary-dark font-medium text-sm my-2 text-center">
            já possui uma conta?
          </p>
          <Button content={"Criar conta"} />
        </div>
      </form>
      <footer className="mt-[160px] text-center">
        <h1 className="text-primary-dark text-sm">feito por Leonardo Costa.</h1>
      </footer>
    </Center>
  );
};

export default Signup;
