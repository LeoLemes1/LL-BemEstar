import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Menu, X, User, LogOut } from "lucide-react";
import logo from "../assets/logo.png";

export default function Cabecalho({ abrirMenu }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const isAuthenticated = !!user;
  const isPublicPage = ['/', '/loginRegistro', '/about', '/help'].includes(location.pathname);

  return (
    <header className="absolute top-0 w-full px-6 py-4 flex justify-between items-center z-20">
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
        <h1 className="text-2xl md:text-3xl text-white font-bold font-poeta">
          LL - Bem Estar
        </h1>
      </Link>

      <div className="hidden md:flex items-center gap-6 text-sm">
        {/* Navigation for authenticated users */}
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-white font-semibold hover:underline font-poeta">
              Dashboard
            </Link>
            <Link to="/ai-chat" className="text-white font-semibold hover:underline font-poeta">
              IA Chat
            </Link>
            <Link to="/my-plan" className="text-white font-semibold hover:underline font-poeta">
              Meu Plano
            </Link>
            <Link to="/workout" className="text-white font-semibold hover:underline font-poeta">
              Treino
            </Link>
            <Link to="/calculadora" className="text-white font-semibold hover:underline font-poeta">
              Calculadora
            </Link>
            <Link to="/about" className="text-white font-semibold hover:underline font-poeta">
              Sobre
            </Link>
            <Link to="/help" className="text-white font-semibold hover:underline font-poeta">
              Ajuda
            </Link>
            <Link to="/settings" className="text-white font-semibold hover:underline font-poeta">
              Configurações
            </Link>
            
            {/* Simple Logout Button - ALWAYS VISIBLE */}
            <button
              onClick={() => {
                logout();
                window.location.href = '/loginRegistro';
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
            >
              <LogOut size={16} />
              SAIR
            </button>
          </div>
        ) : (
          /* Public navigation */
          <div className="flex items-center gap-4">
            <Link to="/about" className="text-white font-semibold hover:underline font-poeta">
              Sobre
            </Link>
            <Link to="/help" className="text-white font-semibold hover:underline font-poeta">
              Ajuda
            </Link>
            <Link to="/loginRegistro" className="text-white font-semibold hover:underline font-poeta">
              Entrar | Registrar
            </Link>
          </div>
        )}
      </div>

      <button onClick={abrirMenu} className="md:hidden text-white">
        <Menu size={28} />
      </button>
    </header>
  );
}
    