// Simple AI service using mock responses and optional real AI
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

// Mock AI responses for when no API key is provided
const mockResponses = {
  nutritionPlan: {
    pt: `Com base nos seus dados, aqui está seu plano nutricional personalizado:

**Calorias Diárias Recomendadas: 2.000 kcal**

**Distribuição de Macronutrientes:**
• Proteínas: 150g (30% - 600 kcal)
• Carboidratos: 200g (40% - 800 kcal)  
• Gorduras: 67g (30% - 600 kcal)

**Recomendações Específicas:**
• Consuma 5-6 refeições por dia para manter o metabolismo ativo
• Priorize proteínas magras (frango, peixe, ovos) em todas as refeições
• Inclua gorduras saudáveis (abacate, azeite, castanhas) moderadamente
• Hidrate-se com 2-3L de água por dia
• Evite alimentos processados e açúcares refinados

**Dicas Importantes:**
• Faça refeições a cada 3-4 horas
• Mastigue devagar para melhor digestão
• Consuma fibras para saciedade (aveia, quinoa, vegetais)
• Suplemente com vitamina D se necessário

Este plano foi elaborado considerando seu objetivo de perda de peso saudável e sustentável.`,
    en: `Based on your data, here's your personalized nutrition plan:

**Daily Calories Recommended: 2,000 kcal**

**Macronutrient Distribution:**
• Proteins: 150g (30% - 600 kcal)
• Carbohydrates: 200g (40% - 800 kcal)
• Fats: 67g (30% - 600 kcal)

**Specific Recommendations:**
• Eat 5-6 meals per day to keep metabolism active
• Prioritize lean proteins (chicken, fish, eggs) in all meals
• Include healthy fats (avocado, olive oil, nuts) moderately
• Hydrate with 2-3L of water per day
• Avoid processed foods and refined sugars

**Important Tips:**
• Eat every 3-4 hours
• Chew slowly for better digestion
• Consume fiber for satiety (oats, quinoa, vegetables)
• Supplement with vitamin D if necessary

This plan was designed considering your healthy and sustainable weight loss goal.`
  },
  motivationalTips: [
    "Lembre-se: cada pequena escolha saudável é um passo em direção ao seu objetivo! 💪",
    "A consistência supera a perfeição. Continue focado! 🌟",
    "Seu corpo é seu templo. Alimente-o com amor! 🧘‍♀️",
    "Cada dia é uma nova oportunidade de ser a melhor versão de si mesmo! ✨",
    "O progresso não é linear. Celebre as pequenas vitórias! 📈"
  ],
  workoutAdvice: {
    pt: `**Dicas para seu Treino em Casa:**

• **Aquecimento:** Sempre comece com 5-10 minutos de movimento dinâmico
• **Técnica:** Foque na execução correta antes de aumentar a intensidade
• **Progressão:** Aumente gradualmente as repetições ou tempo
• **Descanso:** Respeite os intervalos para melhor recuperação
• **Hidratação:** Beba água antes, durante e após o treino
• **Consistência:** 3-4x por semana é melhor que treinos esporádicos intensos

**Lembre-se:** O melhor treino é aquele que você consegue fazer regularmente!`,
    en: `**Tips for Your Home Workout:**

• **Warm-up:** Always start with 5-10 minutes of dynamic movement
• **Technique:** Focus on correct execution before increasing intensity
• **Progression:** Gradually increase repetitions or time
• **Rest:** Respect intervals for better recovery
• **Hydration:** Drink water before, during and after training
• **Consistency:** 3-4x per week is better than sporadic intense workouts

**Remember:** The best workout is the one you can do regularly!`
  }
};

export const generateNutritionPlan = async (userData, language = 'pt') => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return mock response with personalized data
    const baseResponse = mockResponses.nutritionPlan[language];
    const personalizedResponse = baseResponse.replace('2.000 kcal', `${Math.round(userData.weight * 25)} kcal`);
    
    return personalizedResponse;
  } catch (error) {
    console.error('Error generating nutrition plan:', error);
    return language === 'pt' 
      ? "Desculpe, não foi possível gerar o plano no momento. Tente novamente mais tarde."
      : "Sorry, couldn't generate the plan at the moment. Please try again later.";
  }
};

export const generateMotivationalTip = async (language = 'pt') => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return random mock tip
    const tips = mockResponses.motivationalTips;
    return tips[Math.floor(Math.random() * tips.length)];
  } catch (error) {
    console.error('Error generating motivational tip:', error);
    return language === 'pt'
      ? "Lembre-se: cada pequena escolha saudável é um passo em direção ao seu objetivo! 💪"
      : "Remember: every small healthy choice is a step towards your goal! 💪";
  }
};

export const generateWorkoutAdvice = async (userData, language = 'pt') => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Return mock workout advice
    return mockResponses.workoutAdvice[language];
  } catch (error) {
    console.error('Error generating workout advice:', error);
    return language === 'pt'
      ? "Dicas de treino: Sempre aqueça antes, mantenha boa postura, progresse gradualmente e hidrate-se bem!"
      : "Workout tips: Always warm up first, maintain good posture, progress gradually and stay hydrated!";
  }
};
