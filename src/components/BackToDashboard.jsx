import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export default function BackToDashboard() {
  return (
    <div className="mb-6">
      <Link
        to="/dashboard"
        className="flex items-center gap-2 text-green-600 hover:text-green-800 font-semibold transition-colors"
      >
        <FaArrowLeft />
        Voltar ao Dashboard
      </Link>
    </div>
  );
}


