import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaDumbbell, FaTrash, FaPlay } from 'react-icons/fa';

export default function WorkoutListModal({ isOpen, onClose, workouts, onSelect, onDelete, currentWorkoutId }) {
  const muscleEmojis = {
    peito: '💪',
    costas: '🦅',
    pernas: '🦵',
    gluteos: '🍑',
    ombros: '🏋️',
    braços: '💪',
    abdomen: '🔥',
    corpo_todo: '🎯'
  };

  const getMuscleEmojis = (muscles) => {
    if (!muscles) return '🎯';
    const musclesArray = Array.isArray(muscles) ? muscles : [muscles];
    return musclesArray.map(m => muscleEmojis[m] || '💪').join(' ');
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
              zIndex: 60
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
              zIndex: 70,
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
                  Meus Treinos ({workouts.length}/4)
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              {workouts.length === 0 ? (
                <div className="text-center py-12">
                  <FaDumbbell className="text-5xl text-gray-300 mb-4 mx-auto" />
                  <p className="text-gray-500">Nenhum treino salvo ainda</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {workouts.map((workout, index) => (
                    <div
                      key={workout.id}
                      className={`border-2 rounded-xl p-4 transition-all ${
                        workout.id === currentWorkoutId
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{getMuscleEmojis(workout.muscleGroup)}</span>
                            <h3 className="font-bold text-gray-800">
                              Treino {index + 1}
                              {workout.id === currentWorkoutId && (
                                <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                                  Em uso
                                </span>
                              )}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            📅 {workout.weeklyPlan?.length || 0} dias por semana
                          </p>
                          <p className="text-xs text-gray-500">
                            Criado em: {new Date(workout.createdAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          {workout.id !== currentWorkoutId && (
                            <button
                              onClick={() => {
                                onSelect(workout);
                                onClose();
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Usar este treino"
                            >
                              <FaPlay />
                            </button>
                          )}
                          <button
                            onClick={() => onDelete(workout)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Excluir treino"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 text-center">
                  💡 Você pode ter até 4 treinos salvos
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

