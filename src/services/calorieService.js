// Calcula a Taxa Metabólica Basal (TMB) usando a fórmula de Harris-Benedict
export const calculateBMR = (weight, height, age, gender = 'male') => {
  if (gender === 'male') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
};

// Calcula necessidade calórica diária baseada no nível de atividade
export const calculateDailyCalories = (bmr, activityLevel) => {
  const activityMultipliers = {
    sedentary: 1.2,      // Pouco ou nenhum exercício
    light: 1.375,        // 1-3 dias por semana
    moderate: 1.55,      // 3-5 dias por semana
    active: 1.725,       // 6-7 dias por semana
    very_active: 1.9     // Exercício intenso diário
  };

  const multiplier = activityMultipliers[activityLevel] || 1.55;
  return Math.round(bmr * multiplier);
};

// Ajusta meta de calorias baseado no objetivo
export const adjustCaloriesForGoal = (dailyCalories, goal) => {
  const adjustments = {
    weight_loss: -500,    // Déficit de 500 calorias
    weight_gain: 500,     // Superávit de 500 calorias
    muscle_gain: 300,     // Superávit moderado
    maintenance: 0        // Manutenção
  };

  const adjustment = adjustments[goal] || 0;
  return Math.round(dailyCalories + adjustment);
};

// Calcula meta de calorias completa
export const calculateCalorieGoal = (user) => {
  if (!user || !user.weight || !user.height || !user.age) {
    return 2000; // Valor padrão
  }

  const bmr = calculateBMR(user.weight, user.height, user.age);
  const dailyCalories = calculateDailyCalories(bmr, user.activityLevel || 'moderate');
  const targetCalories = adjustCaloriesForGoal(dailyCalories, user.goals || 'maintenance');

  return targetCalories;
};

// Gera mensagem motivacional baseada no consumo de calorias
export const getCalorieMotivationalMessage = (consumed, target) => {
  const percentage = (consumed / target) * 100;
  const remaining = target - consumed;

  if (consumed === 0) {
    return {
      message: "Comece a registrar suas refeições! 💪",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    };
  }

  if (percentage < 50) {
    return {
      message: "Ótimo começo! Ainda tem bastante margem hoje 😊",
      color: "text-green-600",
      bgColor: "bg-green-50"
    };
  }

  if (percentage < 80) {
    return {
      message: "Vai bem! Continue assim 👍",
      color: "text-green-600",
      bgColor: "bg-green-50"
    };
  }

  if (percentage < 95) {
    return {
      message: "Tá chegando perto da meta! Tá indo muito bem 🎯",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    };
  }

  if (percentage < 105) {
    return {
      message: "Dentro da meta! Perfeito! 🎉",
      color: "text-green-600",
      bgColor: "bg-green-50"
    };
  }

  if (percentage < 115) {
    return {
      message: "Passou um pouquinho, mas tá tudo bem! Amanhã compensa 😉",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    };
  }

  if (percentage < 130) {
    return {
      message: "Hoje foi um dia especial! Aproveita e volta ao ritmo amanhã 💪",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    };
  }

  return {
    message: "Tudo bem ter dias assim! O importante é o equilíbrio na semana 🌟",
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  };
};

// Formata número de calorias
export const formatCalories = (calories) => {
  return Math.round(calories).toLocaleString('pt-BR');
};

