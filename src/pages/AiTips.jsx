import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaBrain, 
  FaLightbulb, 
  FaHeart, 
  FaDumbbell, 
  FaUtensils, 
  FaSyncAlt,
  FaQuoteLeft,
  FaStar,
  FaBookmark,
  FaShare
} from 'react-icons/fa';
import { generateMotivationalTip } from '../services/geminiService';
import { aiResponses } from '../mock/aiMock';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function AiTips() {
  const { user } = useAuth();
  const [currentTip, setCurrentTip] = useState('');
  const [loading, setLoading] = useState(false);
  const [savedTips, setSavedTips] = useState([]);
  const [tipHistory, setTipHistory] = useState([]);

  const tipCategories = [
    {
      id: 'motivation',
      name: 'Motivação',
      icon: FaHeart,
      color: 'bg-red-500',
      description: 'Dicas para manter a motivação'
    },
    {
      id: 'nutrition',
      name: 'Nutrição',
      icon: FaUtensils,
      color: 'bg-green-500',
      description: 'Conselhos sobre alimentação'
    },
    {
      id: 'exercise',
      name: 'Exercícios',
      icon: FaDumbbell,
      color: 'bg-blue-500',
      description: 'Dicas de treino e movimento'
    },
    {
      id: 'wellness',
      name: 'Bem-estar',
      icon: FaStar,
      color: 'bg-purple-500',
      description: 'Cuidados gerais com a saúde'
    }
  ];

  const generateNewTip = async (category = 'motivation') => {
    setLoading(true);
    toast.info('Gerando nova dica...');

    try {
      const tip = await generateMotivationalTip('pt');
      setCurrentTip(tip);
      
      // Add to history
      const newTip = {
        id: Date.now(),
        content: tip,
        category,
        timestamp: new Date(),
        source: 'ai'
      };
      setTipHistory(prev => [newTip, ...prev.slice(0, 9)]); // Keep last 10
      
      toast.success('Nova dica gerada!');
    } catch (error) {
      console.error('Error generating tip:', error);
      // Fallback to mock data
      const mockTips = aiResponses.motivationalTips;
      const randomTip = mockTips[Math.floor(Math.random() * mockTips.length)];
      setCurrentTip(randomTip.pt);
      
      const newTip = {
        id: Date.now(),
        content: randomTip.pt,
        category,
        timestamp: new Date(),
        source: 'mock'
      };
      setTipHistory(prev => [newTip, ...prev.slice(0, 9)]);
      
      toast.success('Dica carregada!');
    } finally {
      setLoading(false);
    }
  };

  const saveTip = (tip) => {
    if (savedTips.find(saved => saved.id === tip.id)) {
      toast.info('Dica já está salva');
      return;
    }
    
    setSavedTips(prev => [tip, ...prev]);
    toast.success('Dica salva!');
  };

  const removeSavedTip = (tipId) => {
    setSavedTips(prev => prev.filter(tip => tip.id !== tipId));
    toast.info('Dica removida');
  };

  const shareTip = (tip) => {
    if (navigator.share) {
      navigator.share({
        title: 'Dica de Bem-estar',
        text: tip.content,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(tip.content);
      toast.success('Dica copiada para a área de transferência!');
    }
  };

  useEffect(() => {
    // Load initial tip
    generateNewTip();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-2 flex items-center">
            <FaBrain className="mr-3" />
            Dicas Motivacionais
          </h1>
          <p className="text-gray-600">
            Receba dicas personalizadas de IA para sua jornada de bem-estar
          </p>
        </div>

        {/* Category Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {tipCategories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => generateNewTip(category.id)}
              className={`${category.color} text-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all`}
            >
              <category.icon className="text-2xl mb-2" />
              <h3 className="font-bold mb-1">{category.name}</h3>
              <p className="text-sm opacity-90">{category.description}</p>
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Tip */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <FaLightbulb className="mr-2 text-yellow-500" />
                  Dica do Dia
                </h2>
                <button
                  onClick={() => generateNewTip()}
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                >
                  <FaSyncAlt className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Nova Dica
                </button>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <FaBrain className="animate-pulse text-4xl text-purple-500 mb-4" />
                    <p className="text-gray-600">Gerando sua dica personalizada...</p>
                  </div>
                </div>
              ) : currentTip ? (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <FaQuoteLeft className="text-purple-500 text-2xl mr-4 mt-1" />
                    <div className="flex-1">
                      <p className="text-lg text-gray-800 leading-relaxed mb-4">
                        {currentTip}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FaBrain className="text-purple-500" />
                          <span className="text-sm text-gray-600">Gerado por IA</span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => saveTip({
                              id: Date.now(),
                              content: currentTip,
                              timestamp: new Date()
                            })}
                            className="text-purple-600 hover:text-purple-700 p-2 rounded-lg hover:bg-purple-100 transition-colors"
                            title="Salvar dica"
                          >
                            <FaBookmark />
                          </button>
                          <button
                            onClick={() => shareTip({ content: currentTip })}
                            className="text-purple-600 hover:text-purple-700 p-2 rounded-lg hover:bg-purple-100 transition-colors"
                            title="Compartilhar"
                          >
                            <FaShare />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FaLightbulb className="text-4xl text-gray-300 mb-4" />
                  <p className="text-gray-500">
                    Clique em "Nova Dica" para receber uma dica personalizada
                  </p>
                </div>
              )}
            </motion.div>

            {/* Tip History */}
            {tipHistory.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6 mt-6"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Histórico de Dicas
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {tipHistory.map((tip) => (
                    <div key={tip.id} className="border border-gray-200 rounded-lg p-3">
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                        {tip.content}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{new Date(tip.timestamp).toLocaleString()}</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => saveTip(tip)}
                            className="text-purple-600 hover:text-purple-700"
                          >
                            <FaBookmark />
                          </button>
                          <button
                            onClick={() => shareTip(tip)}
                            className="text-purple-600 hover:text-purple-700"
                          >
                            <FaShare />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Saved Tips */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaBookmark className="mr-2 text-purple-500" />
                Dicas Salvas
              </h3>
              
              {savedTips.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {savedTips.map((tip) => (
                    <motion.div
                      key={tip.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="border border-purple-200 rounded-lg p-3 bg-purple-50"
                    >
                      <p className="text-sm text-gray-700 mb-2 line-clamp-3">
                        {tip.content}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{new Date(tip.timestamp).toLocaleDateString()}</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => shareTip(tip)}
                            className="text-purple-600 hover:text-purple-700"
                            title="Compartilhar"
                          >
                            <FaShare />
                          </button>
                          <button
                            onClick={() => removeSavedTip(tip.id)}
                            className="text-red-600 hover:text-red-700"
                            title="Remover"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaBookmark className="text-3xl text-gray-300 mb-3" />
                  <p className="text-gray-500 text-sm">
                    Nenhuma dica salva ainda
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Salve suas dicas favoritas clicando no ícone de bookmark
                  </p>
                </div>
              )}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 mt-6"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Ações Rápidas
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => generateNewTip('motivation')}
                  className="w-full bg-red-100 hover:bg-red-200 text-red-700 p-3 rounded-lg transition-colors flex items-center"
                >
                  <FaHeart className="mr-2" />
                  Dica Motivacional
                </button>
                <button
                  onClick={() => generateNewTip('nutrition')}
                  className="w-full bg-green-100 hover:bg-green-200 text-green-700 p-3 rounded-lg transition-colors flex items-center"
                >
                  <FaUtensils className="mr-2" />
                  Dica Nutricional
                </button>
                <button
                  onClick={() => generateNewTip('exercise')}
                  className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 p-3 rounded-lg transition-colors flex items-center"
                >
                  <FaDumbbell className="mr-2" />
                  Dica de Exercício
                </button>
                <button
                  onClick={() => generateNewTip('wellness')}
                  className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 p-3 rounded-lg transition-colors flex items-center"
                >
                  <FaStar className="mr-2" />
                  Dica de Bem-estar
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
