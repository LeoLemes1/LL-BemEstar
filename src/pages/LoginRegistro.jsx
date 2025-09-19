import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaSignInAlt } from "react-icons/fa";

export default function LoginRegistro() {
  const [signIn, setSignIn] = useState(true);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://preview.redd.it/et6ow3dkxll31.jpg?width=1080&crop=smart&auto=webp&s=0e57b890aed2944e0dca2b12ad69c696526698d6')",
      }}
    >
      <div className="relative w-full max-w-5xl h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-white bg-opacity-90 backdrop-blur-lg flex">
        {/* LOGIN */}
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
          <div className="mb-3 w-full flex items-center bg-white border rounded-full px-4 py-3 shadow-sm">
            <FaEnvelope className="text-green-500 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none bg-transparent"
            />
          </div>
          <div className="mb-6 w-full flex items-center bg-white border rounded-full px-4 py-3 shadow-sm">
            <FaLock className="text-green-500 mr-2" />
            <input
              type="password"
              placeholder="Senha"
              className="w-full outline-none bg-transparent"
            />
          </div>
          <button className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 w-full transition-all duration-300">
            Entrar
          </button>
        </div>

        {/* REGISTRO */}
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
          <div className="mb-3 w-full flex items-center bg-white border rounded-full px-4 py-3 shadow-sm">
            <FaUser className="text-green-500 mr-2" />
            <input
              type="text"
              placeholder="Nome"
              className="w-full outline-none bg-transparent"
            />
          </div>
          <div className="mb-3 w-full flex items-center bg-white border rounded-full px-4 py-3 shadow-sm">
            <FaEnvelope className="text-green-500 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none bg-transparent"
            />
          </div>
          <div className="mb-6 w-full flex items-center bg-white border rounded-full px-4 py-3 shadow-sm">
            <FaLock className="text-green-500 mr-2" />
            <input
              type="password"
              placeholder="Senha"
              className="w-full outline-none bg-transparent"
            />
          </div>
          <button className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 w-full transition-all duration-300">
            Registrar
          </button>
        </div>

        {/* OVERLAY DESLIZANTE */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full bg-green-700 text-white flex flex-col justify-center items-center text-center px-10 transition-transform duration-700 ease-in-out ${
            signIn ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <img
            src="https://img.freepik.com/vetores-premium/padrao-perfeito-com-frutas-frescas-de-laranja-e-banana-papel-de-parede-saudavel-de-nutricao-vitaminica-em-um-fundo-verde-ilustracao-em-vetor-de-cor-de-contorno_141172-12320.jpg"
            alt="Folhas"
            className="w-32 h-32 object-cover rounded-full shadow-lg mb-6 transition-transform duration-700 ease-in-out"
          />
          {signIn ? (
            <>
              <h2 className="text-3xl font-bold mb-4">Novo por aqui?</h2>
              <p className="mb-6">Crie sua conta e comece sua jornada com saúde</p>
              <button
                onClick={() => setSignIn(false)}
                className="border border-white px-8 py-3 rounded-full hover:bg-white hover:text-green-600 transition-all"
              >
                Registrar
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">Bem-vindo de volta</h2>
              <p className="mb-6">Use suas credenciais para acessar sua conta</p>
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
  );
}
