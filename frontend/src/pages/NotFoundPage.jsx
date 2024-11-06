import React from "react";

const NotFoundPage = () => {
  console.log('NotFoundPage Rendered');
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-xl text-gray-700">Página não encontrada</p>
        <p className="mt-2 text-lg text-gray-500">
          A página que você está procurando não existe ou foi movida.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
