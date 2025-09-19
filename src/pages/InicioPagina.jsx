import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const imagens = {
  hero: "https://picsum.photos/1600/900?random=1",
  proteina: "https://picsum.photos/500/400?random=2",
  gordura: "https://picsum.photos/500/400?random=3",
  carbo: "https://picsum.photos/500/400?random=4",
};

export default function InicioPagina() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-100 via-white to-green-50">
      <header className="absolute top-0 w-full px-6 py-4 flex justify-between items-center z-20">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
          <h1 className="text-2xl md:text-3xl text-white font-bold  font-poeta">
            LL - Bem Estar
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <select className="rounded-md px-2 py-1 bg-white/80 text-green-900  font-poeta">
            <option>PT</option>
            <option>EN</option>
          </select>
          <Link
            to="/LoginRegistro"
            className="text-white font-semibold hover:underline  font-poeta"
          >
            Entrar
          </Link>
          <Link
            to="/registro"
            className="text-white font-semibold hover:underline  font-poeta"
          >
            Registrar
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-white"
        >
          <Menu size={28} />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
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
                if (info.offset.y < -50) setMenuOpen(false);
              }}
              className="fixed top-0 left-0 w-full h-[30%] bg-white shadow-xl z-30 flex flex-col items-center justify-center gap-6 rounded-b-2xl"
            >
              <select className="rounded-md px-2 py-1 bg-gray-100 text-green-900">
                <option>PT</option>
                <option>EN</option>
              </select>
              <Link
                to="/login"
                className="text-green-800 text-lg font-semibold"
              >
                Entrar
              </Link>
              <Link
                to="/registro"
                className="text-green-800 text-lg font-semibold"
              >
                Registrar
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-4 right-4"
              >
                <X size={28} className="text-green-800" />
              </button>
            </motion.div>

            <motion.div
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-20"
            />
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col">
        <div className="relative w-full h-[450px] md:h-[550px]">
          <img
            src={imagens.hero}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg max-w-3xl font-poeta">
              Descubra sua nutrição ideal
            </h2>

            <p className="text-white/90 mt-4 max-w-2xl text-lg drop-shadow">
              Calcule calorias e macronutrientes para emagrecer de forma
              saudável e sustentável.
            </p>
            <Link
              to="/calculadora"
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg shadow-lg"
            >
              Acesse a calculadora
            </Link>
          </div>
        </div>

        <section className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto w-full px-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-2xl overflow-hidden"
          >
            <img
              src={imagens.proteina}
              alt="Proteína"
              className="w-full h-40 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-green-700 mb-2">
                Proteína
              </h3>
              <p className="text-gray-800 text-sm">
                1.6–2.2g/kg de peso corporal.
                <br />
                Essencial para manutenção muscular e saciedade (OMS).
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-2xl overflow-hidden"
          >
            <img
              src={imagens.gordura}
              alt="Gordura"
              className="w-full h-40 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-green-700 mb-2">Gordura</h3>
              <p className="text-gray-800 text-sm">
                20%–30% das calorias.
                <br />
                Fonte de energia, hormônios e vitaminas lipossolúveis.
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-2xl overflow-hidden"
          >
            <img
              src={imagens.carbo}
              alt="Carboidratos"
              className="w-full h-40 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-green-700 mb-2">
                Carboidratos
              </h3>
              <p className="text-gray-800 text-sm">
                Principal combustível.
                <br />
                Recomendado 45%–55% das calorias totais (Harvard Health).
              </p>
            </div>
          </motion.div>
        </section>

        <section className="max-w-6xl mx-auto px-6 mt-20 text-center">
          <h3 className="text-3xl font-bold text-green-800">Como funciona?</h3>
          <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
            Nossa calculadora usa recomendações baseadas em evidências
            científicas (OMS, NIH, Harvard) para estimar seu gasto energético e
            proporções ideais de macronutrientes.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <div className="bg-white rounded-2xl shadow p-6">
              <h4 className="text-xl font-semibold text-green-700">
                Base científica
              </h4>
              <p className="text-gray-700 text-sm mt-2">
                Métodos de Harris-Benedict e Mifflin-St Jeor para gasto calórico
                basal.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow p-6">
              <h4 className="text-xl font-semibold text-green-700">
                Resultados reais
              </h4>
              <p className="text-gray-700 text-sm mt-2">
                Estudos mostram que planejar macronutrientes aumenta adesão em
                30% (PubMed).
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow p-6">
              <h4 className="text-xl font-semibold text-green-700">
                Sustentabilidade
              </h4>
              <p className="text-gray-700 text-sm mt-2">
                Foco em perda de gordura gradual (0,5kg/semana) sem riscos de
                saúde.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 mt-20 text-center">
          <h3 className="text-3xl font-bold text-green-800">
            Por que cuidar da nutrição?
          </h3>
          <ul className="mt-6 grid md:grid-cols-2 gap-6 text-left text-gray-700">
            <li>🍎 Reduz risco de doenças cardiovasculares em até 30%.</li>
            <li>💪 Preserva massa magra durante emagrecimento.</li>
            <li>
              🧠 Melhora memória e foco (Harvard School of Public Health).
            </li>
            <li>⚡ Aumenta energia e disposição diária.</li>
          </ul>
        </section>

        <section className="max-w-6xl mx-auto px-6 mt-20 mb-16 text-center">
          <h3 className="text-3xl font-bold text-green-800">Próximos passos</h3>
          <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
            Crie sua conta grátis e comece hoje mesmo. Personalize suas metas,
            receba relatórios semanais e acompanhe sua evolução.
          </p>
          <Link
            to="/registro"
            className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg shadow-lg"
          >
            Criar conta gratuita
          </Link>
        </section>
      </main>

      <footer className="bg-white/90 text-center text-sm text-gray-600 py-6 mt-16">
        <p>© 2025 LL - Bem Estar. Todos os direitos reservados.</p>
        <p>Feito com ♥ para transformar vidas com saúde e propósito.</p>
      </footer>
    </div>
  );
}
