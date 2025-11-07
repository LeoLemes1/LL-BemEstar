import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUtensils, FaRobot } from 'react-icons/fa';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { calculateCaloriesWithAI } from '../services/geminiService';
import { addMealEntry } from '../services/firestoreService';

export default function MealLogModal({ isOpen, onClose, onMealAdded }) {
  const { user } = useAuth();
  const toast = useToast();
  const [mealDescription, setMealDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!mealDescription.trim()) {
      toast.error('Descreva o que você comeu!');
      return;
    }

    setLoading(true);
    try {
      // Usa IA Gemini para calcular calorias
      const aiResult = await calculateCaloriesWithAI(mealDescription);
      
      const mealData = {
        description: mealDescription,
        calories: aiResult.calories,
        aiAnalysis: aiResult.analysis,
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        timestamp: new Date().toISOString(),
        mealType: getMealType() // café, almoço, jantar, lanche
      };

      // Salva no Firestore
      if (user && user.id) {
        await addMealEntry(user.id, mealData);
      }

      toast.success(`Refeição registrada! ${aiResult.calories} calorias 🎉`);
      setMealDescription('');
      onClose();
      
      // Notifica o Dashboard para atualizar
      if (onMealAdded) {
        onMealAdded(mealData);
      }
    } catch (error) {
      console.error('Error logging meal:', error);
      
      // Mensagens mais humanizadas baseadas no tipo de erro
      let friendlyMessage = 'Ops! Não consegui entender direito. Pode descrever de novo? 😊';
      
      if (error.message && error.message.includes('API key')) {
        friendlyMessage = 'Eita! Parece que a IA não tá configurada ainda 🤖';
      } else if (error.message && error.message.includes('formato')) {
        friendlyMessage = 'Hmm, tive dificuldade aqui. Pode ser mais específico? Tipo: "2 pães com queijo" 😅';
      } else if (error.message && error.message.includes('network')) {
        friendlyMessage = 'Opa! Parece que a internet deu uma travada. Tenta de novo? 📶';
      }
      
      toast.error(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  // Determina tipo de refeição baseado na hora
  const getMealType = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return 'breakfast';
    if (hour >= 11 && hour < 15) return 'lunch';
    if (hour >= 15 && hour < 18) return 'snack';
    if (hour >= 18 && hour < 23) return 'dinner';
    return 'snack';
  };

  const getMealTypeLabel = (type) => {
    const labels = {
      breakfast: 'Café da Manhã',
      lunch: 'Almoço',
      dinner: 'Jantar',
      snack: 'Lanche'
    };
    return labels[type] || 'Refeição';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Levemente escuro com blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setMealDescription('');
              onClose();
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              zIndex: 40
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              pointerEvents: 'none'
            }}
          >
            <div 
              className="rounded-2xl shadow-2xl max-w-lg w-full p-6" 
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                pointerEvents: 'auto',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <FaUtensils className="mr-3 text-green-600" />
                  Registrar Refeição
                </h2>
                <button
                  onClick={() => {
                    setMealDescription('');
                    onClose();
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              {/* Meal Type Badge */}
              <div className="mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {getMealTypeLabel(getMealType())}
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    O que você comeu?
                  </label>
                  <textarea
                    value={mealDescription}
                    onChange={(e) => setMealDescription(e.target.value)}
                    placeholder="Exemplo: 2 fatias de pão integral com queijo branco, 1 xícara de café com leite e 1 banana"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    rows="4"
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 mt-2 flex items-center">
                    <FaRobot className="mr-1 text-purple-500" />
                    Nossa IA vai calcular as calorias aproximadas pra você!
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMealDescription('');
                      onClose();
                    }}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:bg-green-400 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Calculando...
                      </>
                    ) : (
                      'Registrar'
                    )}
                  </button>
                </div>
              </form>

              {/* AI Info */}
              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                <p className="text-xs text-purple-700">
                  💡 <strong>Dica:</strong> Seja específico nas quantidades para cálculos mais precisos!
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

