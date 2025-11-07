// Mapeia exercícios para termos de busca de imagens do Unsplash
const exerciseImageMap = {
  // Peito
  'flexão': 'pushup,exercise',
  'flexao': 'pushup,exercise',
  'supino': 'bench,press,workout',
  'crucifixo': 'dumbbell,fly,chest',
  'mergulho': 'dips,triceps,workout',
  
  // Costas
  'remada': 'rowing,back,exercise',
  'barra': 'pullup,chinup,bar',
  'pull': 'pullup,back,exercise',
  'levantamento': 'deadlift,workout',
  
  // Pernas
  'agachamento': 'squat,leg,workout',
  'afundo': 'lunge,leg,exercise',
  'stiff': 'deadlift,leg,workout',
  'panturrilha': 'calf,raise,exercise',
  
  // Glúteos
  'ponte': 'glute,bridge,exercise',
  'coice': 'kickback,glute,workout',
  'elevação': 'hip,thrust,glute',
  
  // Ombros
  'desenvolvimento': 'shoulder,press,workout',
  'elevação lateral': 'lateral,raise,shoulder',
  'elevacao': 'shoulder,raise,exercise',
  
  // Braços
  'rosca': 'bicep,curl,workout',
  'tríceps': 'triceps,extension,workout',
  'triceps': 'triceps,extension,workout',
  
  // Abdômen
  'abdominal': 'crunch,abs,workout',
  'prancha': 'plank,core,exercise',
  'mountain': 'mountain,climber,abs',
  
  // Corpo todo
  'burpee': 'burpee,fitness,workout',
  'jumping': 'jumping,jack,cardio',
  'polichinelo': 'jumping,jack,exercise',
};

/**
 * Gera URL de imagem do Unsplash baseada no nome do exercício
 * @param {string} exerciseName - Nome do exercício em português
 * @returns {string} URL da imagem
 */
export const getExerciseImageUrl = (exerciseName) => {
  if (!exerciseName) {
    return 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop';
  }
  
  const nameLower = exerciseName.toLowerCase();
  
  // Procura por match no mapa
  for (const [key, searchTerms] of Object.entries(exerciseImageMap)) {
    if (nameLower.includes(key)) {
      return `https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop&q=80`;
    }
  }
  
  // Fallback: usa o nome do exercício como termo de busca
  const searchTerm = exerciseName.split(' ')[0]; // Pega primeira palavra
  return `https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80`;
};

/**
 * Retorna uma coleção curada de imagens de exercícios por categoria
 */
export const getExerciseImageByCategory = (exerciseName, muscles = []) => {
  if (!exerciseName) {
    return 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop&q=80';
  }
  
  const nameLower = exerciseName.toLowerCase();
  const muscleStr = muscles.join(' ').toLowerCase();
  
  // Imagens específicas por tipo de exercício (URLs do Unsplash)
  
  // PEITO
  if (nameLower.includes('flexão') || nameLower.includes('flexao') || nameLower.includes('push')) {
    return 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&h=600&fit=crop&q=80';
  }
  if (nameLower.includes('supino') || nameLower.includes('press')) {
    return 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80';
  }
  
  // COSTAS
  if (nameLower.includes('barra') || nameLower.includes('pull')) {
    return 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&h=600&fit=crop&q=80';
  }
  if (nameLower.includes('remada')) {
    return 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&h=600&fit=crop&q=80';
  }
  
  // PERNAS
  if (nameLower.includes('agachamento') || nameLower.includes('squat')) {
    return 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&h=600&fit=crop&q=80';
  }
  if (nameLower.includes('afundo') || nameLower.includes('lunge')) {
    return 'https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?w=800&h=600&fit=crop&q=80';
  }
  
  // GLÚTEOS
  if (nameLower.includes('ponte') || nameLower.includes('bridge') || muscleStr.includes('glúteo')) {
    return 'https://images.unsplash.com/photo-1579364046732-c21c2e057084?w=800&h=600&fit=crop&q=80';
  }
  
  // OMBROS
  if (nameLower.includes('desenvolvimento') || (nameLower.includes('elevação') && muscleStr.includes('ombro'))) {
    return 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop&q=80';
  }
  
  // BRAÇOS
  if (nameLower.includes('rosca') || nameLower.includes('curl') || nameLower.includes('bíceps')) {
    return 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop&q=80';
  }
  if (nameLower.includes('tríceps') || nameLower.includes('triceps')) {
    return 'https://images.unsplash.com/photo-1558017487-06bf9f82613a?w=800&h=600&fit=crop&q=80';
  }
  
  // ABDÔMEN
  if (nameLower.includes('abdominal') || nameLower.includes('crunch')) {
    return 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80';
  }
  if (nameLower.includes('prancha') || nameLower.includes('plank')) {
    return 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&h=600&fit=crop&q=80';
  }
  
  // CORPO TODO / CARDIO
  if (nameLower.includes('burpee')) {
    return 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800&h=600&fit=crop&q=80';
  }
  if (nameLower.includes('jumping') || nameLower.includes('polichinelo')) {
    return 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop&q=80';
  }
  if (nameLower.includes('mountain')) {
    return 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80';
  }
  
  // FALLBACK por grupo muscular
  if (muscleStr.includes('peito') || muscleStr.includes('peitoral')) {
    return 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80';
  }
  if (muscleStr.includes('costa') || muscleStr.includes('dorsal')) {
    return 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&h=600&fit=crop&q=80';
  }
  if (muscleStr.includes('perna')) {
    return 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&h=600&fit=crop&q=80';
  }
  if (muscleStr.includes('glúteo')) {
    return 'https://images.unsplash.com/photo-1579364046732-c21c2e057084?w=800&h=600&fit=crop&q=80';
  }
  if (muscleStr.includes('ombro')) {
    return 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop&q=80';
  }
  if (muscleStr.includes('braço') || muscleStr.includes('bíceps') || muscleStr.includes('tríceps')) {
    return 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop&q=80';
  }
  if (muscleStr.includes('abdômen') || muscleStr.includes('core')) {
    return 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80';
  }
  
  // FALLBACK GERAL - Imagem genérica de fitness
  return 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop&q=80';
};

