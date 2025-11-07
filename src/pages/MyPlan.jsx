import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUtensils, 
  FaChartPie, 
  FaSave, 
  FaEdit, 
  FaTrash,
  FaClock,
  FaFire,
  FaDrumstickBite,
  FaBreadSlice,
  FaOilCan,
  FaArrowLeft
} from 'react-icons/fa';
import { mockNutritionPlan } from '../mock/userMock';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';
import BackToDashboard from '../components/BackToDashboard';

export default function MyPlan() {
  const toast = useToast();
  const [nutritionPlan, setNutritionPlan] = useState(mockNutritionPlan);
  const [editingMeal, setEditingMeal] = useState(null);

  // Chart data removed to avoid hook conflicts

  const handleSavePlan = () => {
    toast.success('Plano salvo com sucesso!');
  };

  const handleEditMeal = (mealId) => {
    setEditingMeal(mealId);
    toast.info('Editando refeição...');
  };

  const handleDeleteMeal = (mealId) => {
    setNutritionPlan(prev => ({
      ...prev,
      meals: prev.meals.filter(meal => meal.id !== mealId)
    }));
    toast.success('Refeição removida');
  };

  const totalCalories = nutritionPlan.meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-green-800 mb-2 flex items-center">
                <FaUtensils className="mr-3" />
                Meu Plano Nutricional
              </h1>
              <p className="text-gray-600">
                Seu plano nutricional personalizado
              </p>
            </div>
            <BackToDashboard />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Calorias Diárias</p>
                <p className="text-2xl font-bold text-green-600">{nutritionPlan.dailyCalories}</p>
              </div>
              <FaFire className="text-3xl text-green-500" />
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
                <p className="text-sm text-gray-600">Calorias Consumidas</p>
                <p className="text-2xl font-bold text-blue-600">{totalCalories}</p>
                <p className="text-xs text-gray-500">
                  {((totalCalories / nutritionPlan.dailyCalories) * 100).toFixed(1)}% do objetivo
                </p>
              </div>
              <FaChartPie className="text-3xl text-blue-500" />
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
                <p className="text-sm text-gray-600">Refeições</p>
                <p className="text-2xl font-bold text-purple-600">{nutritionPlan.meals.length}</p>
                <p className="text-xs text-gray-500">ao longo do dia</p>
              </div>
              <FaUtensils className="text-3xl text-purple-500" />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Macronutrients Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaChartPie className="mr-2" />
              Macronutrientes
            </h3>
            
            {/* Macros com barras de progresso */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <FaDrumstickBite className="text-blue-500 mr-2" />
                    <span className="text-sm font-medium">Proteínas</span>
                  </div>
                  <span className="font-bold text-blue-600">{nutritionPlan.macros.protein}g</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-500 h-3 rounded-full transition-all"
                    style={{ width: `${(nutritionPlan.macros.protein / (nutritionPlan.macros.protein + nutritionPlan.macros.carbs + nutritionPlan.macros.fat)) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <FaBreadSlice className="text-green-500 mr-2" />
                    <span className="text-sm font-medium">Carboidratos</span>
                  </div>
                  <span className="font-bold text-green-600">{nutritionPlan.macros.carbs}g</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full transition-all"
                    style={{ width: `${(nutritionPlan.macros.carbs / (nutritionPlan.macros.protein + nutritionPlan.macros.carbs + nutritionPlan.macros.fat)) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <FaOilCan className="text-orange-500 mr-2" />
                    <span className="text-sm font-medium">Gorduras</span>
                  </div>
                  <span className="font-bold text-orange-600">{nutritionPlan.macros.fat}g</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-orange-500 h-3 rounded-full transition-all"
                    style={{ width: `${(nutritionPlan.macros.fat / (nutritionPlan.macros.protein + nutritionPlan.macros.carbs + nutritionPlan.macros.fat)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Meals List */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <FaUtensils className="mr-2" />
                  Refeições
                </h3>
                <button
                  onClick={handleSavePlan}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                >
                  <FaSave className="mr-2" />
                  Salvar
                </button>
              </div>

              <div className="space-y-4">
                {nutritionPlan.meals.map((meal, index) => (
                  <motion.div
                    key={meal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <FaClock className="text-gray-400 mr-2" />
                        <h4 className="font-bold text-gray-800">{meal.name}</h4>
                        <span className="ml-2 text-sm text-gray-500">({meal.time})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-bold">
                          {meal.calories} kcal
                        </span>
                        <button
                          onClick={() => handleEditMeal(meal.id)}
                          className="text-blue-500 hover:text-blue-700 p-1"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteMeal(meal.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {meal.foods.map((food, foodIndex) => (
                        <div key={foodIndex} className="flex items-center justify-between bg-gray-50 rounded p-2">
                          <div className="flex items-center">
                            {food.name.includes('Proteína') || food.name.includes('Frango') || food.name.includes('Salmão') ? (
                              <FaDrumstickBite className="text-blue-500 mr-2" />
                            ) : food.name.includes('Carboidrato') || food.name.includes('Arroz') || food.name.includes('Aveia') ? (
                              <FaBreadSlice className="text-green-500 mr-2" />
                            ) : (
                              <FaOilCan className="text-orange-500 mr-2" />
                            )}
                            <span className="text-sm font-medium">{food.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-600">{food.amount}</span>
                            <span className="text-xs text-gray-500 ml-2">{food.calories} kcal</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 mt-8"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Resumo do Progresso
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {((totalCalories / nutritionPlan.dailyCalories) * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600">Calorias</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {nutritionPlan.macros.protein}g
              </div>
              <div className="text-sm text-gray-600">Proteínas</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {nutritionPlan.macros.carbs}g
              </div>
              <div className="text-sm text-gray-600">Carboidratos</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {nutritionPlan.macros.fat}g
              </div>
              <div className="text-sm text-gray-600">Gorduras</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
