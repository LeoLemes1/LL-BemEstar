import { motion } from 'framer-motion';
import Cabecalho from './Cabecalho';

const Layout = ({ children, className = "" }) => {
  return (
    <div className={`min-h-screen ${className}`}>
      <Cabecalho />
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
};

export default Layout;
