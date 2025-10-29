export const exerciseDatabase = [
  {
    id: 1,
    name: 'Flexão de Braço',
    nameEn: 'Push-ups',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    level: 'beginner',
    reps: '10-15',
    sets: 3,
    rest: '60s',
    muscles: ['peito', 'tríceps', 'ombros'],
    description: 'Exercício clássico para fortalecer peito, braços e ombros',
    descriptionEn: 'Classic exercise to strengthen chest, arms and shoulders'
  },
  {
    id: 2,
    name: 'Agachamento',
    nameEn: 'Squats',
    image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400',
    level: 'beginner',
    reps: '15-20',
    sets: 3,
    rest: '60s',
    muscles: ['quadríceps', 'glúteos', 'core'],
    description: 'Movimento fundamental para pernas e glúteos',
    descriptionEn: 'Fundamental movement for legs and glutes'
  },
  {
    id: 3,
    name: 'Prancha',
    nameEn: 'Plank',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    level: 'beginner',
    reps: '30-60s',
    sets: 3,
    rest: '60s',
    muscles: ['core', 'ombros', 'costas'],
    description: 'Exercício isométrico para fortalecer o core',
    descriptionEn: 'Isometric exercise to strengthen the core'
  },
  {
    id: 4,
    name: 'Burpees',
    nameEn: 'Burpees',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    level: 'intermediate',
    reps: '8-12',
    sets: 3,
    rest: '90s',
    muscles: ['corpo inteiro'],
    description: 'Exercício completo que trabalha todo o corpo',
    descriptionEn: 'Complete exercise that works the entire body'
  },
  {
    id: 5,
    name: 'Mountain Climbers',
    nameEn: 'Mountain Climbers',
    image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400',
    level: 'intermediate',
    reps: '20-30',
    sets: 3,
    rest: '60s',
    muscles: ['core', 'ombros', 'pernas'],
    description: 'Exercício dinâmico para core e condicionamento',
    descriptionEn: 'Dynamic exercise for core and conditioning'
  },
  {
    id: 6,
    name: 'Pular Corda',
    nameEn: 'Jump Rope',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    level: 'beginner',
    reps: '60-120s',
    sets: 3,
    rest: '60s',
    muscles: ['pernas', 'cardio'],
    description: 'Excelente para condicionamento cardiovascular',
    descriptionEn: 'Excellent for cardiovascular conditioning'
  },
  {
    id: 7,
    name: 'Lunges',
    nameEn: 'Lunges',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    level: 'beginner',
    reps: '12-15 cada perna',
    sets: 3,
    rest: '60s',
    muscles: ['quadríceps', 'glúteos', 'isquiotibiais'],
    description: 'Exercício unilateral para pernas',
    descriptionEn: 'Unilateral exercise for legs'
  },
  {
    id: 8,
    name: 'Tríceps no Banco',
    nameEn: 'Tricep Dips',
    image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400',
    level: 'intermediate',
    reps: '8-12',
    sets: 3,
    rest: '60s',
    muscles: ['tríceps', 'ombros'],
    description: 'Fortalecimento específico para tríceps',
    descriptionEn: 'Specific strengthening for triceps'
  },
  {
    id: 9,
    name: 'Ponte de Glúteos',
    nameEn: 'Glute Bridge',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    level: 'beginner',
    reps: '15-20',
    sets: 3,
    rest: '60s',
    muscles: ['glúteos', 'isquiotibiais', 'core'],
    description: 'Foco no fortalecimento dos glúteos',
    descriptionEn: 'Focus on glute strengthening'
  },
  {
    id: 10,
    name: 'Superman',
    nameEn: 'Superman',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    level: 'beginner',
    reps: '10-15',
    sets: 3,
    rest: '60s',
    muscles: ['costas', 'glúteos'],
    description: 'Fortalecimento da região lombar',
    descriptionEn: 'Lower back strengthening'
  }
];

export const workoutTemplates = [
  {
    id: 1,
    name: 'Treino Iniciante',
    nameEn: 'Beginner Workout',
    duration: '20-30 min',
    exercises: [1, 2, 3, 6, 7, 9, 10],
    description: 'Treino básico para iniciantes',
    descriptionEn: 'Basic workout for beginners'
  },
  {
    id: 2,
    name: 'Treino Intermediário',
    nameEn: 'Intermediate Workout',
    duration: '30-45 min',
    exercises: [1, 2, 4, 5, 6, 7, 8, 9],
    description: 'Treino com maior intensidade',
    descriptionEn: 'Workout with higher intensity'
  },
  {
    id: 3,
    name: 'HIIT Cardio',
    nameEn: 'HIIT Cardio',
    duration: '15-20 min',
    exercises: [4, 5, 6],
    description: 'Treino de alta intensidade',
    descriptionEn: 'High intensity workout'
  }
];
