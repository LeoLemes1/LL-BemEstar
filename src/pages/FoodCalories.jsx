import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaUtensils, 
  FaFire, 
  FaDrumstickBite, 
  FaBreadSlice, 
  FaOilCan,
  FaLeaf,
  FaCheese,
  FaApple,
  FaArrowLeft,
  FaDumbbell
} from 'react-icons/fa';
import { foodDatabase } from '../mock/foodMock';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';

export default function FoodCalories() {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const categories = [
    { value: 'all', label: 'Todos', icon: FaUtensils },
    { value: 'grains', label: 'Grãos', icon: FaBreadSlice },
    { value: 'protein', label: 'Proteínas', icon: FaDumbbell },
    { value: 'fruits', label: 'Frutas', icon: FaApple },
    { value: 'vegetables', label: 'Vegetais', icon: FaLeaf },
    { value: 'dairy', label: 'Laticínios', icon: FaCheese },
    { value: 'nuts', label: 'Oleaginosas', icon: FaOilCan },
    { value: 'fats', label: 'Gorduras', icon: FaOilCan }
  ];

  const filteredFoods = useMemo(() => {
    let filtered = foodDatabase;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(food => 
        food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(food => food.category === selectedCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'calories':
          return b.caloriesPer100g - a.caloriesPer100g;
        case 'protein':
          return b.protein - a.protein;
        case 'carbs':
          return b.carbs - a.carbs;
        case 'fat':
          return b.fat - a.fat;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      toast.info('Digite um termo para buscar');
      return;
    }
    
    if (filteredFoods.length === 0) {
      toast.error('Nenhum resultado encontrado');
    } else {
      toast.success(`${filteredFoods.length} alimento(s) encontrado(s)`);
    }
  };

  const getCategoryIcon = (category) => {
    const categoryData = categories.find(cat => cat.value === category);
    return categoryData ? categoryData.icon : FaUtensils;
  };

  const getMacroIcon = (macro) => {
    switch (macro) {
      case 'protein': return FaDrumstickBite;
      case 'carbs': return FaBreadSlice;
      case 'fat': return FaOilCan;
      default: return FaUtensils;
    }
  };

  const getMacroColor = (macro) => {
    switch (macro) {
      case 'protein': return 'text-blue-600';
      case 'carbs': return 'text-green-600';
      case 'fat': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-orange-800 mb-2 flex items-center">
                <FaUtensils className="mr-3" />
                Base de Alimentos
              </h1>
              <p className="text-gray-600">
                Consulte valores nutricionais de diversos alimentos
              </p>
            </div>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-orange-600 hover:text-orange-800 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Voltar ao Dashboard
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar alimento..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Buscar
              </button>
            </div>
          </form>

          {/* Category Filters */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Categorias</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.value
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="mr-2" />
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Ordenar por</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="name">Nome</option>
              <option value="calories">Calorias</option>
              <option value="protein">Proteínas</option>
              <option value="carbs">Carboidratos</option>
              <option value="fat">Gorduras</option>
            </select>
          </div>
        </motion.div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredFoods.length} alimento(s) encontrado(s)
          </p>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map((food, index) => (
            <motion.div
              key={food.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {(() => {
                    const CategoryIcon = getCategoryIcon(food.category);
                    return <CategoryIcon className="text-2xl text-orange-500 mr-3" />;
                  })()}
                  <div>
                    <h3 className="font-bold text-gray-800">{food.name}</h3>
                    <p className="text-sm text-gray-500">{food.nameEn}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-600">
                    {food.caloriesPer100g}
                  </div>
                  <div className="text-sm text-gray-500">kcal/100g</div>
                </div>
              </div>

              {/* Macronutrients */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaDrumstickBite className="text-blue-500 mr-2" />
                    <span className="text-sm text-gray-600">Proteínas</span>
                  </div>
                  <span className="font-bold text-blue-600">{food.protein}g</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaBreadSlice className="text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">Carboidratos</span>
                  </div>
                  <span className="font-bold text-green-600">{food.carbs}g</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaOilCan className="text-orange-500 mr-2" />
                    <span className="text-sm text-gray-600">Gorduras</span>
                  </div>
                  <span className="font-bold text-orange-600">{food.fat}g</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaLeaf className="text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">Fibras</span>
                  </div>
                  <span className="font-bold text-green-600">{food.fiber}g</span>
                </div>
              </div>

              {/* Category Badge */}
              <div className="mt-4">
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  {categories.find(cat => cat.value === food.category)?.label || food.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredFoods.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FaUtensils className="text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              Nenhum resultado encontrado
            </h3>
            <p className="text-gray-500 mb-4">
              Tente buscar por outro termo ou selecione uma categoria diferente
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                toast.info('Filtros limpos');
              }}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Limpar Filtros
            </button>
          </motion.div>
        )}

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 mt-8"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Estatísticas da Base de Dados
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {foodDatabase.length}
              </div>
              <div className="text-sm text-gray-600">Alimentos</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {categories.length - 1}
              </div>
              <div className="text-sm text-gray-600">Categorias</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(foodDatabase.reduce((sum, food) => sum + food.caloriesPer100g, 0) / foodDatabase.length)}
              </div>
              <div className="text-sm text-gray-600">Calorias Médias</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {foodDatabase.filter(food => food.protein > 10).length}
              </div>
              <div className="text-sm text-gray-600">Alto Proteína</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
