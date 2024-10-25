export const Center = ({ children, className }) => {
  return (
    <div className={`${className} max-w-screen-xl mx-auto p-5`}>{children}</div>
  );
};
