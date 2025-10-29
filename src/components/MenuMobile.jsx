import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { X, LogOut } from "lucide-react"
import { useAuth } from "../context/AuthContext"

export default function MenuMobile({ aberto, fecharMenu }) {
  const { user, logout } = useAuth();
  return (
    <AnimatePresence>
      {aberto && (
        <>
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.y < -50) fecharMenu()
            }}
            className="fixed top-0 left-0 w-full h-[60%] bg-white shadow-xl z-30 flex flex-col items-center justify-start pt-12 gap-4 rounded-b-2xl overflow-y-auto"
          >
            <select className="rounded-md px-2 py-1 bg-gray-100 text-green-900">
              <option>PT</option>
              <option>EN</option>
            </select>
            
            {user ? (
              <>
                <Link to="/dashboard" className="text-green-800 text-lg font-semibold" onClick={fecharMenu}>
                  Dashboard
                </Link>
                <Link to="/ai-chat" className="text-green-800 text-lg font-semibold" onClick={fecharMenu}>
                  IA Chat
                </Link>
                <Link to="/my-plan" className="text-green-800 text-lg font-semibold" onClick={fecharMenu}>
                  Meu Plano
                </Link>
                <Link to="/workout" className="text-green-800 text-lg font-semibold" onClick={fecharMenu}>
                  Treino
                </Link>
                <Link to="/calculadora" className="text-green-800 text-lg font-semibold" onClick={fecharMenu}>
                  Calculadora
                </Link>
                <Link to="/about" className="text-green-800 text-lg font-semibold" onClick={fecharMenu}>
                  Sobre
                </Link>
                <Link to="/help" className="text-green-800 text-lg font-semibold" onClick={fecharMenu}>
                  Ajuda
                </Link>
                <Link to="/settings" className="text-green-800 text-lg font-semibold" onClick={fecharMenu}>
                  Configurações
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    fecharMenu();
                    window.location.href = '/loginRegistro';
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
                >
                  <LogOut size={16} />
                  SAIR
                </button>
              </>
            ) : (
              <>
                <Link to="/about" className="text-green-800 text-lg font-semibold" onClick={fecharMenu}>
                  Sobre
                </Link>
                <Link to="/help" className="text-green-800 text-lg font-semibold" onClick={fecharMenu}>
                  Ajuda
                </Link>
                <Link to="/calculadora" className="text-green-800 text-lg font-semibold" onClick={fecharMenu}>
                  Calculadora
                </Link>
                <Link to="/LoginRegistro" className="text-green-800 text-lg font-semibold" onClick={fecharMenu}>
                  Entrar
                </Link>
                <Link to="/LoginRegistro" className="text-green-800 text-lg font-semibold" onClick={fecharMenu}>
                  Registrar
                </Link>
              </>
            )}
            <button onClick={fecharMenu} className="absolute top-4 right-4">
              <X size={28} className="text-green-800" />
            </button>
          </motion.div>

          <motion.div
            onClick={fecharMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-20"
          />
        </>
      )}
    </AnimatePresence>
  )
}
