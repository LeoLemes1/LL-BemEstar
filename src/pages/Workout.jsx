import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FaDumbbell, 
  FaPlay, 
  FaPause, 
  FaStop, 
  FaClock, 
  FaFire,
  FaSyncAlt,
  FaTrash,
  FaPlus,
  FaList
} from 'react-icons/fa';
import { generateWeeklyWorkout } from '../services/geminiService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import BackToDashboard from '../components/BackToDashboard';
import MuscleSelectModal from '../components/MuscleSelectModal';
import WorkoutListModal from '../components/WorkoutListModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { 
  saveGeneratedWorkout, 
  getAllWorkouts, 
  deleteWorkout 
} from '../services/firestoreService';
import { getExerciseImageByCategory } from '../utils/exerciseImages';

export default function Workout() {
  const { user } = useAuth();
  const toast = useToast();
  const [showMuscleModal, setShowMuscleModal] = useState(false);
  const [showWorkoutList, setShowWorkoutList] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);
  const [currentWorkoutPlan, setCurrentWorkoutPlan] = useState(null);
  const [allWorkouts, setAllWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  
  // Timer states
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isExerciseSelected, setIsExerciseSelected] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const intervalRef = useRef(null);

  // Carrega todos os treinos salvos ao entrar
  useEffect(() => {
    const loadWorkouts = async () => {
      if (user && user.id) {
        try {
          const result = await getAllWorkouts(user.id);
          if (result.success && result.data.length > 0) {
            setAllWorkouts(result.data);
            // Define o primeiro como atual se não tiver nenhum selecionado
            if (!currentWorkoutPlan) {
              setCurrentWorkoutPlan(result.data[0]);
            }
          }
        } catch (error) {
          console.error('Error loading workouts:', error);
        }
      }
    };

    loadWorkouts();
  }, [user]);

  const selectExercise = (exerciseIndex) => {
    // Para o treino atual se estiver rodando
    if (isPlaying || isPaused) {
      stopTimer();
    }
    
    // Seleciona o exercício mas NÃO inicia automaticamente
    setIsExerciseSelected(true);
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentExerciseIndex(exerciseIndex);
    setTimeLeft(30);
    toast.info(`📋 Exercício selecionado! Clique em "Iniciar Contagem" quando estiver pronto.`);
  };

  const startExerciseTimer = () => {
    setIsPlaying(true);
    setIsPaused(false);
    setIsExerciseSelected(true);
    startTimer();
    toast.success('⏱️ Contagem iniciada! Bora! 💪');
  };

  const resetExerciseTimer = () => {
    stopTimer();
    setTimeLeft(30);
    setIsPaused(false);
    setIsPlaying(false);
    toast.info('🔄 Timer resetado para 30 segundos!');
  };

  const handleMuscleSelect = async (muscleGroup, frequency) => {
    setShowMuscleModal(false);

    // Verifica limite de treinos
    if (allWorkouts.length >= 4) {
      toast.error('Você já tem 4 treinos salvos! Exclua um antes de criar outro. 💪');
      setShowWorkoutList(true);
      return;
    }

    setLoading(true);

    try {
      const workoutData = await generateWeeklyWorkout(muscleGroup, user, frequency);
      
      // Salva no Firebase
      if (user && user.id) {
        const saveResult = await saveGeneratedWorkout(user.id, {
          ...workoutData,
          muscleGroup,
          createdAt: new Date().toISOString()
        });
        
        const newWorkout = {
          id: saveResult.id,
          ...workoutData,
          muscleGroup,
          createdAt: new Date().toISOString()
        };
        
        setAllWorkouts(prev => [newWorkout, ...prev]);
        setCurrentWorkoutPlan(newWorkout);
      }
      
      setSelectedDay(0);
      toast.success('🎉 Treino gerado e salvo com sucesso!');
    } catch (error) {
      console.error('Error generating workout:', error);
      
      // Mensagem amigável baseada no erro
      if (error.message.includes('429') || error.message.includes('Aguarde')) {
        toast.error('⏰ Calma aí! Você usou muito a IA hoje. Aguarda uns minutinhos e tenta de novo! 😊');
      } else {
        toast.error(error.message || 'Ops! Erro ao gerar treino. Tenta de novo? 😅');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWorkout = (workout) => {
    setWorkoutToDelete(workout);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!workoutToDelete) return;

    try {
      if (user && user.id) {
        await deleteWorkout(user.id, workoutToDelete.id);
      }
      
      setAllWorkouts(prev => prev.filter(w => w.id !== workoutToDelete.id));
      
      // Se deletou o treino atual, limpa
      if (currentWorkoutPlan?.id === workoutToDelete.id) {
        setCurrentWorkoutPlan(allWorkouts.find(w => w.id !== workoutToDelete.id) || null);
      }
      
      setIsPlaying(false);
      stopTimer();
      toast.success('🗑️ Treino excluído com sucesso!');
    } catch (error) {
      console.error('Error deleting workout:', error);
      toast.error('Ops! Erro ao excluir treino 😅');
    }
  };

  const startWorkout = () => {
    if (!currentWorkoutPlan || !currentWorkoutPlan.weeklyPlan[selectedDay]) {
      toast.error('Selecione um dia de treino!');
      return;
    }
    
    setIsExerciseSelected(true);
    setIsPlaying(true);
    setIsPaused(false);
    setCurrentExerciseIndex(0);
    setTimeLeft(30);
    startTimer();
    toast.success('Treino iniciado! Bora lá! 💪');
  };

  const pauseWorkout = () => {
    setIsPaused(true);
    setIsPlaying(false);
    stopTimer();
    toast.info('⏸️ Treino pausado');
  };

  const resumeWorkout = () => {
    setIsPaused(false);
    setIsPlaying(true);
    startTimer();
    toast.info('▶️ Treino retomado!');
  };

  const stopWorkoutSession = (showToast = true) => {
    setIsPlaying(false);
    setIsPaused(false);
    setIsExerciseSelected(false);
    setCurrentExerciseIndex(0);
    setTimeLeft(30);
    stopTimer();
    if (showToast) {
      toast.info('Treino interrompido');
    }
  };

  const startTimer = () => {
    stopTimer(); // Limpa timer anterior
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          nextExercise();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const nextExercise = () => {
    const exercises = currentWorkoutPlan.weeklyPlan[selectedDay]?.exercises || [];
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setTimeLeft(30);
    } else {
      setIsPlaying(false);
      setIsPaused(false);
      stopTimer();
      toast.success('🎉 Treino concluído! Parabéns! Você arrasou! 💪');
    }
  };

  const skipToNext = () => {
    nextExercise();
    toast.info('⏭️ Próximo exercício!');
  };

  useEffect(() => {
    return () => stopTimer(); // Cleanup
  }, []);

  const currentExercise = currentWorkoutPlan?.weeklyPlan[selectedDay]?.exercises[currentExerciseIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-800 mb-2 flex items-center">
                <FaDumbbell className="mr-3" />
                Treino Personalizado
              </h1>
              <p className="text-gray-600">
                Treinos gerados por IA focados no seu objetivo
              </p>
            </div>
            <BackToDashboard />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex gap-3 flex-wrap">
          <button
            onClick={() => setShowMuscleModal(true)}
            disabled={loading}
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-5 rounded-full transition-all flex items-center gap-2 font-medium disabled:opacity-50"
          >
            <FaPlus size={14} /> Novo Treino
          </button>
          
          {allWorkouts.length > 0 && (
            <button
              onClick={() => setShowWorkoutList(true)}
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 py-2 px-5 rounded-full transition-all flex items-center gap-2 font-medium"
            >
              <FaList size={14} /> Meus Treinos ({allWorkouts.length}/4)
            </button>
          )}
        </div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-12 text-center"
          >
            <div className="flex flex-col items-center justify-center">
              <FaSyncAlt className="text-6xl text-blue-500 mb-6 animate-spin" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Gerando Treino Personalizado...
              </h3>
              <p className="text-gray-600 mb-4">
                A IA está criando o treino perfeito pra você! 🤖
              </p>
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </motion.div>
        ) : currentWorkoutPlan ? (
          <>
            {/* Tips */}
            {currentWorkoutPlan.tips && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6"
              >
                <p className="text-blue-800 font-medium">💡 {currentWorkoutPlan.tips}</p>
              </motion.div>
            )}

            {/* Day Selector */}
            <div className="mb-6">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {currentWorkoutPlan.weeklyPlan.map((day, index) => {
                  // Extrai músculos únicos do dia e limita a exibição
                  const musclesInDay = [...new Set(day.exercises.flatMap(ex => ex.muscles || []))];
                  const displayMuscles = musclesInDay.slice(0, 3).join(', ') + (musclesInDay.length > 3 ? '...' : '');
                  
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedDay(index);
                        stopWorkoutSession(false); // Não mostra toast ao trocar de dia
                      }}
                      className={`px-5 py-4 rounded-xl font-medium transition-all ${
                        selectedDay === index
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400'
                      }`}
                      style={{ minWidth: '160px' }}
                    >
                      <div className="font-bold mb-2 text-base">{day.day}</div>
                      <div className={`text-xs mb-1 ${selectedDay === index ? 'text-blue-100' : 'text-gray-500'}`}>
                        💪 {displayMuscles}
                      </div>
                      <div className={`text-xs ${selectedDay === index ? 'text-blue-200' : 'text-gray-400'}`}>
                        📝 {day.exercises.length} exercícios
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Workout Controls */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Controles
                </h3>
                
                <div className="space-y-3">
                  {!isExerciseSelected && (
                    <button
                      onClick={startWorkout}
                      className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 py-3 px-6 rounded-lg transition-all flex items-center justify-center font-medium"
                    >
                      <FaPlay className="mr-2" size={14} />
                      Iniciar Treino
                    </button>
                  )}

                  {isExerciseSelected && !isPlaying && !isPaused && (
                    <button
                      onClick={startExerciseTimer}
                      className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 py-3 px-6 rounded-lg transition-all flex items-center justify-center font-medium"
                    >
                      <FaPlay className="mr-2" size={14} />
                      Iniciar Contagem
                    </button>
                  )}

                  {isPlaying && (
                    <button
                      onClick={pauseWorkout}
                      className="w-full border-2 border-orange-500 text-orange-600 hover:bg-orange-50 py-3 px-6 rounded-lg transition-all flex items-center justify-center font-medium"
                    >
                      <FaPause className="mr-2" size={14} />
                      Pausar
                    </button>
                  )}

                  {isPaused && (
                    <button
                      onClick={resumeWorkout}
                      className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 py-3 px-6 rounded-lg transition-all flex items-center justify-center font-medium"
                    >
                      <FaPlay className="mr-2" size={14} />
                      Continuar
                    </button>
                  )}

                  {isExerciseSelected && (
                    <>
                      <button
                        onClick={resetExerciseTimer}
                        className="w-full border-2 border-purple-500 text-purple-600 hover:bg-purple-50 py-3 px-6 rounded-lg transition-all flex items-center justify-center font-medium"
                      >
                        🔄 Resetar Timer
                      </button>

                      <button
                        onClick={skipToNext}
                        className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-lg transition-all flex items-center justify-center font-medium"
                      >
                        ⏭️ Próximo Exercício
                      </button>
                      
                      <button
                        onClick={stopWorkoutSession}
                        className="w-full border-2 border-red-500 text-red-500 hover:bg-red-50 py-3 px-6 rounded-lg transition-all flex items-center justify-center font-medium"
                      >
                        <FaStop className="mr-2" size={14} />
                        Parar Treino
                      </button>
                    </>
                  )}
                </div>

                {/* Timer */}
                {isExerciseSelected && (
                  <div className={`mt-6 text-center p-6 rounded-xl ${isPlaying ? 'bg-gradient-to-br from-green-50 to-blue-50' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
                    <div className={`text-5xl font-bold mb-2 ${isPlaying ? 'text-green-600' : 'text-gray-400'}`}>
                      {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm text-gray-600">
                      Exercício {currentExerciseIndex + 1} de {currentWorkoutPlan.weeklyPlan[selectedDay]?.exercises.length || 0}
                    </div>
                    {!isPlaying && !isPaused && (
                      <div className="text-xs text-gray-500 mt-2">
                        ⏸️ Timer pronto para iniciar
                      </div>
                    )}
                  </div>
                )}
              </motion.div>

              {/* Current Exercise or List */}
              <div className="lg:col-span-2">
                {isExerciseSelected ? (
                  <motion.div
                    key={currentExerciseIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-6">
                      Exercício Atual
                    </h3>

                    {/* Imagem REAL de Exercício */}
                    <div className="mb-6 rounded-xl overflow-hidden shadow-2xl relative h-[400px]">
                      <img 
                        src={getExerciseImageByCategory(currentExercise?.name, currentExercise?.muscles)} 
                        alt={currentExercise?.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop&q=80';
                        }}
                      />
                      {/* Overlay com info */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
                        <div className="p-6 w-full">
                          <h5 className="text-3xl font-bold text-white drop-shadow-lg mb-3">{currentExercise?.name}</h5>
                          <div className="flex gap-2 flex-wrap">
                            {currentExercise?.muscles.map((muscle, idx) => (
                              <span key={idx} className="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium border border-white/30">
                                💪 {muscle}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                      {currentExercise?.name}
                    </h4>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-xs text-gray-600 mb-1">Repetições</div>
                        <div className="font-bold text-blue-600 text-lg">{currentExercise?.reps}</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <div className="text-xs text-gray-600 mb-1">Séries</div>
                        <div className="font-bold text-green-600 text-lg">{currentExercise?.sets}</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4 text-center">
                        <div className="text-xs text-gray-600 mb-1">Descanso</div>
                        <div className="font-bold text-orange-600 text-lg">{currentExercise?.rest}</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-gray-700 leading-relaxed">{currentExercise?.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                      {currentExercise?.muscles.map((muscle, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {muscle}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-6">
                      Exercícios - {currentWorkoutPlan.weeklyPlan[selectedDay]?.day}
                    </h3>

                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                      {currentWorkoutPlan.weeklyPlan[selectedDay]?.exercises.map((exercise, index) => (
                        <button
                          key={index}
                          onClick={() => selectExercise(index)}
                          className="w-full border-2 border-gray-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-md transition-all text-left"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-800 text-lg mb-2">{exercise.name}</h4>
                              <div className="flex gap-3 mb-2 text-sm">
                                <span className="text-blue-600 font-medium">📊 {exercise.reps}</span>
                                <span className="text-green-600 font-medium">🔁 {exercise.sets} séries</span>
                                <span className="text-orange-600 font-medium">⏱️ {exercise.rest}</span>
                              </div>
                              <p className="text-gray-600 text-sm mb-2">{exercise.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {exercise.muscles.map((muscle, mIndex) => (
                                  <span key={mIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                    {muscle}
                                  </span>
                                ))}
                              </div>
                              <div className="mt-2 text-xs text-blue-600 font-medium">
                                👆 Clique para iniciar este exercício
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-12 text-center"
          >
            <FaDumbbell className="text-6xl text-gray-300 mb-6 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Nenhum Treino Gerado
            </h3>
            <p className="text-gray-600 mb-6">
              Clique no botão acima para gerar seu treino personalizado com IA!
            </p>
            <button
              onClick={() => setShowMuscleModal(true)}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors inline-flex items-center gap-2 disabled:opacity-50"
            >
              <FaPlus /> Gerar Primeiro Treino
            </button>
          </motion.div>
        )}

        {/* Modals */}
        <MuscleSelectModal
          isOpen={showMuscleModal}
          onClose={() => setShowMuscleModal(false)}
          onSelect={handleMuscleSelect}
        />

        <WorkoutListModal
          isOpen={showWorkoutList}
          onClose={() => setShowWorkoutList(false)}
          workouts={allWorkouts}
          currentWorkoutId={currentWorkoutPlan?.id}
          onSelect={(workout) => {
            setCurrentWorkoutPlan(workout);
            setSelectedDay(0);
            stopWorkoutSession(false);
            toast.success('✅ Treino selecionado!');
          }}
          onDelete={handleDeleteWorkout}
        />

        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          workoutName={`Treino ${allWorkouts.findIndex(w => w.id === workoutToDelete?.id) + 1}`}
        />
      </div>
    </div>
  );
}
