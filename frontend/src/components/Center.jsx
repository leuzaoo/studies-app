const Center = ({ children, className }) => {
  return (
    <div className={`${className} max-w-screen-lg mx-auto p-5`}>{children}</div>
  );
};

export default Center;
