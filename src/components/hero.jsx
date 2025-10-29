import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { X } from "lucide-react"

export default function MenuMobile({ aberto, fecharMenu }) {
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
            className="fixed top-0 left-0 w-full h-[30%] bg-white shadow-xl z-30 flex flex-col items-center justify-center gap-6 rounded-b-2xl"
          >
            <select className="rounded-md px-2 py-1 bg-gray-100 text-green-900">
              <option>PT</option>
              <option>EN</option>
            </select>
            <Link to="/LoginRegistro" className="text-green-800 text-lg font-semibold">
              Entrar
            </Link>
            <Link to="/LoginRegistro" className="text-green-800 text-lg font-semibold">
              Registrar
            </Link>
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
