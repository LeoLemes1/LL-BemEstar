import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaChartLine, 
  FaWeight, 
  FaFire, 
  FaCalendar, 
  FaTrophy,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaArrowLeft
} from 'react-icons/fa';
import { mockProgress } from '../mock/userMock';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';
export default function Progress() {
  const toast = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('3months');
  const [progress] = useState(mockProgress);

  const periods = [
    { value: '1month', label: '1 Mês' },
    { value: '3months', label: '3 Meses' },
    { value: '6months', label: '6 Meses' },
    { value: '1year', label: '1 Ano' }
  ];

  const getFilteredData = (data, period) => {
    const now = new Date();
    let startDate;
    
    switch (period) {
      case '1month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case '3months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        break;
      case '6months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
        break;
      case '1year':
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      default:
        return data;
    }
    
    return data.filter(item => new Date(item.date) >= startDate);
  };

  const filteredWeightData = getFilteredData(progress.weightHistory, selectedPeriod);
  const filteredCalorieData = getFilteredData(progress.calorieHistory, selectedPeriod);

  const weightChartData = {
    labels: filteredWeightData.map(item => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Peso (kg)',
        data: filteredWeightData.map(item => item.weight),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const calorieChartData = {
    labels: filteredCalorieData.map(item => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Calorias',
        data: filteredCalorieData.map(item => item.calories),
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };

  const calculateProgress = () => {
    if (filteredWeightData.length < 2) return null;
    
    const startWeight = filteredWeightData[0].weight;
    const endWeight = filteredWeightData[filteredWeightData.length - 1].weight;
    const weightChange = endWeight - startWeight;
    
    const startCalories = filteredCalorieData[0]?.calories || 0;
    const endCalories = filteredCalorieData[filteredCalorieData.length - 1]?.calories || 0;
    const calorieChange = endCalories - startCalories;
    
    return {
      weightChange,
      calorieChange,
      weightChangePercent: ((weightChange / startWeight) * 100).toFixed(1),
      calorieChangePercent: startCalories > 0 ? ((calorieChange / startCalories) * 100).toFixed(1) : 0
    };
  };

  const progressData = calculateProgress();

  const getTrendIcon = (value) => {
    if (value > 0) return <FaArrowUp className="text-red-500" />;
    if (value < 0) return <FaArrowDown className="text-green-500" />;
    return <FaMinus className="text-gray-500" />;
  };

  const getTrendColor = (value) => {
    if (value > 0) return 'text-red-600';
    if (value < 0) return 'text-green-600';
    return 'text-gray-600';
  };

  const achievements = [
    {
      id: 1,
      title: 'Primeira Semana',
      description: 'Completou 7 dias de acompanhamento',
      icon: FaTrophy,
      color: 'bg-yellow-100 text-yellow-800',
      achieved: true
    },
    {
      id: 2,
      title: 'Meta de Peso',
      description: 'Atingiu 5kg de perda de peso',
      icon: FaWeight,
      color: 'bg-green-100 text-green-800',
      achieved: progressData?.weightChange <= -5
    },
    {
      id: 3,
      title: 'Consistência',
      description: '30 dias consecutivos de registro',
      icon: FaCalendar,
      color: 'bg-blue-100 text-blue-800',
      achieved: filteredWeightData.length >= 30
    },
    {
      id: 4,
      title: 'Controle Calórico',
      description: 'Manteve déficit calórico por 2 semanas',
      icon: FaFire,
      color: 'bg-orange-100 text-orange-800',
      achieved: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-emerald-800 mb-2 flex items-center">
                <FaChartLine className="mr-3" />
                Progresso
              </h1>
              <p className="text-gray-600">
                Acompanhe sua evolução e conquistas
              </p>
            </div>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-emerald-600 hover:text-emerald-800 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Voltar ao Dashboard
            </Link>
          </div>
        </div>

        {/* Period Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Período de Análise</h3>
            <div className="flex space-x-2">
              {periods.map(period => (
                <button
                  key={period.value}
                  onClick={() => setSelectedPeriod(period.value)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedPeriod === period.value
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Progress Summary */}
        {progressData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Variação de Peso</p>
                  <p className={`text-2xl font-bold ${getTrendColor(progressData.weightChange)}`}>
                    {progressData.weightChange > 0 ? '+' : ''}{progressData.weightChange.toFixed(1)}kg
                  </p>
                  <p className="text-xs text-gray-500">
                    {progressData.weightChangePercent}%
                  </p>
                </div>
                {getTrendIcon(progressData.weightChange)}
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
                  <p className="text-sm text-gray-600">Variação Calórica</p>
                  <p className={`text-2xl font-bold ${getTrendColor(progressData.calorieChange)}`}>
                    {progressData.calorieChange > 0 ? '+' : ''}{progressData.calorieChange.toFixed(0)} kcal
                  </p>
                  <p className="text-xs text-gray-500">
                    {progressData.calorieChangePercent}%
                  </p>
                </div>
                {getTrendIcon(progressData.calorieChange)}
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
                  <p className="text-sm text-gray-600">Peso Atual</p>
                  <p className="text-2xl font-bold text-emerald-600">
                    {filteredWeightData[filteredWeightData.length - 1]?.weight}kg
                  </p>
                  <p className="text-xs text-gray-500">último registro</p>
                </div>
                <FaWeight className="text-3xl text-emerald-500" />
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
                  <p className="text-sm text-gray-600">Calorias Atuais</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {filteredCalorieData[filteredCalorieData.length - 1]?.calories || 0}
                  </p>
                  <p className="text-xs text-gray-500">kcal/dia</p>
                </div>
                <FaFire className="text-3xl text-orange-500" />
              </div>
            </motion.div>
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weight Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaWeight className="mr-2 text-emerald-500" />
              Evolução do Peso
            </h3>
            <div className="h-64">
              <Line data={weightChartData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Calorie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaFire className="mr-2 text-orange-500" />
              Evolução de Calorias
            </h3>
            <div className="h-64">
              <Line data={calorieChartData} options={chartOptions} />
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <FaTrophy className="mr-2 text-yellow-500" />
            Conquistas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.achieved
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center mb-2">
                  <achievement.icon className={`text-xl mr-2 ${
                    achievement.achieved ? 'text-green-600' : 'text-gray-400'
                  }`} />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    achievement.achieved ? achievement.color : 'bg-gray-100 text-gray-600'
                  }`}>
                    {achievement.achieved ? 'Conquistado' : 'Em Progresso'}
                  </span>
                </div>
                <h4 className="font-bold text-gray-800 mb-1">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Report */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 mt-8"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Relatório Semanal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600 mb-1">
                {filteredWeightData.length}
              </div>
              <div className="text-sm text-gray-600">Dias Registrados</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {progressData ? Math.abs(progressData.weightChange).toFixed(1) : 0}kg
              </div>
              <div className="text-sm text-gray-600">Mudança Total</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {filteredWeightData.length > 0 ? 
                  (filteredWeightData.reduce((sum, item) => sum + item.weight, 0) / filteredWeightData.length).toFixed(1) : 0}kg
              </div>
              <div className="text-sm text-gray-600">Peso Médio</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
