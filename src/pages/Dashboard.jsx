import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  FaQuestionCircle,
  FaPlus
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import MealLogModal from '../components/MealLogModal';
import { getMealsByDate, getProgressHistory } from '../services/firestoreService';
import { 
  calculateCalorieGoal, 
  getCalorieMotivationalMessage,
  formatCalories 
} from '../services/calorieService';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [showMealModal, setShowMealModal] = useState(false);
  const [todayMeals, setTodayMeals] = useState([]);
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [weightProgress, setWeightProgress] = useState(null);

  // Redirect to onboarding if user hasn't completed it
  useEffect(() => {
    if (user && !user.onboardingCompleted && (!user.weight || !user.height || !user.age)) {
      navigate('/setup');
    }
  }, [user, navigate]);

  // Load today's meals and calculate calories
  useEffect(() => {
    const loadTodayMeals = async () => {
      if (user && user.id) {
        try {
          const today = new Date().toISOString().split('T')[0];
          const result = await getMealsByDate(user.id, today);
          
          if (result.success) {
            setTodayMeals(result.data);
            const total = result.data.reduce((sum, meal) => sum + (meal.calories || 0), 0);
            setCaloriesConsumed(total);
          }
        } catch (error) {
          console.error('Error loading today meals:', error);
        }
      }
    };

    loadTodayMeals();
  }, [user]);

  // Calculate calorie goal
  useEffect(() => {
    if (user) {
      const goal = calculateCalorieGoal(user);
      setCalorieGoal(goal);
    }
  }, [user]);

  // Load weight progress - recarrega sempre que user muda
  useEffect(() => {
    const loadWeightProgress = async () => {
      if (user && user.id) {
        try {
          const result = await getProgressHistory(user.id, 50);
          if (result.success && result.data.length > 0) {
            // Ordena por data CRESCENTE (mais antigo → mais recente)
            const weightHistory = result.data
              .filter(entry => entry.weight)
              .sort((a, b) => new Date(a.date) - new Date(b.date));
            
            if (weightHistory.length >= 2) {
              const firstWeight = weightHistory[0].weight;
              const lastWeight = weightHistory[weightHistory.length - 1].weight;
              const change = lastWeight - firstWeight;
              
              setWeightProgress({
                change: change,
                firstWeight: firstWeight,
                lastWeight: lastWeight,
                trend: change < 0 ? 'down' : change > 0 ? 'up' : 'stable'
              });
            } else if (weightHistory.length === 1 && user.initialWeight) {
              // Se tem apenas 1 registro, compara com peso inicial
              const change = weightHistory[0].weight - user.initialWeight;
              setWeightProgress({
                change: change,
                firstWeight: user.initialWeight,
                lastWeight: weightHistory[0].weight,
                trend: change < 0 ? 'down' : change > 0 ? 'up' : 'stable'
              });
            }
          }
        } catch (error) {
          console.error('Error loading weight progress:', error);
        }
      }
    };

    loadWeightProgress();
  }, [user]);

  const handleMealAdded = (newMeal) => {
    setTodayMeals(prev => [...prev, newMeal]);
    setCaloriesConsumed(prev => prev + newMeal.calories);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logout realizado com sucesso!');
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Erro ao fazer logout');
    }
  };

  const quickActions = [
    {
      id: 1,
      title: 'Chat IA',
      icon: FaBrain,
      color: 'bg-purple-500',
      link: '/ai-chat'
    },
    // {
    //   id: 2,
    //   title: 'Meu Plano',
    //   icon: FaUtensils,
    //   color: 'bg-green-500',
    //   link: '/my-plan'
    // },
    {
      id: 3,
      title: 'Treino',
      icon: FaDumbbell,
      color: 'bg-blue-500',
      link: '/workout'
    },
    {
      id: 4,
      title: 'Progresso de Peso',
      icon: FaChartLine,
      color: 'bg-pink-500',
      link: '/progress'
    },
    {
      id: 5,
      title: 'Alimentos & Calorias',
      icon: FaFire,
      color: 'bg-orange-500',
      link: '/food-calories'
    },
    {
      id: 6,
      title: 'Calculadora',
      icon: FaWeight,
      color: 'bg-indigo-500',
      link: '/calculadora'
    },
    {
      id: 7,
      title: 'Configurações',
      icon: FaCog,
      color: 'bg-gray-600',
      link: '/settings'
    },
    {
      id: 8,
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

        {/* Quick Action: Register Meal - Minimalista */}
        <div className="mb-6">
          <button
            onClick={() => setShowMealModal(true)}
            className="border-2 border-green-600 text-green-600 hover:bg-green-50 py-2 px-5 rounded-full transition-all flex items-center gap-2 font-medium"
          >
            <FaPlus size={14} /> Registrar Refeição
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Peso Atual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Peso Atual</p>
                <p className="text-2xl font-bold text-green-600">{user?.weight || 0}kg</p>
              </div>
              <FaWeight className="text-3xl text-green-500" />
            </div>
          </motion.div>

          {/* Calorias Hoje */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Calorias Hoje</p>
                <p className="text-2xl font-bold text-orange-600">{formatCalories(caloriesConsumed)}</p>
                <p className="text-xs text-gray-500">de {formatCalories(calorieGoal)}</p>
              </div>
              <FaFire className="text-3xl text-orange-500" />
            </div>
          </motion.div>

          {/* Refeições Hoje */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Refeições Hoje</p>
                <p className="text-2xl font-bold text-blue-600">{todayMeals.length}</p>
                <p className="text-xs text-gray-500">registradas</p>
              </div>
              <FaUtensils className="text-3xl text-blue-500" />
            </div>
          </motion.div>

          {/* Progresso de Peso */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => navigate('/progress')}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Progresso de Peso</p>
                {weightProgress ? (
                  <>
                    <p className={`text-2xl font-bold ${
                      weightProgress.trend === 'down' ? 'text-green-600' : 
                      weightProgress.trend === 'up' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {weightProgress.change > 0 ? '+' : ''}
                      {weightProgress.change.toFixed(1)}kg
                    </p>
                    <p className="text-xs text-gray-500">
                      {weightProgress.trend === 'down' ? '📉 Perdendo' : 
                       weightProgress.trend === 'up' ? '📈 Ganhando' : '➡️ Estável'}
                    </p>
                  </>
                ) : user?.initialWeight && user?.weight ? (
                  <>
                    <p className="text-2xl font-bold text-purple-600">
                      {(user.weight - user.initialWeight) > 0 ? '+' : ''}
                      {(user.weight - user.initialWeight).toFixed(1)}kg
                    </p>
                    <p className="text-xs text-gray-500">desde o início</p>
                  </>
                ) : (
                  <>
                    <p className="text-2xl font-bold text-gray-400">--</p>
                    <p className="text-xs text-gray-500">Registre seu peso</p>
                  </>
                )}
              </div>
              <FaChartLine className="text-3xl text-purple-500" />
            </div>
          </motion.div>
        </div>

        {/* Dica de Medição de Peso */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 p-5 rounded-xl bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 border-2 border-pink-200"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="bg-pink-500 text-white p-3 rounded-full">
                <FaWeight className="text-xl" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-800 mb-2">
                💡 Dica: Acompanhe seu Progresso de Peso
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Para resultados mais precisos e motivadores, <strong>pese-se 1 vez por semana</strong>, sempre no mesmo dia e horário (preferencialmente pela manhã, em jejum). 
                Isso evita variações naturais do dia a dia e mostra sua evolução real! 📊
              </p>
              <div className="flex gap-2 text-xs text-gray-600">
                <span className="bg-white px-3 py-1 rounded-full">✅ Mesmo horário</span>
                <span className="bg-white px-3 py-1 rounded-full">✅ Mesma balança</span>
                <span className="bg-white px-3 py-1 rounded-full">✅ 1x por semana</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Calorie Motivational Message */}
        {caloriesConsumed > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-4 rounded-xl ${getCalorieMotivationalMessage(caloriesConsumed, calorieGoal).bgColor}`}
          >
            <p className={`text-center font-medium ${getCalorieMotivationalMessage(caloriesConsumed, calorieGoal).color}`}>
              {getCalorieMotivationalMessage(caloriesConsumed, calorieGoal).message}
            </p>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calorie Chart */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Consumo de Calorias Hoje
              </h3>
              
              {/* Calorie Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Consumido</span>
                  <span className="text-sm font-medium text-gray-600">
                    {formatCalories(caloriesConsumed)} / {formatCalories(calorieGoal)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className={`h-4 rounded-full transition-all duration-500 ${
                      (caloriesConsumed / calorieGoal) > 1 
                        ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                        : (caloriesConsumed / calorieGoal) > 0.9
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                        : 'bg-gradient-to-r from-green-500 to-emerald-500'
                    }`}
                    style={{ width: `${Math.min((caloriesConsumed / calorieGoal) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">
                    {((caloriesConsumed / calorieGoal) * 100).toFixed(0)}% da meta
                  </span>
                  <span className="text-xs text-gray-500">
                    Restam {Math.max(calorieGoal - caloriesConsumed, 0)} kcal
                  </span>
                </div>
              </div>

              {/* Warning Messages - Humanizadas */}
              {caloriesConsumed > 0 && (
                <div className="mb-4">
                  {(caloriesConsumed / calorieGoal) >= 0.85 && (caloriesConsumed / calorieGoal) < 1 && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
                      <p className="text-yellow-800 text-sm">
                        ⚠️ Opa! Tá chegando pertinho do limite, hein! Mas se bater tá tudo bem! 😉
                      </p>
                    </div>
                  )}
                  
                  {(caloriesConsumed / calorieGoal) >= 1 && (caloriesConsumed / calorieGoal) < 1.15 && (
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-3 rounded">
                      <p className="text-orange-800 text-sm">
                        🎉 Passou um pouquinho da meta, mas relaxa! Um dia fora não estraga nada. Amanhã a gente compensa! 💪
                      </p>
                    </div>
                  )}
                  
                  {(caloriesConsumed / calorieGoal) >= 1.15 && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                      <p className="text-red-800 text-sm">
                        😊 Hoje foi um dia especial, né? Tudo bem! O importante é voltar ao foco amanhã. Você consegue! 🌟
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Lista de refeições do dia */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Refeições Registradas:</h4>
                {todayMeals.length > 0 ? (
                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                    {todayMeals.map((meal, index) => (
                      <div key={index} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 text-sm">{meal.description}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(meal.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        <span className="text-green-600 font-bold text-sm ml-3">{meal.calories} kcal</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8 text-sm">
                    Nenhuma refeição registrada ainda hoje. Comece registrando sua primeira! 🍽️
                  </p>
                )}
              </div>
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
          </div>
        </div>


        {/* Meal Log Modal */}
        <MealLogModal
          isOpen={showMealModal}
          onClose={() => setShowMealModal(false)}
          onMealAdded={handleMealAdded}
        />
      </div>
    </div>
  );
}
