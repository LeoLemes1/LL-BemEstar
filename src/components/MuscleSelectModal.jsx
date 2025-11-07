import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaDumbbell, FaHeartbeat, FaRunning, FaFire } from 'react-icons/fa';
import { 
  GiChestArmor, 
  GiBackPain, 
  GiLeg, 
  GiBodyHeight,
  GiShoulderArmor,
  GiMuscleUp,
  GiAbdominalArmor
} from 'react-icons/gi';

export default function MuscleSelectModal({ isOpen, onClose, onSelect }) {
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [weeklyFrequency, setWeeklyFrequency] = useState(3); // Padrão: 3x por semana

  const muscleGroups = [
    { value: 'peito', label: 'Peito', icon: GiChestArmor, color: 'from-blue-400 to-blue-600' },
    { value: 'costas', label: 'Costas', icon: GiBackPain, color: 'from-green-400 to-green-600' },
    { value: 'pernas', label: 'Pernas', icon: GiLeg, color: 'from-orange-400 to-orange-600' },
    { value: 'gluteos', label: 'Glúteos', icon: GiBodyHeight, color: 'from-pink-400 to-pink-600' },
    { value: 'ombros', label: 'Ombros', icon: GiShoulderArmor, color: 'from-purple-400 to-purple-600' },
    { value: 'braços', label: 'Braços', icon: GiMuscleUp, color: 'from-red-400 to-red-600' },
    { value: 'abdomen', label: 'Abdômen', icon: GiAbdominalArmor, color: 'from-yellow-400 to-yellow-600' },
    { value: 'corpo_todo', label: 'Corpo Todo', icon: FaHeartbeat, color: 'from-indigo-400 to-indigo-600' }
  ];

  const toggleMuscle = (muscle) => {
    if (selectedMuscles.includes(muscle)) {
      setSelectedMuscles(selectedMuscles.filter(m => m !== muscle));
    } else {
      setSelectedMuscles([...selectedMuscles, muscle]);
    }
  };

  const handleSelect = () => {
    if (selectedMuscles.length > 0) {
      onSelect(selectedMuscles, weeklyFrequency);
      setSelectedMuscles([]);
      setWeeklyFrequency(3); // Reset
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={onClose}
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
              className="rounded-2xl shadow-2xl max-w-2xl w-full p-6" 
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
                  <FaDumbbell className="mr-3 text-blue-600" />
                  Escolha o Foco do Treino
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-4 text-center">
                💡 Selecione um ou mais músculos para focar
              </p>

              {/* Muscle Groups */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {muscleGroups.map((muscle) => {
                  const IconComponent = muscle.icon;
                  return (
                    <button
                      key={muscle.value}
                      onClick={() => toggleMuscle(muscle.value)}
                      className={`p-4 rounded-xl transition-all border-2 ${
                        selectedMuscles.includes(muscle.value)
                          ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <IconComponent 
                        className={`text-3xl mb-1 mx-auto ${
                          selectedMuscles.includes(muscle.value) 
                            ? 'text-blue-600' 
                            : 'text-gray-400'
                        }`}
                      />
                      <div className="font-semibold text-gray-800 text-xs">{muscle.label}</div>
                    </button>
                  );
                })}
              </div>

              {/* Weekly Frequency Selector */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                  📅 Quantas vezes por semana?
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 3, 4, 5].map(freq => (
                    <button
                      key={freq}
                      type="button"
                      onClick={() => setWeeklyFrequency(freq)}
                      className={`py-3 rounded-lg font-bold transition-all ${
                        weeklyFrequency === freq
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400'
                      }`}
                    >
                      {freq}x
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
                  {selectedMuscles.length > 1 
                    ? `A IA vai distribuir inteligentemente os ${selectedMuscles.length} grupos nos ${weeklyFrequency} dias`
                    : `Treino focado ${weeklyFrequency}x por semana`
                  }
                </p>
              </div>

              {selectedMuscles.length > 0 && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 text-center font-medium">
                    ✅ {selectedMuscles.length} grupo(s) selecionado(s) • {weeklyFrequency}x por semana
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSelect}
                  disabled={selectedMuscles.length === 0}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
                >
                  Gerar Treino
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

