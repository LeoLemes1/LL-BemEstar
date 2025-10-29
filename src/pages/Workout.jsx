import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaDumbbell, 
  FaPlay, 
  FaPause, 
  FaStop, 
  FaClock, 
  FaFire,
  FaSyncAlt,
  FaHeart,
  FaDumbbell as FaMuscle,
  FaArrowLeft
} from 'react-icons/fa';
import { exerciseDatabase, workoutTemplates } from '../mock/exerciseMock';
import { generateWorkoutAdvice } from '../services/geminiService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';

export default function Workout() {
  const { user } = useAuth();
  const toast = useToast();
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [aiAdvice, setAiAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const levels = ['beginner', 'intermediate', 'advanced'];
  const muscles = ['peito', 'costas', 'pernas', 'ombros', 'braços', 'core'];

  const handleGenerateWorkout = async () => {
    setLoading(true);
    toast.info('Gerando novo treino...');

    try {
      // Generate AI advice
      const advice = await generateWorkoutAdvice(user, 'pt');
      setAiAdvice(advice);

      // Select random exercises based on user level
      const userLevel = user?.activityLevel || 'light';
      const filteredExercises = exerciseDatabase.filter(ex => {
        if (userLevel === 'light' || userLevel === 'sedentary') return ex.level === 'beginner';
        if (userLevel === 'moderate') return ex.level === 'beginner' || ex.level === 'intermediate';
        return true;
      });

      const selected = filteredExercises
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);

      setSelectedExercises(selected);
      setCurrentWorkout({
        id: Date.now(),
        exercises: selected,
        startTime: new Date(),
        duration: 0
      });
      
      toast.success('Treino gerado com sucesso!');
    } catch (error) {
      console.error('Error generating workout:', error);
      toast.error('Erro ao gerar treino. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const startWorkout = () => {
    if (selectedExercises.length === 0) {
      toast.error('Gere um treino primeiro!');
      return;
    }
    
    setIsPlaying(true);
    setCurrentExercise(0);
    setTimeLeft(30); // 30 seconds per exercise
    
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (currentExercise < selectedExercises.length - 1) {
            setCurrentExercise(prev => prev + 1);
            return 30;
          } else {
            setIsPlaying(false);
            clearInterval(interval);
            toast.success('Treino concluído! Parabéns! 🎉');
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseWorkout = () => {
    setIsPlaying(false);
    toast.info('Treino pausado');
  };

  const stopWorkout = () => {
    setIsPlaying(false);
    setCurrentExercise(0);
    setTimeLeft(0);
    toast.info('Treino interrompido');
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelLabel = (level) => {
    switch (level) {
      case 'beginner': return 'Iniciante';
      case 'intermediate': return 'Intermediário';
      case 'advanced': return 'Avançado';
      default: return level;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-800 mb-2 flex items-center">
                <FaDumbbell className="mr-3" />
                Treino em Casa
              </h1>
              <p className="text-gray-600">
                Treinos personalizados para fazer em casa
              </p>
            </div>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Voltar ao Dashboard
            </Link>
          </div>
        </div>

        {/* AI Advice */}
        {aiAdvice && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start">
              <FaDumbbell className="text-blue-500 text-xl mr-3 mt-1" />
              <div>
                <h3 className="font-bold text-blue-800 mb-2">Dicas do Personal Trainer IA</h3>
                <p className="text-blue-700 whitespace-pre-wrap">{aiAdvice}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Workout Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Controles do Treino
            </h3>
            
            <div className="space-y-4">
              <button
                onClick={handleGenerateWorkout}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <FaSyncAlt className="animate-spin mr-2" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <FaSyncAlt className="mr-2" />
                    Gerar Novo Treino
                  </>
                )}
              </button>

              {selectedExercises.length > 0 && (
                <div className="space-y-2">
                  <button
                    onClick={startWorkout}
                    disabled={isPlaying}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <FaPlay className="mr-2" />
                    Iniciar Treino
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={pauseWorkout}
                      disabled={!isPlaying}
                      className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <FaPause className="mr-2" />
                      Pausar
                    </button>
                    <button
                      onClick={stopWorkout}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <FaStop className="mr-2" />
                      Parar
                    </button>
                  </div>
                </div>
              )}

              {/* Timer */}
              {isPlaying && (
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm text-gray-600">
                    Exercício {currentExercise + 1} de {selectedExercises.length}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Current Exercise */}
          {selectedExercises.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                {isPlaying ? 'Exercício Atual' : 'Exercícios do Treino'}
              </h3>

              {isPlaying ? (
                <div className="text-center">
                  <div className="mb-6">
                    <img
                      src={selectedExercises[currentExercise]?.image}
                      alt={selectedExercises[currentExercise]?.name}
                      className="w-64 h-64 object-cover rounded-xl mx-auto shadow-lg"
                    />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedExercises[currentExercise]?.name}
                  </h4>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Repetições</div>
                      <div className="font-bold">{selectedExercises[currentExercise]?.reps}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Séries</div>
                      <div className="font-bold">{selectedExercises[currentExercise]?.sets}</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Descanso</div>
                      <div className="font-bold">{selectedExercises[currentExercise]?.rest}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {selectedExercises[currentExercise]?.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {selectedExercises[currentExercise]?.muscles.map((muscle, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedExercises.map((exercise, index) => (
                    <motion.div
                      key={exercise.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={exercise.image}
                          alt={exercise.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 mb-1">
                            {exercise.name}
                          </h4>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(exercise.level)}`}>
                              {getLevelLabel(exercise.level)}
                            </span>
                            <span className="text-sm text-gray-600">{exercise.reps}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {exercise.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {exercise.muscles.map((muscle, muscleIndex) => (
                              <span key={muscleIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                {muscle}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Exercise Database */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 mt-8"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Base de Exercícios
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exerciseDatabase.map((exercise) => (
              <motion.div
                key={exercise.id}
                whileHover={{ scale: 1.02 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
              >
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-bold text-gray-800 mb-2">{exercise.name}</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(exercise.level)}`}>
                    {getLevelLabel(exercise.level)}
                  </span>
                  <span className="text-sm text-gray-600">{exercise.reps}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
                <div className="flex flex-wrap gap-1">
                  {exercise.muscles.map((muscle, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {muscle}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
