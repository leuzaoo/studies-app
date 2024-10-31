import { motion } from "framer-motion";

const Button = ({ onClick, primary, content, type, className }) => {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${
        primary
          ? "bg-primary-orange text-white font-medium"
          : "text-primary-orange text-sm border-primary-orange border"
      } w-full rounded-xl h-9 ${className}`}
      onClick={onClick}
    >
      {content}
    </motion.button>
  );
};

export default Button;
