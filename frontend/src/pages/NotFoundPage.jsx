import React from "react";
import Center from "../components/Center";
import Navbar from "../components/navbar/Navbar";

const NotFoundPage = () => {
  return (
    <>
      <Navbar />
      <Center>
        <div className="flex items-center justify-center max-h-screen">
          <div className="text-center max-w-[400px]">
            <h1 className="text-6xl font-bold text-primary-orange">404</h1>
            <p className="mt-4 text-2xl font-semibold text-gray-700">
              Página não encontrada
            </p>
            <p className="mt-2 text-lg font-light">
              A página que você está tentando acessar{" "}
              <span className="font-medium underline">não existe</span> ou você{" "}
              <span className="font-medium underline">não tem permissão</span>{" "}
              para acessar.
            </p>
          </div>
        </div>
      </Center>
    </>
  );
};

export default NotFoundPage;
