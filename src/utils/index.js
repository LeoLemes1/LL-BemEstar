// Utility functions

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR');
};

export const formatWeight = (weight) => {
  return `${weight}kg`;
};

export const formatCalories = (calories) => {
  return `${calories} kcal`;
};

export const calculateBMI = (weight, height) => {
  const heightInMeters = height / 100;
  return (weight / (heightInMeters * heightInMeters)).toFixed(1);
};

export const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { category: 'Abaixo do peso', color: 'text-blue-600' };
  if (bmi < 25) return { category: 'Peso normal', color: 'text-green-600' };
  if (bmi < 30) return { category: 'Sobrepeso', color: 'text-yellow-600' };
  return { category: 'Obesidade', color: 'text-red-600' };
};

export const calculateBMR = (weight, height, age, gender) => {
  // Harris-Benedict Equation
  if (gender === 'male') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
};

export const calculateTDEE = (bmr, activityLevel) => {
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };
  
  return bmr * (multipliers[activityLevel] || 1.2);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
