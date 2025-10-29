import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserPlus,
  FaSignInAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LoginRegistro() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [signIn, setSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        toast.success('Login realizado com sucesso!');
        navigate('/dashboard');
      } else {
        toast.error('Credenciais inválidas');
      }
    } catch (error) {
      toast.error('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const result = await register(formData.name, formData.email, formData.password);
      if (result.success) {
        toast.success('Conta criada com sucesso!');
        navigate('/dashboard');
      } else {
        toast.error('Erro ao criar conta');
      }
    } catch (error) {
      toast.error('Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://preview.redd.it/et6ow3dkxll31.jpg?width=1080&crop=smart&auto=webp&s=0e57b890aed2944e0dca2b12ad69c696526698d6')",
      }}
    >
      <Link
        to="/"
        className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-green-200 transition-all z-50"
      >
        <FaArrowLeft /> Voltar
      </Link>

      <div className="relative w-full max-w-5xl h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-white bg-opacity-90 backdrop-blur-lg flex">
        <div
          className={`absolute w-1/2 h-full flex flex-col justify-center items-center px-10 transition-all duration-700 ease-in-out ${
            signIn
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10 pointer-events-none"
          }`}
        >
          <h2 className="text-3xl font-bold text-green-700 mb-6 flex items-center gap-2">
            <FaSignInAlt /> Entrar
          </h2>
          <form onSubmit={handleLogin} className="w-full">
            <div className="mb-3 w-full flex items-center bg-white border rounded-full px-4 py-3 shadow-sm">
              <FaEnvelope className="text-green-500 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full outline-none bg-transparent"
                required
              />
            </div>
            <div className="mb-6 w-full flex items-center bg-white border rounded-full px-4 py-3 shadow-sm">
              <FaLock className="text-green-500 mr-2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Senha"
                className="w-full outline-none bg-transparent"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 w-full transition-all duration-300 disabled:bg-green-400"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        <div
          className={`absolute left-1/2 w-1/2 h-full flex flex-col justify-center items-center px-10 transition-all duration-700 ease-in-out ${
            !signIn
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-10 pointer-events-none"
          }`}
        >
          <h2 className="text-3xl font-bold text-green-700 mb-6 flex items-center gap-2">
            <FaUserPlus /> Criar Conta
          </h2>
          <form onSubmit={handleRegister} className="w-full">
            <div className="mb-3 w-full flex items-center bg-white border rounded-full px-4 py-3 shadow-sm">
              <FaUser className="text-green-500 mr-2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nome"
                className="w-full outline-none bg-transparent"
                required
              />
            </div>
            <div className="mb-3 w-full flex items-center bg-white border rounded-full px-4 py-3 shadow-sm">
              <FaEnvelope className="text-green-500 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full outline-none bg-transparent"
                required
              />
            </div>
            <div className="mb-6 w-full flex items-center bg-white border rounded-full px-4 py-3 shadow-sm">
              <FaLock className="text-green-500 mr-2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Senha"
                className="w-full outline-none bg-transparent"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 w-full transition-all duration-300 disabled:bg-green-400"
            >
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
          </form>
        </div>

        <div
          className={`absolute top-0 left-0 w-1/2 h-full bg-green-700 text-white flex flex-col items-start justify-start px-10 pt-6 text-center transition-transform duration-700 ease-in-out ${
            signIn ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="flex flex-col justify-center items-center flex-grow w-full text-center">
            <img
              src="https://img.freepik.com/vetores-premium/padrao-perfeito-com-frutas-frescas-de-laranja-e-banana-papel-de-parede-saudavel-de-nutricao-vitaminica-em-um-fundo-verde-ilustracao-em-vetor-de-cor-de-contorno_141172-12320.jpg"
              alt="Leaves"
              className="w-32 h-32 object-cover rounded-full shadow-lg mb-6 transition-transform duration-700 ease-in-out"
            />

            {signIn ? (
              <>
                <h2 className="text-3xl font-bold mb-4">Novo por aqui?</h2>
                <p className="mb-6">
                  Crie sua conta e comece sua jornada de bem-estar
                </p>
                <button
                  onClick={() => setSignIn(false)}
                  className="border border-white px-8 py-3 rounded-full hover:bg-white hover:text-green-600 transition-all"
                >
                  Registrar
                </button>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-4">Bem-vindo de volta!</h2>
                <p className="mb-6">
                  Use suas credenciais para acessar sua conta
                </p>
                <button
                  onClick={() => setSignIn(true)}
                  className="border border-white px-8 py-3 rounded-full hover:bg-white hover:text-green-600 transition-all"
                >
                  Entrar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
