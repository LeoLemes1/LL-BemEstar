import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaHeart, 
  FaFlask, 
  FaUsers, 
  FaAward, 
  FaShieldAlt, 
  FaLightbulb,
  FaChartLine,
  FaGlobe,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaArrowLeft
} from 'react-icons/fa';

export default function About() {
  const navigate = useNavigate();

  const values = [
    {
      icon: FaHeart,
      title: 'Saúde em Primeiro Lugar',
      description: 'Priorizamos o bem-estar e a saúde sustentável de nossos usuários',
      color: 'bg-red-500'
    },
    {
      icon: FaFlask,
      title: 'Base Científica',
      description: 'Todas as recomendações são baseadas em evidências científicas sólidas',
      color: 'bg-blue-500'
    },
    {
      icon: FaUsers,
      title: 'Acessibilidade',
      description: 'Democratizamos o acesso a informações nutricionais de qualidade',
      color: 'bg-green-500'
    },
    {
      icon: FaAward,
      title: 'Excelência',
      description: 'Comprometidos com a qualidade e precisão em tudo que fazemos',
      color: 'bg-yellow-500'
    }
  ];

  const team = [
    {
      name: 'Dr. Ana Silva',
      role: 'Nutricionista Clínica',
      credentials: 'CRN-3 12345',
      specialization: 'Nutrição Esportiva e Clínica',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face',
      description: 'Especialista em nutrição esportiva com mais de 10 anos de experiência.'
    },
    {
      name: 'Prof. Carlos Mendes',
      role: 'Educador Físico',
      credentials: 'CREF 67890',
      specialization: 'Treinamento Funcional',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      description: 'Especialista em treinamento funcional e reabilitação.'
    },
    {
      name: 'Dra. Maria Santos',
      role: 'Médica Endocrinologista',
      credentials: 'CRM 11111',
      specialization: 'Endocrinologia e Metabolismo',
      image: 'https://images.unsplash.com/photo-1594824375202-5a5a4a8b8b8b?w=300&h=300&fit=crop&crop=face',
      description: 'Especialista em distúrbios metabólicos e obesidade.'
    },
    {
      name: 'Eng. João Costa',
      role: 'Desenvolvedor de IA',
      credentials: 'MSc em Ciência da Computação',
      specialization: 'Machine Learning e IA',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      description: 'Especialista em inteligência artificial aplicada à saúde.'
    }
  ];

  const scientificBasis = [
    {
      title: 'Método Harris-Benedict',
      description: 'Equação para cálculo do metabolismo basal',
      reference: 'Harris JA, Benedict FG. A biometric study of human basal metabolism. Proc Natl Acad Sci USA. 1918.'
    },
    {
      title: 'Equação Mifflin-St Jeor',
      description: 'Método mais preciso para cálculo de gasto energético',
      reference: 'Mifflin MD, et al. A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr. 1990.'
    },
    {
      title: 'Diretrizes OMS',
      description: 'Recomendações mundiais para atividade física e nutrição',
      reference: 'World Health Organization. Global recommendations on physical activity for health. 2010.'
    },
    {
      title: 'Harvard Health',
      description: 'Base científica para recomendações nutricionais',
      reference: 'Harvard T.H. Chan School of Public Health. The Nutrition Source. 2023.'
    }
  ];

  const achievements = [
    {
      year: '2024',
      title: 'Lançamento da Plataforma',
      description: 'Primeira versão com IA integrada'
    },
    {
      year: '2024',
      title: '10.000 Usuários',
      description: 'Primeira marca de usuários ativos'
    },
    {
      year: '2024',
      title: 'Certificação Médica',
      description: 'Aprovação por conselho de especialistas'
    },
    {
      year: '2024',
      title: 'Prêmio Inovação',
      description: 'Reconhecimento em tecnologia para saúde'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
          >
            <FaArrowLeft />
            Voltar
          </button>
        </div>
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-indigo-800 mb-4"
          >
            Sobre
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Transformando vidas através da tecnologia e ciência da nutrição
          </motion.p>
        </div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Missão
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Nossa missão é democratizar o acesso a informações nutricionais de qualidade, 
                utilizando inteligência artificial e evidências científicas para ajudar pessoas 
                a alcançarem seus objetivos de saúde de forma sustentável e personalizada.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Acreditamos que cada pessoa merece ter acesso a orientação nutricional de qualidade, 
                independentemente de sua localização ou condição socioeconômica.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl p-8">
              <FaHeart className="text-6xl text-indigo-600 mb-4" />
              <h3 className="text-2xl font-bold text-indigo-800 mb-4">Nossos Valores</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <FaShieldAlt className="text-indigo-600 mr-3" />
                  <span>Segurança e Precisão</span>
                </li>
                <li className="flex items-center">
                  <FaLightbulb className="text-indigo-600 mr-3" />
                  <span>Inovação Contínua</span>
                </li>
                <li className="flex items-center">
                  <FaUsers className="text-indigo-600 mr-3" />
                  <span>Acessibilidade</span>
                </li>
                <li className="flex items-center">
                  <FaChartLine className="text-indigo-600 mr-3" />
                  <span>Resultados Comprovados</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
              >
                <div className={`${value.color} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <value.icon className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scientific Foundation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Fundação Científica
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scientificBasis.map((basis, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-3">{basis.title}</h3>
                <p className="text-gray-600 mb-4">{basis.description}</p>
                <p className="text-sm text-gray-500 italic">{basis.reference}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Equipe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-indigo-600 font-medium mb-1">{member.role}</p>
                <p className="text-sm text-gray-500 mb-2">{member.credentials}</p>
                <p className="text-sm text-gray-600 mb-3">{member.specialization}</p>
                <p className="text-sm text-gray-500">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Nossa Jornada
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg"
              >
                <div className="text-3xl font-bold text-indigo-600 mb-2">{achievement.year}</div>
                <h3 className="font-bold text-gray-800 mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Entre em Contato
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Informações de Contato</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaEnvelope className="text-indigo-600 mr-3" />
                  <span>contato@proex.com</span>
                </div>
                <div className="flex items-center">
                  <FaGlobe className="text-indigo-600 mr-3" />
                  <span>www.proex.com</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Redes Sociais</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-indigo-600 hover:text-indigo-800">
                  <FaGithub className="text-2xl" />
                </a>
                <a href="#" className="text-indigo-600 hover:text-indigo-800">
                  <FaLinkedin className="text-2xl" />
                </a>
                <a href="#" className="text-indigo-600 hover:text-indigo-800">
                  <FaTwitter className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
