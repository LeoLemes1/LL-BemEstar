import { Routes, Route } from "react-router-dom";
import InicioPagina from "./pages/InicioPagina";
import LoginRegistro from "./pages/LoginRegistro";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<InicioPagina />} />
      <Route path="/loginRegistro" element={<LoginRegistro />} />
    </Routes>
  );
}
