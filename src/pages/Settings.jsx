import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCog, 
  FaLanguage, 
  FaBell, 
  FaMoon, 
  FaSun, 
  FaShieldAlt, 
  FaTrash,
  FaDownload,
  FaUpload,
  FaSave,
  FaCheck,
  FaTimes,
  FaToggleOn,
  FaToggleOff,
  FaArrowLeft
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function Settings() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      weekly: true,
      tips: true
    },
    privacy: {
      profilePublic: false,
      shareProgress: false,
      dataCollection: true
    },
    data: {
      autoBackup: true,
      exportFormat: 'json'
    }
  });

  const themes = [
    { value: 'light', label: 'Claro', icon: FaSun },
    { value: 'dark', label: 'Escuro', icon: FaMoon },
    { value: 'auto', label: 'Automático', icon: FaCog }
  ];

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // Update user preferences
    updateUser({});
    
    // Save to localStorage
    localStorage.setItem('appSettings', JSON.stringify(settings));
    
    toast.success('Configurações salvas com sucesso!');
  };

  const handleResetSettings = () => {
    const defaultSettings = {
      theme: 'light',
      notifications: {
        email: true,
        push: true,
        weekly: true,
        tips: true
      },
      privacy: {
        profilePublic: false,
        shareProgress: false,
        dataCollection: true
      },
      data: {
        autoBackup: true,
        exportFormat: 'json'
      }
    };
    
    setSettings(defaultSettings);
    toast.info('Configurações resetadas');
  };

  const handleExportData = () => {
    const userData = {
      user: user,
      settings: settings,
      timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `proex-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    toast.success('Dados exportados com sucesso!');
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.settings) {
          setSettings(data.settings);
          toast.success('Dados importados com sucesso!');
        } else {
          toast.error('Arquivo inválido');
        }
      } catch (error) {
        toast.error('Erro ao importar dados');
      }
    };
    reader.readAsText(file);
  };

  const handleDeleteData = () => {
    if (window.confirm('Tem certeza que deseja deletar todos os dados? Esta ação não pode ser desfeita.')) {
      localStorage.clear();
      toast.success('Todos os dados foram removidos');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-semibold transition-colors"
          >
            <FaArrowLeft />
            Voltar
          </button>
        </div>
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
            <FaCog className="mr-3" />
            Configurações
          </h1>
          <p className="text-gray-600">
            Personalize sua experiência na plataforma
          </p>
        </div>

        <div className="space-y-8">
          {/* Theme Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaMoon className="mr-2 text-purple-500" />
              Tema
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {themes.map((theme) => {
                const Icon = theme.icon;
                return (
                  <label key={theme.value} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      value={theme.value}
                      checked={settings.theme === theme.value}
                      onChange={(e) => handleSettingChange('theme', 'theme', e.target.value)}
                      className="mr-3"
                    />
                    <Icon className="mr-3 text-gray-600" />
                    <span className="font-medium">{theme.label}</span>
                  </label>
                );
              })}
            </div>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaBell className="mr-2 text-yellow-500" />
              Notificações
            </h3>
            <div className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-gray-800">
                      {key === 'email' ? 'Email' : 
                       key === 'push' ? 'Notificações Push' :
                       key === 'weekly' ? 'Relatório Semanal' :
                       key === 'tips' ? 'Dicas Diárias' : key}
                    </span>
                    <p className="text-sm text-gray-600">
                      {key === 'email' ? 'Receber atualizações por email' :
                       key === 'push' ? 'Notificações no navegador' :
                       key === 'weekly' ? 'Resumo semanal de progresso' :
                       key === 'tips' ? 'Dicas motivacionais diárias' : ''}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('notifications', key, !value)}
                    className={`p-2 rounded-lg transition-colors ${
                      value ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {value ? <FaCheck className="text-xl" /> : <FaTimes className="text-xl" />}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Privacy Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaShieldAlt className="mr-2 text-green-500" />
              Privacidade
            </h3>
            <div className="space-y-4">
              {Object.entries(settings.privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-gray-800">
                      {key === 'profilePublic' ? 'Perfil Público' :
                       key === 'shareProgress' ? 'Compartilhar Progresso' :
                       key === 'dataCollection' ? 'Coleta de Dados' : key}
                    </span>
                    <p className="text-sm text-gray-600">
                      {key === 'profilePublic' ? 'Permitir que outros vejam seu perfil' :
                       key === 'shareProgress' ? 'Compartilhar progresso com amigos' :
                       key === 'dataCollection' ? 'Permitir coleta de dados para melhorias' : ''}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('privacy', key, !value)}
                    className={`p-2 rounded-lg transition-colors ${
                      value ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {value ? <FaCheck className="text-xl" /> : <FaTimes className="text-xl" />}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Data Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Gerenciamento de Dados
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-800">Backup Automático</span>
                  <p className="text-sm text-gray-600">Fazer backup automático dos seus dados</p>
                </div>
                <button
                  onClick={() => handleSettingChange('data', 'autoBackup', !settings.data.autoBackup)}
                  className={`p-2 rounded-lg transition-colors ${
                    settings.data.autoBackup ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {settings.data.autoBackup ? <FaToggleOn className="text-xl" /> : <FaToggleOff className="text-xl" />}
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-800">Formato de Exportação</span>
                  <p className="text-sm text-gray-600">Formato dos dados exportados</p>
                </div>
                <select
                  value={settings.data.exportFormat}
                  onChange={(e) => handleSettingChange('data', 'exportFormat', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="json">JSON</option>
                  <option value="csv">CSV</option>
                  <option value="pdf">PDF</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Ações
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={handleSaveSettings}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center justify-center transition-colors"
              >
                <FaSave className="mr-2" />
                Salvar
              </button>
              
              <button
                onClick={handleExportData}
                className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex items-center justify-center transition-colors"
              >
                <FaDownload className="mr-2" />
                Exportar
              </button>
              
              <label className="bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                <FaUpload className="mr-2" />
                Importar
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                />
              </label>
              
              <button
                onClick={handleResetSettings}
                className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-lg flex items-center justify-center transition-colors"
              >
                <FaCog className="mr-2" />
                Resetar
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleDeleteData}
                className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg flex items-center justify-center transition-colors w-full"
              >
                <FaTrash className="mr-2" />
                Deletar Todos os Dados
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
