import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaWeight, 
  FaRuler, 
  FaBirthdayCake, 
  FaBullseye,
  FaRunning,
  FaArrowRight
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function OnboardingSetup() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    goals: 'maintenance',
    activityLevel: 'moderate'
  });
  const [loading, setLoading] = useState(false);

  const goals = [
    { value: 'weight_loss', label: 'Perder Peso', emoji: '🔥' },
    { value: 'weight_gain', label: 'Ganhar Peso', emoji: '💪' },
    { value: 'maintenance', label: 'Manter Peso', emoji: '⚖️' },
    { value: 'muscle_gain', label: 'Ganhar Massa', emoji: '🏋️' }
  ];

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentário', desc: 'Pouco ou nenhum exercício' },
    { value: 'light', label: 'Leve', desc: '1-3 dias por semana' },
    { value: 'moderate', label: 'Moderado', desc: '3-5 dias por semana' },
    { value: 'active', label: 'Ativo', desc: '6-7 dias por semana' },
    { value: 'very_active', label: 'Muito Ativo', desc: 'Exercício intenso diário' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.weight || !formData.height || !formData.age) {
        toast.error('Por favor, preencha todos os campos');
        return;
      }
      
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      const age = parseInt(formData.age);
      
      if (weight < 30 || weight > 300) {
        toast.error('Peso deve estar entre 30 e 300 kg');
        return;
      }
      if (height < 100 || height > 250) {
        toast.error('Altura deve estar entre 100 e 250 cm');
        return;
      }
      if (age < 10 || age > 120) {
        toast.error('Idade deve estar entre 10 e 120 anos');
        return;
      }
      
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const weight = parseFloat(formData.weight);
      const updateData = {
        weight: weight,
        initialWeight: weight, // Salva peso inicial para calcular progresso
        height: parseFloat(formData.height),
        age: parseInt(formData.age),
        goals: formData.goals,
        activityLevel: formData.activityLevel,
        onboardingCompleted: true,
        onboardingDate: new Date().toISOString()
      };

      const result = await updateUser(updateData);
      
      if (result.success) {
        toast.success('Perfil configurado com sucesso! 🎉');
        navigate('/dashboard');
      } else {
        toast.error('Erro ao salvar dados. Tente novamente.');
      }
    } catch (error) {
      console.error('Error saving onboarding data:', error);
      toast.error('Erro ao salvar dados');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Bem-vindo, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Vamos configurar seu perfil em {step}/3 passos
          </p>
          
          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Dados Físicos */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaWeight className="mr-3 text-green-600" />
              Dados Físicos
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaWeight className="inline mr-2 text-green-600" />
                  Peso Atual (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="Ex: 75"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  min="30"
                  max="300"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaRuler className="inline mr-2 text-blue-600" />
                  Altura (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="Ex: 175"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  min="100"
                  max="250"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaBirthdayCake className="inline mr-2 text-pink-600" />
                  Idade
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Ex: 30"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  min="10"
                  max="120"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Objetivos */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaBullseye className="mr-3 text-green-600" />
              Qual seu objetivo?
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              {goals.map(goal => (
                <button
                  key={goal.value}
                  onClick={() => setFormData(prev => ({ ...prev, goals: goal.value }))}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    formData.goals === goal.value
                      ? 'border-green-500 bg-green-50 shadow-lg'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="text-4xl mb-2">{goal.emoji}</div>
                  <div className="font-bold text-gray-800">{goal.label}</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Nível de Atividade */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaRunning className="mr-3 text-green-600" />
              Nível de Atividade Física
            </h2>
            
            <div className="space-y-3">
              {activityLevels.map(level => (
                <button
                  key={level.value}
                  onClick={() => setFormData(prev => ({ ...prev, activityLevel: level.value }))}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    formData.activityLevel === level.value
                      ? 'border-green-500 bg-green-50 shadow-lg'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="font-bold text-gray-800">{level.label}</div>
                  <div className="text-sm text-gray-600">{level.desc}</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              ← Voltar
            </button>
          )}
          
          <button
            onClick={handleNext}
            disabled={loading}
            className={`${step === 1 ? 'ml-auto' : ''} px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center disabled:bg-green-400`}
          >
            {loading ? (
              'Salvando...'
            ) : step === 3 ? (
              <>Finalizar 🎉</>
            ) : (
              <>Próximo <FaArrowRight className="ml-2" /></>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

