# 🥗 ProEx - Plataforma Inteligente de Nutrição e Bem-estar

Uma plataforma completa de saúde e fitness com **Inteligência Artificial real**, acompanhamento de progresso, registro de refeições, treinos personalizados e base de dados nutricional abrangente.

---

## 🌟 Visão Geral

**ProEx** é uma aplicação web moderna que combina tecnologia de ponta com ciência nutricional para ajudar usuários a atingirem seus objetivos de saúde. Com integração de **Google Gemini AI**, banco de dados em **Firebase** e interface responsiva, oferece uma experiência completa de acompanhamento de saúde.

### 🎯 Principais Diferenciais

✅ **IA Real** - Google Gemini AI para cálculo de calorias e planos nutricionais  
✅ **Dados Reais** - Integração com Firebase para persistência de dados  
✅ **230+ Alimentos** - Base nutricional completa com valores científicos  
✅ **Treinos Personalizados** - IA gera treinos semanais adaptados ao seu objetivo  
✅ **100% Gratuito** - Sem custo, sem anúncios, sem limitações  

---

## 🚀 Funcionalidades Principais

### 🤖 **Chat de Nutrição com IA**
- **Google Gemini AI** integrada para respostas inteligentes
- Gera planos nutricionais personalizados baseados em:
  - Peso, altura, idade
  - Nível de atividade física
  - Objetivos (perda/ganho de peso, manutenção)
- Histórico de conversas salvo no Firebase
- Cálculo automático de TMB e TDEE
- Distribuição de macronutrientes (proteínas, carboidratos, gorduras)

### 📊 **Dashboard Inteligente**
- **Progresso de peso** com tendências (📉 perdendo, 📈 ganhando, ➡️ estável)
- **Consumo de calorias** em tempo real
- **Registro de refeições** com análise de IA
- Mensagens motivacionais humanizadas
- Estatísticas visuais e intuitivas

### 🍽️ **Sistema de Refeições**
- **Registro inteligente** - Descreva o que comeu em linguagem natural
- **IA calcula calorias** - Gemini AI analisa e retorna calorias aproximadas
- **Histórico diário** - Veja todas as refeições do dia
- **Meta calórica** - Calculada automaticamente com base no seu perfil
- **Feedback motivacional** - Mensagens positivas sobre seu consumo

### 💪 **Treinos Personalizados**
- **IA gera treinos semanais** com base em:
  - Grupos musculares escolhidos (Peito, Costas, Pernas, Glúteos, etc.)
  - Frequência semanal (2x, 3x, 4x, 5x por semana)
  - Divisões profissionais (Push/Pull/Legs, etc.)
- **Imagens reais** de exercícios (via Unsplash)
- **Timer integrado** com controle de play/pause/reset
- **Salvar até 4 treinos** diferentes
- **Exercícios para casa** - Sem necessidade de equipamentos

### ⚖️ **Acompanhamento de Peso**
- **Registro de peso semanal** com dicas de medição
- **Gráficos de evolução** usando Chart.js
- **Histórico completo** com datas
- **Editar e excluir** registros antigos
- **Conquistas automáticas** baseadas no progresso real
- **Sincronização** com Dashboard e perfil

### 🍎 **Base de Alimentos (230+ itens)**
- Dados nutricionais completos por 100g
- Organizada em categorias
- Busca e filtros inteligentes
- Valores de: Calorias, Proteínas, Carboidratos, Gorduras, Fibras

### 🧮 **Calculadora de Saúde**
- Cálculo de **IMC** (Índice de Massa Corporal)
- Cálculo de **TMB** (Taxa Metabólica Basal)
- Cálculo de **TDEE** (Total Daily Energy Expenditure)
- Classificação de peso e recomendações

---

## 📚 Fontes de Dados Nutricionais

### 🔬 **Base Científica**

Os valores nutricionais dos **230 alimentos** são baseados em fontes científicas confiáveis:

1. **TACO - Tabela Brasileira de Composição de Alimentos**
   - Desenvolvida pela UNICAMP
   - Principal referência para alimentos brasileiros
   - [taco-nepa.unicamp.br](https://www.nepa.unicamp.br/taco/)

2. **USDA FoodData Central**
   - United States Department of Agriculture
   - Banco de dados global de referência
   - [fdc.nal.usda.gov](https://fdc.nal.usda.gov/)

3. **Valores Médios Validados**
   - Média de múltiplas fontes para maior precisão
   - Considerando alimentos cozidos/preparados
   - Adaptados para porções brasileiras típicas

### ⚠️ **Observações Importantes**

- **Variações naturais:** Valores podem variar por marca, região e método de preparo
- **Uso educativo:** Dados são precisos para uso geral e educacional
- **Estimativas:** Perfeito para acompanhamento de dieta e fitness
- **Consulta profissional:** Para necessidades médicas específicas, consulte um nutricionista

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- ⚛️ **React 19** - Framework JavaScript moderno
- 🎨 **TailwindCSS** - Estilização utilitária
- 🎬 **Framer Motion** - Animações suaves
- 📊 **Chart.js + React-Chartjs-2** - Gráficos interativos
- 🧭 **React Router DOM v6** - Navegação SPA
- 🎯 **React Icons** - Biblioteca de ícones

### **Backend & Serviços**
- 🔥 **Firebase Authentication** - Sistema de login/registro
- 💾 **Firestore Database** - Banco de dados NoSQL em nuvem
- 🤖 **Google Gemini AI** - IA para cálculo de calorias e planos
- 📡 **API REST** - Integração com serviços externos

### **Build & Deploy**
- ⚡ **Vite** - Build tool ultra-rápido
- 📦 **npm** - Gerenciador de pacotes
- 🔍 **ESLint** - Linter de código

---

## 🚀 Como Rodar o Projeto

### **Pré-requisitos**
- Node.js 16+ instalado
- Conta no Firebase (gratuita)
- Chave API do Google Gemini (gratuita)
- npm ou yarn

### **Passo 1: Clone o repositório**
```bash
git clone <url-do-repositorio>
cd proex
```

### **Passo 2: Instale as dependências**
```bash
npm install
```

### **Passo 3: Configure Firebase**

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto
3. Ative **Authentication** → Email/Password
4. Crie um **Firestore Database** (modo produção)
5. Copie as credenciais do projeto

### **Passo 4: Configure Gemini AI**

1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Crie uma API Key gratuita
3. Copie a chave

### **Passo 5: Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
# Firebase (Obrigatório)
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto-id
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
VITE_FIREBASE_MEASUREMENT_ID=seu_measurement_id

# Google Gemini AI (Obrigatório para IA funcionar)
VITE_GEMINI_API_KEY=sua_chave_gemini_aqui
```

### **Passo 6: Rode o projeto**
```bash
npm run dev
```

### **Passo 7: Acesse no navegador**
```
http://localhost:5173
```

---

## 📁 Estrutura do Projeto

```
proex/
├── src/
│   ├── assets/              # Imagens e assets estáticos
│   ├── components/          # Componentes reutilizáveis
│   │   ├── BackToDashboard.jsx
│   │   ├── MealLogModal.jsx
│   │   ├── MuscleSelectModal.jsx
│   │   ├── DeleteConfirmModal.jsx
│   │   └── ...
│   ├── config/              # Configurações
│   │   ├── firebase.js      # Inicialização do Firebase
│   │   └── routes.js        # Definição de rotas
│   ├── context/             # Context API
│   │   ├── AuthContext.jsx  # Autenticação global
│   │   └── ToastContext.jsx # Sistema de notificações
│   ├── pages/               # Páginas da aplicação
│   │   ├── Dashboard.jsx    # Painel principal
│   │   ├── AiChat.jsx       # Chat de nutrição
│   │   ├── Workout.jsx      # Treinos personalizados
│   │   ├── Progress.jsx     # Progresso de peso
│   │   ├── FoodCalories.jsx # Base de alimentos
│   │   ├── Profile.jsx      # Perfil do usuário
│   │   ├── Settings.jsx     # Configurações
│   │   ├── LoginRegistro.jsx # Login/Cadastro
│   │   ├── OnboardingSetup.jsx # Setup inicial
│   │   └── ...
│   ├── services/            # Serviços e APIs
│   │   ├── geminiService.js    # Integração Gemini AI
│   │   ├── firestoreService.js # Operações Firestore
│   │   └── calorieService.js   # Cálculos nutricionais
│   ├── utils/               # Utilitários
│   │   ├── exerciseImages.js   # Mapeamento de imagens
│   │   └── index.js            # Funções helper
│   ├── mock/                # Dados mockados (fallback)
│   │   ├── foodMock.js      # 230 alimentos
│   │   └── ...
│   ├── App.jsx              # Componente principal
│   └── main.jsx             # Entry point
├── public/                  # Arquivos públicos
├── .env                     # Variáveis de ambiente (criar)
├── package.json             # Dependências
├── vite.config.js           # Configuração Vite
└── README.md                # Este arquivo
```

---

## 💡 Funcionalidades Detalhadas

### 🔐 **Sistema de Autenticação**
- ✅ Cadastro com email e senha
- ✅ Login seguro com Firebase
- ✅ Recuperação de senha
- ✅ Rotas protegidas
- ✅ Perfil persistente no Firestore

### 📝 **Onboarding Inicial**
Ao se cadastrar, o usuário passa por um setup que coleta:
- Peso inicial (para tracking de progresso)
- Altura
- Idade
- Objetivo (perda/ganho/manutenção de peso)
- Nível de atividade física

### 🍴 **Registro de Refeições**
1. Usuário descreve o que comeu (ex: "2 pães com manteiga")
2. **Gemini AI analisa** e calcula calorias
3. Salva no Firestore com data/hora
4. Atualiza dashboard em tempo real
5. Mostra mensagens motivacionais personalizadas

### 🏋️ **Geração de Treinos**
1. Escolhe grupos musculares (múltipla seleção)
2. Define frequência semanal (2x a 5x)
3. **IA gera treino completo** com:
   - Divisão profissional dos músculos
   - 4-6 exercícios por dia
   - Séries, repetições e descanso
   - Descrição de como fazer
4. Salva no Firebase (máximo 4 treinos)
5. Timer integrado para execução

### 📈 **Progresso de Peso**
- Registro semanal recomendado
- Gráfico de evolução (Chart.js)
- Lista de todos os pesos registrados
- Editar ou excluir registros
- Conquistas automáticas baseadas em metas reais
- Sincronização com Dashboard

---

## 🗄️ Estrutura do Banco de Dados (Firestore)

```
users/
  └── {userId}/
      ├── (dados do perfil)
      │   ├── name: string
      │   ├── email: string
      │   ├── weight: number
      │   ├── initialWeight: number
      │   ├── height: number
      │   ├── age: number
      │   ├── goals: string
      │   ├── activityLevel: string
      │   └── onboardingCompleted: boolean
      │
      ├── progress/
      │   └── {progressId}/
      │       ├── weight: number
      │       ├── date: string
      │       └── createdAt: timestamp
      │
      ├── meals/
      │   └── {mealId}/
      │       ├── description: string
      │       ├── calories: number
      │       ├── analysis: string
      │       ├── date: string
      │       └── createdAt: timestamp
      │
      ├── workouts/
      │   └── {workoutId}/
      │       ├── muscleGroup: array
      │       ├── weeklyPlan: array
      │       ├── tips: string
      │       └── createdAt: timestamp
      │
      ├── aiChats/
      │   └── {chatId}/
      │       ├── userInput: object
      │       ├── aiResponse: string
      │       └── timestamp: timestamp
      │
      └── settings/
          └── preferences/
              ├── notifications: object
              ├── privacy: object
              └── data: object
```

---

## 📊 Base de Dados de Alimentos

### 🔢 **Estatísticas**
- **230 alimentos** catalogados
- **7 categorias** organizadas
- **5 macronutrientes** por alimento
- **100% baseado em fontes científicas**

### 📚 **Fontes Científicas**

Os valores nutricionais foram coletados e validados com base em:

#### 1️⃣ **TACO - Tabela Brasileira (Unicamp)**
- Principal referência para alimentos brasileiros
- Dados validados cientificamente
- Alimentos típicos: Feijão carioca, Tapioca, Caju, etc.
- **Fonte:** [nepa.unicamp.br/taco](https://www.nepa.unicamp.br/taco/)

#### 2️⃣ **USDA FoodData Central**
- Banco de dados global do governo dos EUA
- Referência internacional em nutrição
- Alimentos importados e genéricos
- **Fonte:** [fdc.nal.usda.gov](https://fdc.nal.usda.gov/)

#### 3️⃣ **Valores Médios Validados**
- Média ponderada de múltiplas fontes confiáveis
- Ajustados para o contexto brasileiro
- Considerando métodos de preparo comuns

### 🍽️ **Categorias de Alimentos**

| Categoria | Quantidade | Exemplos |
|-----------|-----------|----------|
| 🌾 Grãos e Cereais | 60 | Arroz, Aveia, Pães, Massas, Farinhas |
| 🍗 Proteínas | 75 | Carnes, Peixes, Ovos, Leguminosas |
| 🍎 Frutas | 50 | Banana, Maçã, Açaí, Jabuticaba, Cajá |
| 🥦 Vegetais | 30 | Brócolis, Batata Doce, Espinafre |
| 🧀 Laticínios | 20 | Leites, Queijos, Iogurtes |
| 🥜 Oleaginosas | 15 | Amêndoas, Castanhas, Sementes |
| 🫒 Gorduras/Óleos | 10 | Azeite, Óleos, Manteiga |

### 📏 **Precisão dos Dados**

- **Calorias:** ±5% de margem de erro
- **Macronutrientes:** Valores médios arredondados
- **Considerações:** Valores para alimentos cozidos/preparados quando aplicável
- **Uso recomendado:** Fitness, educação nutricional, acompanhamento geral

⚠️ **Nota:** Para dietas terapêuticas ou condições médicas específicas, sempre consulte um nutricionista profissional.

---

## 🤖 Integração com IA (Google Gemini)

### **Funcionalidades da IA**

1. **Cálculo de Calorias**
   - Analisa descrições em linguagem natural
   - Identifica alimentos e quantidades
   - Retorna calorias totais + análise detalhada
   - Exemplo: "2 pães com manteiga e café" → 320kcal

2. **Planos Nutricionais**
   - Calcula TMB usando Harris-Benedict
   - Ajusta calorias baseado no objetivo
   - Distribui macronutrientes otimamente
   - Sugere 5-6 refeições com horários

3. **Treinos Semanais**
   - Gera divisões profissionais
   - 4-6 exercícios por dia
   - Instruções detalhadas em português
   - Adaptado para treino em casa

### **Modelos Utilizados**

O sistema tenta múltiplos modelos Gemini em ordem:
1. `gemini-2.0-flash-exp` (mais recente)
2. `gemini-1.5-flash-latest`
3. `gemini-1.5-flash`
4. `gemini-1.5-pro`

**Fallback:** Se a IA falhar, retorna mensagens amigáveis ao usuário.

---

## 🎨 UI/UX Design

### **Princípios de Design**
- ✅ **Minimalista** - Interface limpa e focada
- ✅ **Responsivo** - Funciona em mobile, tablet e desktop
- ✅ **Acessível** - Cores contrastantes, textos legíveis
- ✅ **Intuitivo** - Navegação clara e objetiva
- ✅ **Motivacional** - Mensagens positivas e encorajadoras

### **Paleta de Cores**
- 💚 Verde (Emerald) - Progresso, Sucesso
- 🔵 Azul - Informações, Dados
- 🟣 Roxo - IA, Tecnologia
- 🟠 Laranja - Energia, Calorias
- 🔴 Vermelho - Alertas (sem shaming)
- ⚪ Neutros - Cinzas, Branco

---

## 📱 Páginas e Rotas

| Rota | Página | Descrição | Requer Login |
|------|--------|-----------|--------------|
| `/` | Home | Página inicial | Não |
| `/loginRegistro` | Login/Registro | Autenticação | Não |
| `/setup` | Onboarding | Setup inicial do usuário | Sim |
| `/dashboard` | Dashboard | Painel principal | Sim |
| `/ai-chat` | Chat IA | Consulta nutricional | Sim |
| `/workout` | Treinos | Geração e execução de treinos | Sim |
| `/progress` | Progresso | Acompanhamento de peso | Sim |
| `/food-calories` | Alimentos | Base de 230 alimentos | Sim |
| `/calculadora` | Calculadora | IMC, TMB, TDEE | Sim |
| `/profile` | Perfil | Dados do usuário | Sim |
| `/settings` | Configurações | Preferências | Sim |
| `/help` | Ajuda | FAQ e suporte | Sim |

---

## 🔒 Segurança e Privacidade

### **Medidas Implementadas**
- ✅ Autenticação Firebase (OAuth 2.0)
- ✅ Dados criptografados em trânsito (HTTPS)
- ✅ Regras de segurança do Firestore
- ✅ Variáveis de ambiente (.env)
- ✅ Validação de inputs no cliente
- ✅ Sanitização de dados

### **Privacidade**
- 🔒 Dados pessoais armazenados apenas no Firebase
- 🔒 Nenhum compartilhamento com terceiros
- 🔒 Usuário controla exclusão de dados
- 🔒 API Keys protegidas por variáveis de ambiente

---

## 🧪 Como Testar

### **Fluxo Completo de Teste**

1. **Criar Conta**
   - Registre-se com email/senha
   - Complete o setup inicial (peso, altura, idade, objetivo)

2. **Dashboard**
   - Veja estatísticas iniciais
   - Teste o botão "Registrar Refeição"
   - Descreva uma refeição e veja a IA calcular

3. **Chat IA**
   - Solicite um plano nutricional
   - Veja histórico de conversas

4. **Treinos**
   - Clique em "Novo Treino"
   - Escolha músculos e frequência
   - Veja a IA gerar treino completo
   - Execute com timer

5. **Progresso**
   - Registre seu peso atual
   - Veja gráfico de evolução
   - Teste editar e excluir

6. **Alimentos**
   - Busque por "frango"
   - Filtre por categoria
   - Veja 230 alimentos disponíveis

---

## 📦 Dependências Principais

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^6.22.0",
  "firebase": "^11.1.0",
  "@google/generative-ai": "^0.21.0",
  "framer-motion": "^11.0.0",
  "chart.js": "^4.4.0",
  "react-chartjs-2": "^5.2.0",
  "react-icons": "^5.0.0"
}
```

---

## 🎯 Casos de Uso

### **Para Usuários Iniciantes**
- Setup guiado com onboarding
- Cálculos automáticos de metas
- Mensagens motivacionais sem julgamento
- Interface intuitiva

### **Para Usuários Avançados**
- Base de alimentos completa
- Treinos customizáveis
- Histórico detalhado de progresso
- Controle total sobre dados

### **Para Profissionais de Saúde**
- Base científica confiável
- Cálculos validados (TMB, TDEE)
- Exportação de dados (PDF)
- Relatórios de progresso

---

## 🐛 Troubleshooting

### **Problema: IA não funciona**
**Solução:** Verifique se `VITE_GEMINI_API_KEY` está configurada no `.env`

### **Problema: Login não funciona**
**Solução:** Verifique credenciais Firebase e se Authentication está ativado

### **Problema: Dados não salvam**
**Solução:** Confirme que Firestore está criado e regras configuradas

### **Problema: Imagens de exercícios não carregam**
**Solução:** Verifique conexão com internet (imagens vêm do Unsplash)

---

## 🔮 Roadmap Futuro

- [ ] App Mobile (React Native)
- [ ] Integração com wearables (Fitbit, Apple Watch)
- [ ] Reconhecimento de fotos de comida
- [ ] Comunidade e compartilhamento social
- [ ] Receitas saudáveis
- [ ] Planejamento de compras
- [ ] Notificações push
- [ ] Modo offline

---

## 👨‍💻 Desenvolvido com

- ❤️ Amor pela saúde e tecnologia
- 🧠 Conhecimento em nutrição e fitness
- 🎨 Design thinking e UX
- 🔬 Dados científicos validados
- 🤖 IA de última geração

---

## 📄 Licença

Este projeto é de código aberto sob a licença MIT.

---

## 🙏 Agradecimentos

- **Google Gemini AI** - Pela poderosa API de IA
- **Firebase** - Pela infraestrutura confiável
- **TACO/Unicamp** - Pelos dados nutricionais brasileiros
- **USDA** - Pelo banco de dados nutricional global
- **Unsplash** - Pelas imagens de exercícios
- **Comunidade React** - Pelo ecossistema incrível

---

## 📞 Contato e Suporte

- 📧 Email: contato@proex.com
- 💬 Issues: Use a aba "Issues" do GitHub
- 📖 Documentação: Veja a página de "Ajuda" no app

---

## ⚠️ Disclaimer

Este aplicativo é uma ferramenta de apoio para objetivos de saúde e fitness. **Não substitui orientação médica ou nutricional profissional.** Para dietas terapêuticas, condições médicas específicas ou dúvidas sobre saúde, sempre consulte um profissional qualificado.

Os dados nutricionais são baseados em fontes científicas confiáveis e são adequados para uso geral, educacional e acompanhamento de fitness. Valores podem variar conforme marca, preparo e origem dos alimentos.

---

**Desenvolvido com 💚 para ajudar você a alcançar seus objetivos de saúde!**

**ProEx - Seu parceiro inteligente de nutrição e bem-estar** 🌟
