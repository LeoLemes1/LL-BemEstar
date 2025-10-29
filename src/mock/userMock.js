export const mockUser = {
  id: 1,
  name: 'João Silva',
  email: 'joao@example.com',
  language: 'pt',
  weight: 75,
  height: 175,
  age: 30,
  goals: 'weight_loss',
  activityLevel: 'moderate',
  preferences: {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    lactoseFree: false,
    allergies: []
  }
};

export const mockNutritionPlan = {
  dailyCalories: 2000,
  macros: {
    protein: 150, // grams
    carbs: 200,  // grams
    fat: 80       // grams
  },
  meals: [
    {
      id: 1,
      name: 'Café da Manhã',
      time: '08:00',
      calories: 400,
      foods: [
        { name: 'Aveia', amount: '50g', calories: 200 },
        { name: 'Banana', amount: '1 unidade', calories: 100 },
        { name: 'Leite', amount: '200ml', calories: 100 }
      ]
    },
    {
      id: 2,
      name: 'Lanche da Manhã',
      time: '10:30',
      calories: 150,
      foods: [
        { name: 'Iogurte Grego', amount: '150g', calories: 100 },
        { name: 'Amêndoas', amount: '10 unidades', calories: 50 }
      ]
    },
    {
      id: 3,
      name: 'Almoço',
      time: '12:30',
      calories: 600,
      foods: [
        { name: 'Frango Grelhado', amount: '150g', calories: 250 },
        { name: 'Arroz Integral', amount: '100g', calories: 120 },
        { name: 'Brócolis', amount: '100g', calories: 30 },
        { name: 'Azeite', amount: '1 colher', calories: 90 },
        { name: 'Salada', amount: '100g', calories: 20 }
      ]
    },
    {
      id: 4,
      name: 'Lanche da Tarde',
      time: '16:00',
      calories: 200,
      foods: [
        { name: 'Maçã', amount: '1 unidade', calories: 80 },
        { name: 'Queijo Cottage', amount: '100g', calories: 120 }
      ]
    },
    {
      id: 5,
      name: 'Jantar',
      time: '19:30',
      calories: 500,
      foods: [
        { name: 'Salmão', amount: '120g', calories: 200 },
        { name: 'Batata Doce', amount: '150g', calories: 120 },
        { name: 'Espinafre', amount: '100g', calories: 20 },
        { name: 'Azeite', amount: '1 colher', calories: 90 },
        { name: 'Quinoa', amount: '80g', calories: 70 }
      ]
    },
    {
      id: 6,
      name: 'Ceia',
      time: '21:30',
      calories: 150,
      foods: [
        { name: 'Chá Verde', amount: '1 xícara', calories: 0 },
        { name: 'Castanhas', amount: '5 unidades', calories: 150 }
      ]
    }
  ]
};

export const mockProgress = {
  weightHistory: [
    { date: '2024-01-01', weight: 80 },
    { date: '2024-01-08', weight: 79.5 },
    { date: '2024-01-15', weight: 79 },
    { date: '2024-01-22', weight: 78.5 },
    { date: '2024-01-29', weight: 78 },
    { date: '2024-02-05', weight: 77.5 },
    { date: '2024-02-12', weight: 77 },
    { date: '2024-02-19', weight: 76.5 },
    { date: '2024-02-26', weight: 76 },
    { date: '2024-03-05', weight: 75.5 },
    { date: '2024-03-12', weight: 75 }
  ],
  calorieHistory: [
    { date: '2024-01-01', calories: 2200 },
    { date: '2024-01-08', calories: 2100 },
    { date: '2024-01-15', calories: 2050 },
    { date: '2024-01-22', calories: 2000 },
    { date: '2024-01-29', calories: 2000 },
    { date: '2024-02-05', calories: 2000 },
    { date: '2024-02-12', calories: 2000 },
    { date: '2024-02-19', calories: 2000 },
    { date: '2024-02-26', calories: 2000 },
    { date: '2024-03-05', calories: 2000 },
    { date: '2024-03-12', calories: 2000 }
  ]
};
