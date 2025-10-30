import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackToDashboard from '../components/BackToDashboard';
import { motion } from 'framer-motion';
import { FaCalculator, FaWeight, FaRuler, FaBirthdayCake, FaHeart, FaArrowLeft } from 'react-icons/fa';
import { useToast } from '../context/ToastContext';
import { calculateBMI, getBMICategory, calculateBMR, calculateTDEE } from '../utils';

export default function Calculadora() {
  const toast = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    activityLevel: 'moderate'
  });
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    
    if (!formData.weight || !formData.height || !formData.age) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    const age = parseInt(formData.age);

    if (weight <= 0 || height <= 0 || age <= 0) {
      toast.error('Por favor, insira valores válidos');
      return;
    }

    const bmi = calculateBMI(weight, height);
    const bmiCategory = getBMICategory(bmi);
    const bmr = calculateBMR(weight, height, age, formData.gender);
    const tdee = calculateTDEE(bmr, formData.activityLevel);

    setResults({
      bmi: bmi,
      bmiCategory: bmiCategory,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee)
    });

    toast.success('Cálculos realizados com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <BackToDashboard />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <FaCalculator className="text-blue-600" />
              Calculadora de Saúde
            </h1>
            <p className="text-gray-600 text-lg">
              Calcule seu IMC, metabolismo basal e necessidades calóricas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Formulário */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Seus Dados
              </h2>
              
              <form onSubmit={handleCalculate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaWeight className="inline mr-2" />
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: 70"
                    step="0.1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaRuler className="inline mr-2" />
                    Altura (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: 175"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaBirthdayCake className="inline mr-2" />
                    Idade (anos)
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: 30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaHeart className="inline mr-2" />
                    Gênero
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="male">Masculino</option>
                    <option value="female">Feminino</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nível de Atividade
                  </label>
                  <select
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="sedentary">Sedentário</option>
                    <option value="light">Leve</option>
                    <option value="moderate">Moderado</option>
                    <option value="active">Ativo</option>
                    <option value="very_active">Muito Ativo</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Calcular
                </button>
              </form>
            </motion.div>

            {/* Resultados */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Resultados
              </h2>
              
              {results ? (
                <div className="space-y-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">IMC</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {results.bmi}
                    </div>
                    <div className={`text-sm font-medium ${results.bmiCategory.color}`}>
                      {results.bmiCategory.category}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <h3 className="text-sm font-semibold text-green-800 mb-1">Metabolismo Basal</h3>
                      <div className="text-xl font-bold text-green-600">
                        {results.bmr} kcal
                      </div>
                    </div>

                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <h3 className="text-sm font-semibold text-purple-800 mb-1">Calorias Diárias</h3>
                      <div className="text-xl font-bold text-purple-600">
                        {results.tdee} kcal
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>IMC:</strong> Índice de Massa Corporal</p>
                    <p><strong>Metabolismo Basal:</strong> Calorias que seu corpo queima em repouso</p>
                    <p><strong>Calorias Diárias:</strong> Total de calorias necessárias por dia</p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <FaCalculator className="text-4xl mx-auto mb-4 text-gray-300" />
                  <p>Preencha os dados ao lado para ver os resultados</p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
