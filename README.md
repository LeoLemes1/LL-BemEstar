# 🥗 ProEx - Plataforma de Nutrição e Bem-estar

Uma plataforma completa de nutrição e bem-estar baseada em React, com integração de IA, planos de refeições personalizados, rotinas de treino e acompanhamento de saúde em tempo real.

## ✨ Características

### 🤖 IA Integrada
- **Sistema de IA Simples**: Respostas inteligentes para planos nutricionais
- **Chat Interativo**: Interface de chat para consultas nutricionais
- **Recomendações Personalizadas**: Baseadas nos dados do usuário

### 📊 Acompanhamento de Saúde
- **Dashboard Completo**: Estatísticas e visualizações de progresso
- **Gráficos de Progresso**: Acompanhamento de peso e evolução calórica
- **Rastreamento de Macros**: Análise detalhada de macronutrientes
- **Planejamento de Refeições**: Sistema completo de gestão de refeições

### 🏋️ Sistema de Treinos
- **Treinos em Casa**: Rotinas sem equipamentos
- **Base de Exercícios**: Biblioteca extensa de exercícios
- **Treinos Gerados por IA**: Planos de treino personalizados
- **Acompanhamento de Progresso**: Histórico de treinos e conquistas

### 🍎 Base de Dados de Alimentos
- **Base Abrangente**: 20+ itens alimentares com dados nutricionais
- **Busca Inteligente**: Capacidades avançadas de filtragem e busca
- **Calculadora de Calorias**: Informações nutricionais precisas
- **Filtragem por Categoria**: Organizada por tipos de alimentos

### 🌐 Internacionalização
- **Suporte Multi-idioma**: Português e Inglês
- **Mudança de Idioma Dinâmica**: Alterações de idioma em tempo real
- **Conteúdo Localizado**: Todos os textos e elementos da UI traduzidos

### 🔐 Autenticação e Segurança
- **Autenticação Mock**: Gerenciamento seguro de usuários
- **Rotas Protegidas**: Controle de acesso para usuários autenticados
- **Perfis de Usuário**: Gestão abrangente de dados do usuário
- **Privacidade de Dados**: Manipulação e armazenamento seguros de dados

## ✨ Features

### 🤖 AI-Powered Nutrition
- **Gemini AI Integration**: Real AI responses for personalized nutrition plans
- **Smart Chat Interface**: Interactive AI chat for nutrition advice
- **Personalized Recommendations**: Based on user data and preferences

### 📊 Health Tracking
- **Dashboard Overview**: Quick stats and progress visualization
- **Progress Charts**: Weight and calorie evolution tracking
- **Macro Tracking**: Detailed macronutrient breakdown
- **Meal Planning**: Comprehensive meal management system

### 🏋️ Workout System
- **Home Workouts**: Equipment-free exercise routines
- **Exercise Database**: Extensive library of exercises
- **AI-Generated Workouts**: Personalized training plans
- **Progress Tracking**: Workout history and achievements

### 🍎 Food Database
- **Comprehensive Database**: 20+ food items with nutritional data
- **Smart Search**: Advanced filtering and search capabilities
- **Calorie Calculator**: Precise nutritional information
- **Category Filtering**: Organized by food types

### 🌐 Internationalization
- **Multi-language Support**: Portuguese and English
- **Dynamic Language Switching**: Real-time language changes
- **Localized Content**: All text and UI elements translated

### 🔐 Authentication & Security
- **Mock Authentication**: Secure user management
- **Protected Routes**: Access control for authenticated users
- **User Profiles**: Comprehensive user data management
- **Data Privacy**: Secure data handling and storage

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd proex
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Cabecalho.jsx   # Header component with navigation
│   └── ...
├── context/            # React Context providers
│   └── AuthContext.jsx # Authentication context
├── i18n/              # Internationalization
│   └── index.js       # i18n configuration
├── mock/              # Mock data files
│   ├── userMock.js    # User and nutrition data
│   ├── foodMock.js    # Food database
│   ├── exerciseMock.js # Exercise database
│   └── aiMock.js      # AI response templates
├── pages/             # Page components
│   ├── Dashboard.jsx  # Main dashboard
│   ├── AiChat.jsx     # AI nutrition chat
│   ├── MyPlan.jsx     # Nutrition plan management
│   ├── Workout.jsx    # Workout routines
│   ├── FoodCalories.jsx # Food database
│   ├── Profile.jsx    # User profile
│   ├── Progress.jsx   # Progress tracking
│   ├── AiTips.jsx     # AI motivational tips
│   ├── Settings.jsx   # User settings
│   ├── Help.jsx       # Help and FAQ
│   └── About.jsx      # About page
├── services/          # External services
│   └── geminiService.js # Gemini AI integration
└── assets/            # Static assets
    ├── logo.png
    └── ...
```

## 🛠️ Technologies Used

### Frontend
- **React 19** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Framer Motion** - Smooth animations
- **TailwindCSS** - Utility-first CSS framework
- **Chart.js** - Data visualization
- **React Icons** - Icon library

### AI & Data
- **Google Gemini AI** - AI-powered recommendations
- **React i18next** - Internationalization
- **React Toastify** - Toast notifications

### Development Tools
- **Vite** - Fast build tool
- **ESLint** - Code linting
- **Git** - Version control

## 🎯 Key Features Explained

### AI Nutrition Chat
- Real-time AI responses using Gemini API
- Personalized nutrition plans based on user data
- Interactive chat interface with history
- Fallback to mock data if API fails

### Dashboard
- Comprehensive overview of user progress
- Quick stats and metrics
- Interactive charts and visualizations
- Quick action buttons for common tasks

### My Plan
- Detailed nutrition plan management
- Macronutrient breakdown with charts
- Meal planning and tracking
- Progress monitoring

### Workout System
- AI-generated workout routines
- Exercise database with images and instructions
- Timer and progress tracking
- Difficulty levels and muscle targeting

### Food Database
- Searchable food database
- Nutritional information per 100g
- Category filtering and sorting
- Calorie and macro tracking

## 🔧 Configuration

### Environment Variables
```env
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
```

### Gemini AI Setup
1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to environment variables
3. The app will automatically use real AI responses

### Language Configuration
- Default language: Portuguese (pt)
- Supported languages: Portuguese, English
- Language switching: Real-time without page reload

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- **Desktop**: Full-featured experience
- **Tablet**: Optimized layout and navigation
- **Mobile**: Touch-friendly interface

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Smooth Animations**: Framer Motion animations
- **Color-coded Elements**: Intuitive visual hierarchy
- **Accessibility**: WCAG compliant design
- **Toast Notifications**: User feedback system

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] AI chat functionality
- [ ] Dashboard data display
- [ ] Navigation between pages
- [ ] Language switching
- [ ] Responsive design on different devices
- [ ] Toast notifications
- [ ] Form validations

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload `dist` folder to Netlify
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for intelligent recommendations
- **React Community** for excellent documentation
- **TailwindCSS** for beautiful styling
- **Chart.js** for data visualization
- **Framer Motion** for smooth animations

## 📞 Support

For support and questions:
- 📧 Email: contato@proex.com
- 📱 Phone: +55 (11) 99999-9999
- 🌐 Website: www.proex.com
- 📖 Documentation: Check the Help page in the app

## 🔮 Future Enhancements

- [ ] Real backend integration
- [ ] Social features and sharing
- [ ] Advanced analytics
- [ ] Mobile app development
- [ ] Integration with fitness trackers
- [ ] Meal delivery integration
- [ ] Community features
- [ ] Advanced AI features

---

**Made with ❤️ for better health and wellness**