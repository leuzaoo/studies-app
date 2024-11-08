const TitlePage = ({ text, className }) => {
  return (
    <h1 className={`${className} text-lg font-semibold md:text-2xl`}>{text}</h1>
  );
};

export default TitlePage;
