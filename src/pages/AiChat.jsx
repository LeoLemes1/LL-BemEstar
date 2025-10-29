import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaUser, FaSyncAlt, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { generateNutritionPlan } from '../services/geminiService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';

export default function AiChat() {
  const { user } = useAuth();
  const toast = useToast();
  const [formData, setFormData] = useState({
    weight: user?.weight || '',
    height: user?.height || '',
    age: user?.age || '',
    activityLevel: user?.activityLevel || 'light',
    foodPreferences: '',
    goals: user?.goals || 'maintenance'
  });
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentário' },
    { value: 'light', label: 'Leve' },
    { value: 'moderate', label: 'Moderado' },
    { value: 'active', label: 'Ativo' },
    { value: 'very_active', label: 'Muito Ativo' }
  ];

  const goals = [
    { value: 'weight_loss', label: 'Perda de Peso' },
    { value: 'weight_gain', label: 'Ganho de Peso' },
    { value: 'maintenance', label: 'Manutenção' },
    { value: 'muscle_gain', label: 'Ganho de Massa' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.weight || !formData.height || !formData.age) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);
    toast.info('Gerando seu plano nutricional personalizado...');

    try {
      const response = await generateNutritionPlan(formData, 'pt');
      setAiResponse(response);
      
      // Add to chat history
      const newChat = {
        id: Date.now(),
        user: formData,
        ai: response,
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, newChat]);
      
      toast.success('Plano nutricional gerado com sucesso!');
    } catch (error) {
      console.error('Error generating plan:', error);
      toast.error('Erro ao gerar o plano. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([]);
    setAiResponse('');
    toast.info('Histórico limpo');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-purple-800 mb-2 flex items-center">
                <FaBrain className="mr-3" />
                Chat de Nutrição IA
              </h1>
              <p className="text-gray-600">
                Receba um plano nutricional personalizado com IA
              </p>
            </div>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Voltar ao Dashboard
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Digite seus dados
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Peso *
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ex: 70"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Altura *
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ex: 175"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idade *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ex: 30"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nível de Atividade
                </label>
                <select
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {activityLevels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Objetivo
                </label>
                <select
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {goals.map(goal => (
                    <option key={goal.value} value={goal.value}>
                      {goal.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferências Alimentares
                </label>
                <textarea
                  name="foodPreferences"
                  value={formData.foodPreferences}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ex: Vegetariano, sem glúten, alergia a frutos do mar..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <FaSyncAlt className="animate-spin mr-2" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <FaArrowRight className="mr-2" />
                    Gerar Plano
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* AI Response */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Resposta da IA
              </h2>
              {chatHistory.length > 0 && (
                <button
                  onClick={clearChat}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Limpar Histórico
                </button>
              )}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <FaSyncAlt className="animate-spin text-4xl text-purple-500 mb-4" />
                  <p className="text-gray-600">Analisando seus dados...</p>
                </div>
              </div>
            ) : aiResponse ? (
              <div className="prose max-w-none">
                <div className="bg-purple-50 rounded-lg p-4 mb-4">
                  <div className="flex items-start">
                    <FaBrain className="text-purple-500 text-xl mr-3 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-bold text-purple-800 mb-2">Plano Nutricional Personalizado</h3>
                      <div className="whitespace-pre-wrap text-gray-700">
                        {aiResponse}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <FaBrain className="text-4xl text-gray-300 mb-4" />
                <p className="text-gray-500">
                  Preencha os dados ao lado para gerar seu plano nutricional personalizado
                </p>
              </div>
            )}

            {/* Chat History */}
            {chatHistory.length > 0 && (
              <div className="mt-6">
                <h3 className="font-bold text-gray-800 mb-4">Histórico de Consultas</h3>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {chatHistory.map((chat) => (
                    <div key={chat.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <FaUser className="text-gray-500 text-sm mr-2" />
                        <span className="text-sm text-gray-600">
                          {new Date(chat.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700">
                        <strong>Dados:</strong> {chat.user.weight}kg, {chat.user.height}cm, {chat.user.age} anos
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
