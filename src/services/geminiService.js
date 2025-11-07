// AI service using Gemini API
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

export const generateNutritionPlan = async (userData, language = 'pt') => {
  try {
    if (!API_KEY || API_KEY === 'your-gemini-api-key-here' || API_KEY.length < 20) {
      throw new Error('API key do Gemini não configurada');
    }
    
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `Você é um nutricionista especializado brasileiro. Crie um plano nutricional COMPLETO e PERSONALIZADO.

DADOS DO USUÁRIO:
- Peso: ${userData.weight}kg
- Altura: ${userData.height}cm
- Idade: ${userData.age} anos
- Objetivo: ${getGoalLabel(userData.goals)}
- Nível de Atividade: ${getActivityLabel(userData.activityLevel)}
${userData.foodPreferences ? `- Preferências: ${userData.foodPreferences}` : ''}

INSTRUÇÕES:
1. Calcule a TMB (Taxa Metabólica Basal) usando Harris-Benedict
2. Calcule o TDEE (Total Daily Energy Expenditure) baseado na atividade
3. Ajuste as calorias baseado no objetivo
4. Forneça distribuição de macronutrientes (proteína, carboidrato, gordura)
5. Sugira 5-6 refeições com horários
6. Dê dicas práticas e motivacionais
7. Seja detalhado, prático e motivador!

FORMATO DA RESPOSTA (em português brasileiro):

**Calorias Diárias Recomendadas: X kcal**

**Distribuição de Macronutrientes:**
• Proteínas: Xg (X% - X kcal)
• Carboidratos: Xg (X% - X kcal)
• Gorduras: Xg (X% - X kcal)

**Plano de Refeições:**
[Sugira 5-6 refeições com horários e exemplos de alimentos]

**Recomendações Específicas:**
[Dicas personalizadas baseadas no objetivo e preferências]

**Dicas Importantes:**
[Conselhos práticos e motivacionais]

Seja detalhado, profissional mas amigável!`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
    
  } catch (error) {
    console.error('❌ Erro ao gerar plano nutricional:', error.message);
    throw new Error('Ops! A IA teve um probleminha. Tenta de novo? 😅');
  }
};

// Funções auxiliares para labels
const getGoalLabel = (goal) => {
  const labels = {
    weight_loss: 'Perda de Peso',
    weight_gain: 'Ganho de Peso',
    maintenance: 'Manutenção de Peso',
    muscle_gain: 'Ganho de Massa Muscular'
  };
  return labels[goal] || 'Manutenção';
};

const getActivityLabel = (level) => {
  const labels = {
    sedentary: 'Sedentário (pouco ou nenhum exercício)',
    light: 'Levemente Ativo (1-3 dias/semana)',
    moderate: 'Moderadamente Ativo (3-5 dias/semana)',
    active: 'Muito Ativo (6-7 dias/semana)',
    very_active: 'Extremamente Ativo (exercício intenso diário)'
  };
  return labels[level] || 'Moderadamente Ativo';
};

export const generateMotivationalTip = async (language = 'pt') => {
  try {
    if (!API_KEY || API_KEY === 'your-gemini-api-key-here' || API_KEY.length < 20) {
      // Retorna dica padrão se não tiver API
      return language === 'pt'
        ? "Lembre-se: cada pequena escolha saudável é um passo em direção ao seu objetivo! 💪"
        : "Remember: every small healthy choice is a step towards your goal! 💪";
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = language === 'pt'
      ? `Você é um coach motivacional de saúde e bem-estar. 
         Gere UMA dica motivacional CURTA (máximo 2 linhas) para alguém em uma jornada de saúde.
         Seja inspirador, positivo e use um emoji relevante no final.
         Responda APENAS a dica, sem introdução.`
      : `You are a motivational health and wellness coach.
         Generate ONE SHORT motivational tip (max 2 lines) for someone on a health journey.
         Be inspiring, positive and use a relevant emoji at the end.
         Answer ONLY with the tip, no introduction.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
    
  } catch (error) {
    console.error('Error generating motivational tip:', error);
    return language === 'pt'
      ? "Lembre-se: cada pequena escolha saudável é um passo em direção ao seu objetivo! 💪"
      : "Remember: every small healthy choice is a step towards your goal! 💪";
  }
};

export const generateWorkoutAdvice = async (userData, language = 'pt') => {
  try {
    if (!API_KEY || API_KEY === 'your-gemini-api-key-here' || API_KEY.length < 20) {
      return language === 'pt'
        ? "Dicas de treino: Sempre aqueça antes, mantenha boa postura, progresse gradualmente e hidrate-se bem!"
        : "Workout tips: Always warm up first, maintain good posture, progress gradually and stay hydrated!";
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = language === 'pt'
      ? `Você é um personal trainer especializado em treinos em casa.
         Dê dicas de treino práticas e motivacionais para alguém que treina em casa.
         Seja breve, prático e motivador!`
      : `You are a personal trainer specialized in home workouts.
         Give practical and motivational workout tips for someone training at home.
         Be brief, practical and motivating!`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
    
  } catch (error) {
    console.error('Error generating workout advice:', error);
    return language === 'pt'
      ? "Dicas de treino: Sempre aqueça antes, mantenha boa postura, progresse gradualmente e hidrate-se bem!"
      : "Workout tips: Always warm up first, maintain good posture, progress gradually and stay hydrated!";
  }
};

// Gera treino semanal com IA baseado no músculo escolhido
export const generateWeeklyWorkout = async (muscleGroup, userData, frequency = 3) => {
  try {
    if (!API_KEY || API_KEY === 'your-gemini-api-key-here' || API_KEY.length < 20) {
      throw new Error('API key do Gemini não configurada');
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const muscleLabels = {
      peito: 'Peito',
      costas: 'Costas',
      pernas: 'Pernas',
      gluteos: 'Glúteos',
      ombros: 'Ombros',
      braços: 'Braços',
      abdomen: 'Abdômen',
      corpo_todo: 'Corpo Todo'
    };

    // Suporta múltiplos músculos
    const musclesArray = Array.isArray(muscleGroup) ? muscleGroup : [muscleGroup];
    const musclesText = musclesArray.map(m => muscleLabels[m] || m).join(', ');

    const prompt = `Você é um personal trainer especializado. Crie um TREINO SEMANAL INTELIGENTE.

MÚSCULOS SELECIONADOS: ${musclesText}
FREQUÊNCIA: ${frequency} treinos por semana

REGRAS DE DIVISÃO (MUITO IMPORTANTE! MÁXIMO 3-4 MÚSCULOS POR DIA!):
${frequency === 2 ? `
- Dia 1: Peito + Ombros + Tríceps (3 músculos)
- Dia 2: Costas + Pernas + Bíceps (3 músculos)
` : frequency === 3 ? `
- Dia 1: Peito + Ombros (2 músculos)
- Dia 2: Costas + Bíceps (2 músculos)
- Dia 3: Pernas + Glúteos + Abdômen (3 músculos)
` : frequency === 4 ? `
- Dia 1: Peito + Tríceps (2 músculos)
- Dia 2: Costas + Bíceps (2 músculos)
- Dia 3: Pernas + Glúteos (2 músculos)
- Dia 4: Ombros + Abdômen (2 músculos)
` : `
- Dia 1: Peito (1 músculo)
- Dia 2: Costas (1 músculo)
- Dia 3: Pernas (1 músculo)
- Dia 4: Ombros + Tríceps (2 músculos)
- Dia 5: Glúteos + Bíceps (2 músculos)
`}

DADOS DO USUÁRIO:
${userData?.weight ? `- Peso: ${userData.weight}kg` : ''}
${userData?.age ? `- Idade: ${userData.age} anos` : ''}
${userData?.activityLevel ? `- Nível: ${getActivityLabel(userData.activityLevel)}` : ''}

INSTRUÇÕES CRÍTICAS:
1. Crie EXATAMENTE ${frequency} dias de treino
2. Use a DIVISÃO ACIMA - não invente outra!
3. MÁXIMO 3-4 GRUPOS MUSCULARES POR DIA (muito importante!)
4. Cada dia: 4-6 exercícios DIFERENTES
5. PRIORIZE os músculos selecionados: ${musclesText}
6. Se o músculo NÃO foi selecionado, pode incluir mas como SECUNDÁRIO
7. Exercícios APENAS para casa (peso corporal, cadeira, garrafa de água)
8. Varie os exercícios - sem repetir o mesmo exercício em dias diferentes
9. Use nomes simples em português: "Flexão", "Agachamento", "Prancha"
10. NO CAMPO "muscles" de cada exercício, liste APENAS 2-3 músculos principais trabalhados

RESPONDA EM JSON (sem markdown):
{
  "weeklyPlan": [
    {
      "day": "Segunda",
      "exercises": [
        {
          "name": "Nome do Exercício",
          "reps": "12-15",
          "sets": "3",
          "rest": "60s",
          "description": "Como fazer",
          "muscles": ["músculo1", "músculo2"]
        }
      ]
    }
  ],
  "tips": "Dica motivacional do treino"
}

Use nomes de exercícios comuns em português brasileiro!`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    // Limpa markdown
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Parse JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Formato inválido');
    }
    
    const data = JSON.parse(jsonMatch[0]);
    return data;
    
  } catch (error) {
    console.error('Error generating weekly workout:', error);
    
    // Erro 429 - Muitas requisições
    if (error.message && error.message.includes('429')) {
      throw new Error('⏰ Você usou muito a IA hoje! Aguarde alguns minutos e tenta de novo. Ou use "Corpo Todo" que é mais simples! 😊');
    }
    
    throw new Error('Ops! Não consegui gerar o treino. Tenta de novo? 😅');
  }
};

// Calcula calorias de uma refeição usando IA do Gemini
export const calculateCaloriesWithAI = async (mealDescription) => {
  try {
    // Verifica se tem API key válida
    if (!API_KEY || API_KEY === 'your-gemini-api-key-here' || API_KEY.length < 20) {
      throw new Error('API key do Gemini não configurada. Configure no arquivo .env');
    }
    
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `Você é um nutricionista especializado brasileiro. Analise esta descrição de refeição e calcule as calorias totais.

REFEIÇÃO: "${mealDescription}"

INSTRUÇÕES:
- Identifique TODOS os alimentos mencionados
- Considere as QUANTIDADES mencionadas (ex: "2 pães" = 2 unidades)
- Se não tiver quantidade, assuma porção padrão
- Seja GENEROSO e realista nas estimativas
- Conhecimento brasileiro: "pão" = pão francês, "viena" = salsicha viena, "tang" = suco em pó, etc

RESPONDA APENAS COM ESTE JSON (sem markdown, sem explicações):
{
  "calories": número_inteiro_total,
  "analysis": "Descrição detalhada dos itens e cálculo"
}

EXEMPLO:
"2 pães com manteiga" → {"calories": 320, "analysis": "2 pães francês (150 kcal cada) + manteiga (20 kcal)"}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Limpa a resposta (remove markdown se tiver)
    let cleanText = text.trim();
    cleanText = cleanText.replace(/```json\n?/g, '');
    cleanText = cleanText.replace(/```\n?/g, '');
    cleanText = cleanText.trim();
    
    // Parse JSON
    const jsonMatch = cleanText.match(/\{[\s\S]*?\}/);
    if (!jsonMatch) {
      throw new Error('Não entendi muito bem. Pode descrever os alimentos de forma mais clara? 😊');
    }
    
    const data = JSON.parse(jsonMatch[0]);
    
    if (!data.calories || data.calories <= 0) {
      throw new Error('Hmm, não consegui identificar alimentos nessa descrição. Tenta de novo? 🤔');
    }
    
    return {
      calories: Math.round(data.calories),
      analysis: data.analysis || 'Calculado pela IA Gemini'
    };
    
  } catch (error) {
    console.error('❌ Erro ao usar Gemini AI:', error.message);
    // Se for erro de parse ou validação, mantém a mensagem amigável
    if (error.message.includes('Não entendi') || error.message.includes('Hmm')) {
      throw error;
    }
    // Outros erros técnicos vira mensagem amigável
    throw new Error('Nossa IA deu uma bugada aqui. Tenta descrever de novo? 😅');
  }
};

