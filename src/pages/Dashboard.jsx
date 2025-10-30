import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaChartLine, 
  FaUtensils, 
  FaDumbbell, 
  FaBrain, 
  FaUser, 
  FaCog,
  FaHeart,
  FaWeight,
  FaFire,
  FaSignOutAlt,
  FaQuestionCircle
} from 'react-icons/fa';
import { mockUser, mockNutritionPlan, mockProgress } from '../mock/userMock';
import { useAuth } from '../context/AuthContext';
import { WeightProgressChart } from '../components/BeautifulCharts';
import { useToast } from '../context/ToastContext';
// Charts removed to avoid hook conflicts

export default function Dashboard() {
  const { logout } = useAuth();
  const toast = useToast();
  const [user] = useState(mockUser);
  const [nutritionPlan] = useState(mockNutritionPlan);
  const [progress] = useState(mockProgress);

  const handleLogout = () => {
    logout();
    toast.success('Logout realizado com sucesso!');
    window.location.href = '/loginRegistro';
  };

  // Chart data (fictício)
  const weightChartData = progress.weightHistory.map((point) => ({
    label: point.date.slice(5),
    value: point.weight
  }));

  const quickActions = [
    {
      id: 1,
      title: 'Chat IA',
      icon: FaBrain,
      color: 'bg-purple-500',
      link: '/ai-chat'
    },
    {
      id: 2,
      title: 'Meu Plano',
      icon: FaUtensils,
      color: 'bg-green-500',
      link: '/my-plan'
    },
    {
      id: 3,
      title: 'Treino',
      icon: FaDumbbell,
      color: 'bg-blue-500',
      link: '/workout'
    },
    {
      id: 4,
      title: 'Alimentos & Calorias',
      icon: FaChartLine,
      color: 'bg-orange-500',
      link: '/food-calories'
    },
    {
      id: 5,
      title: 'Calculadora',
      icon: FaWeight,
      color: 'bg-indigo-500',
      link: '/calculadora'
    },
    {
      id: 6,
      title: 'Configurações',
      icon: FaCog,
      color: 'bg-gray-600',
      link: '/settings'
    },
    {
      id: 7,
      title: 'Ajuda',
      icon: FaQuestionCircle,
      color: 'bg-yellow-500',
      link: '/help'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">
                Bem-vindo, {user.name}! 👋
              </h1>
              <p className="text-gray-600">
                Aqui está um resumo do seu progresso hoje
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
              >
                <FaSignOutAlt size={16} />
                Sair
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Peso Atual</p>
                <p className="text-2xl font-bold text-green-600">{user.weight}kg</p>
              </div>
              <FaWeight className="text-3xl text-green-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Calorias Hoje</p>
                <p className="text-2xl font-bold text-orange-600">1,850</p>
                <p className="text-xs text-gray-500">de 2,000</p>
              </div>
              <FaFire className="text-3xl text-orange-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Proteína</p>
                <p className="text-2xl font-bold text-blue-600">120g</p>
                <p className="text-xs text-gray-500">de 150g</p>
              </div>
              <FaUtensils className="text-3xl text-blue-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Acompanhamento de Progresso</p>
                <p className="text-2xl font-bold text-purple-600">-5kg</p>
                <p className="text-xs text-gray-500">este mês</p>
              </div>
              <FaChartLine className="text-3xl text-purple-500" />
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Chart */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Evolução do Peso
              </h3>
              <WeightProgressChart data={weightChartData} />
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Ações Rápidas
              </h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <motion.a
                    key={action.id}
                    href={action.link}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center p-3 rounded-lg ${action.color} text-white hover:opacity-90 transition-all`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <action.icon className="text-xl mr-3" />
                    <span className="font-medium">{action.title}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Today's Meals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6 mt-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Refeições de Hoje
              </h3>
              <div className="space-y-3">
                {nutritionPlan.meals.slice(0, 3).map((meal) => (
                  <div key={meal.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{meal.name}</p>
                      <p className="text-sm text-gray-600">{meal.time}</p>
                    </div>
                    <span className="text-green-600 font-bold">{meal.calories} kcal</span>
                  </div>
                ))}
                <a href="/my-plan" className="text-green-600 text-sm font-medium hover:underline">
                  Ver todas as refeições →
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-lg p-6 mt-8"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Atividade Recente
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <FaUtensils className="text-green-500 text-xl mr-3" />
              <div>
                <p className="font-medium">Café da Manhã</p>
                <p className="text-sm text-gray-600">400 kcal - 08:00</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <FaDumbbell className="text-blue-500 text-xl mr-3" />
              <div>
                <p className="font-medium">Treino Matinal</p>
                <p className="text-sm text-gray-600">30 min - 07:00</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-purple-50 rounded-lg">
              <FaBrain className="text-purple-500 text-xl mr-3" />
              <div>
                <p className="font-medium">Consulta IA</p>
                <p className="text-sm text-gray-600">Plano gerado - 09:30</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
