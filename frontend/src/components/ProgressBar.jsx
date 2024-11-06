import { useCallback, useEffect, useState } from "react";

const ProgressBar = ({ target }) => {
  const [readingProgress, setReadingProgress] = useState(0);

  const scrollListener = useCallback(() => {
    if (!target.current) {
      return;
    }

    const element = target.current;
    const totalHeight =
      element.clientHeight - element.offsetTop - window.innerHeight;

    const windowScrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    if (windowScrollTop === 0) {
      return setReadingProgress(0);
    }

    if (windowScrollTop > totalHeight) {
      return setReadingProgress(100);
    }

    setReadingProgress((windowScrollTop / totalHeight) * 100);
  }, [target]);

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [scrollListener]);

  return (
    <div className="w-full fixed top-0 left-0 right-0">
      <div
        style={{ width: `${readingProgress}%` }}
        className="h-2 bg-primary-orange transition-all duration-500 ease-in-out"
      />
    </div>
  );
};

export default ProgressBar;
