const Center = ({ children, className }) => {
  return (
    <div className={`${className} max-w-screen-lg mx-auto p-5 xl:p-0 xl:my-5`}>{children}</div>
  );
};

export default Center;
