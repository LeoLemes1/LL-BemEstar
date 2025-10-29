import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = "", 
  hover = false, 
  padding = "p-6",
  ...props 
}) => {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02 } : {}}
      className={`bg-white rounded-xl shadow-lg ${padding} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
