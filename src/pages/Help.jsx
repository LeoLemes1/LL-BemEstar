import { useState } from 'react';
import BackToDashboard from '../components/BackToDashboard';
import { motion } from 'framer-motion';
import { 
  FaQuestionCircle, 
  FaSearch, 
  FaChevronDown, 
  FaChevronUp,
  FaEnvelope,
  FaPhone,
  FaComments,
  FaBook,
  FaVideo,
  FaDownload,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqCategories = [
    {
      id: 'getting-started',
      title: 'Primeiros Passos',
      icon: FaBook,
      color: 'bg-blue-500'
    },
    {
      id: 'nutrition',
      title: 'Nutrição',
      icon: FaBook,
      color: 'bg-green-500'
    },
    {
      id: 'workout',
      title: 'Exercícios',
      icon: FaBook,
      color: 'bg-orange-500'
    },
    {
      id: 'ai-features',
      title: 'Recursos de IA',
      icon: FaBook,
      color: 'bg-purple-500'
    },
    {
      id: 'technical',
      title: 'Técnico',
      icon: FaBook,
      color: 'bg-gray-500'
    }
  ];

  const faqData = [
    {
      id: 1,
      category: 'getting-started',
      question: 'Como começar a usar a plataforma?',
      answer: 'Para começar, crie uma conta gratuita, complete seu perfil com informações básicas como peso, altura e objetivos, e explore o Chat de IA para receber seu primeiro plano nutricional personalizado.'
    },
    {
      id: 2,
      category: 'getting-started',
      question: 'É necessário pagar para usar a plataforma?',
      answer: 'Não! A plataforma é completamente gratuita. Todos os recursos, incluindo o Chat de IA, planos nutricionais e treinos, estão disponíveis sem custo.'
    },
    {
      id: 3,
      category: 'nutrition',
      question: 'Como funciona o Chat de IA para nutrição?',
      answer: 'O Chat de IA analisa seus dados pessoais (peso, altura, idade, objetivos) e gera um plano nutricional personalizado com calorias diárias, distribuição de macronutrientes e recomendações específicas.'
    },
    {
      id: 4,
      category: 'nutrition',
      question: 'As recomendações são baseadas em evidências científicas?',
      answer: 'Sim! Nossas recomendações seguem diretrizes da OMS, NIH e Harvard. Usamos métodos como Harris-Benedict e Mifflin-St Jeor para cálculos de gasto energético.'
    },
    {
      id: 5,
      category: 'workout',
      question: 'Posso fazer os treinos em casa?',
      answer: 'Absolutamente! Todos os exercícios são projetados para serem feitos em casa, sem necessidade de equipamentos especiais. Incluímos exercícios de peso corporal, alongamento e cardio.'
    },
    {
      id: 6,
      category: 'workout',
      question: 'Como funciona o gerador de treinos?',
      answer: 'O gerador cria treinos personalizados baseados no seu nível de atividade e objetivos. Você pode gerar novos treinos a qualquer momento e acompanhar seu progresso.'
    },
    {
      id: 7,
      category: 'ai-features',
      question: 'A IA é realmente inteligente?',
      answer: 'Sim! Usamos a tecnologia Gemini da Google para fornecer respostas inteligentes e personalizadas. A IA aprende com seus dados para oferecer recomendações cada vez mais precisas.'
    },
    {
      id: 8,
      category: 'ai-features',
      question: 'Posso confiar nas dicas da IA?',
      answer: 'As dicas da IA são baseadas em conhecimento nutricional e de fitness amplamente aceito. No entanto, sempre consulte um profissional de saúde para questões específicas.'
    },
    {
      id: 9,
      category: 'technical',
      question: 'Meus dados estão seguros?',
      answer: 'Sim! Implementamos medidas de segurança rigorosas para proteger seus dados pessoais. Não compartilhamos informações com terceiros sem seu consentimento.'
    },
    {
      id: 10,
      category: 'technical',
      question: 'A plataforma funciona em dispositivos móveis?',
      answer: 'Sim! A plataforma é totalmente responsiva e funciona perfeitamente em smartphones, tablets e desktops.'
    }
  ];

  const filteredFaq = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      toast.info('Digite um termo para buscar');
      return;
    }
    
    if (filteredFaq.length === 0) {
      toast.error('Nenhum resultado encontrado');
    } else {
      toast.success(`${filteredFaq.length} resultado(s) encontrado(s)`);
    }
  };

  const contactMethods = [
    {
      icon: FaEnvelope,
      title: 'Email',
      description: 'Envie suas dúvidas por email',
      action: 'contato@proex.com',
      color: 'bg-blue-500'
    },
    {
      icon: FaPhone,
      title: 'Telefone',
      description: 'Fale conosco diretamente',
      action: '+55 (11) 99999-9999',
      color: 'bg-green-500'
    },
    {
      icon: FaComments,
      title: 'Chat Online',
      description: 'Suporte em tempo real',
      action: 'Iniciar Chat',
      color: 'bg-purple-500'
    }
  ];

  const resources = [
    {
      title: 'Guia de Início Rápido',
      description: 'Aprenda a usar a plataforma em 5 minutos',
      icon: FaBook,
      type: 'guide'
    },
    {
      title: 'Tutorial em Vídeo',
      description: 'Assista ao tutorial completo',
      icon: FaVideo,
      type: 'video'
    },
    {
      title: 'Manual do Usuário',
      description: 'Documentação completa da plataforma',
      icon: FaDownload,
      type: 'download'
    },
    {
      title: 'Base de Conhecimento',
      description: 'Artigos e tutoriais detalhados',
      icon: FaExternalLinkAlt,
      type: 'external'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-blue-800 mb-2 flex items-center">
                <FaQuestionCircle className="mr-3" />
                Ajuda
              </h1>
              <p className="text-gray-600">
                Encontre respostas para suas dúvidas e aprenda a usar a plataforma
              </p>
            </div>
            <BackToDashboard />
          </div>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar ajuda..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Buscar
            </button>
          </form>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Perguntas Frequentes
              </h2>
              
              <div className="space-y-4">
                {filteredFaq.map((faq) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                    >
                      <span className="font-medium text-gray-800">{faq.question}</span>
                      {expandedFaq === faq.id ? (
                        <FaChevronUp className="text-gray-400" />
                      ) : (
                        <FaChevronDown className="text-gray-400" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 pb-4"
                      >
                        <p className="text-gray-600">{faq.answer}</p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Contatar Suporte
              </h3>
              <div className="space-y-3">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className={`${method.color} text-white p-2 rounded-lg mr-3`}>
                      <method.icon />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{method.title}</div>
                      <div className="text-sm text-gray-600">{method.description}</div>
                      <div className="text-sm text-blue-600 font-medium">{method.action}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Recursos Úteis
              </h3>
              <div className="space-y-3">
                {resources.map((resource, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <resource.icon className="text-gray-600 mr-3" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{resource.title}</div>
                      <div className="text-sm text-gray-600">{resource.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Dicas Rápidas
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-800 mb-1">💡 Busca Inteligente</div>
                  <div className="text-sm text-blue-600">
                    Use palavras-chave para encontrar respostas rapidamente
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-medium text-green-800 mb-1">🎯 Objetivos Claros</div>
                  <div className="text-sm text-green-600">
                    Defina objetivos específicos para melhores resultados
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="font-medium text-purple-800 mb-1">📊 Acompanhe Progresso</div>
                  <div className="text-sm text-purple-600">
                    Registre seus dados regularmente para acompanhar evolução
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 mt-8"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Categorias de Ajuda
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {faqCategories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.05 }}
                className={`${category.color} text-white p-4 rounded-lg cursor-pointer`}
              >
                <category.icon className="text-2xl mb-2" />
                <h4 className="font-bold">{category.title}</h4>
                <p className="text-sm opacity-90">
                  {faqData.filter(faq => faq.category === category.id).length} perguntas
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
