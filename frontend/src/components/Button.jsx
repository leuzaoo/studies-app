const Button = ({ onClick, primary, content }) => {
  return (
    <button
      className={`${
        primary
          ? "bg-primary-orange text-white font-medium"
          : "text-primary-orange text-sm border-primary-orange border"
      } w-full rounded-xl h-9`}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
