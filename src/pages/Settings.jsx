import { useState, useEffect } from 'react';
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
  FaSave,
  FaCheck,
  FaTimes,
  FaToggleOn,
  FaToggleOff
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import BackToDashboard from '../components/BackToDashboard';
import { getUserSettings, saveUserSettings } from '../services/firestoreService';

export default function Settings() {
  const { user, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
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
      exportFormat: 'pdf'
    }
  });

  useEffect(() => {
    const fetchSettings = async () => {
      if (user && user.id) {
        try {
          const result = await getUserSettings(user.id);
          if (result.success) {
            setSettings(result.data);
          }
        } catch (error) {
          console.error('Error fetching settings:', error);
        }
      }
    };

    fetchSettings();
  }, [user]);

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = async () => {
    if (user && user.id) {
      try {
        await saveUserSettings(user.id, settings);
        toast.success('Configurações salvas com sucesso!');
      } catch (error) {
        console.error('Error saving settings:', error);
        toast.error('Erro ao salvar configurações');
      }
    }
  };

  const handleResetSettings = () => {
    const defaultSettings = {
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
        exportFormat: 'pdf'
      }
    };
    
    setSettings(defaultSettings);
    toast.info('Configurações resetadas');
  };

  const handleExportPdf = () => {
    const win = window.open('', '_blank');
    if (!win) {
      toast.error('Pop-up bloqueado. Autorize pop-ups para baixar o PDF.');
      return;
    }
    const report = {
      usuario: user?.name || 'Usuário',
      email: user?.email || '-',
      tema: 'Padrão',
      notificacoes: settings.notifications,
      privacidade: settings.privacy,
      geradoEm: new Date().toLocaleString()
    };
    const styles = `
      <style>
        body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial; padding: 24px; }
        h1 { margin: 0 0 16px; font-size: 24px; color: #064e3b; }
        h2 { margin: 24px 0 8px; font-size: 16px; color: #111827; }
        .card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; margin-bottom: 12px; }
        .muted { color: #6b7280; font-size: 12px; }
        .grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; }
        @page { size: A4; margin: 16mm; }
      </style>
    `;
    const html = `
      <!doctype html><html><head><meta charset="utf-8"/>${styles}</head>
      <body>
        <h1>Relatório de Configurações - ProEx</h1>
        <div class="muted">${report.geradoEm}</div>
        <div class="card"><h2>Usuário</h2>
          <div class="grid">
            <div><strong>Nome:</strong> ${report.usuario}</div>
            <div><strong>Email:</strong> ${report.email}</div>
            <div><strong>Tema:</strong> ${report.tema}</div>
          </div>
        </div>
        <div class="card"><h2>Notificações</h2>
          <div class="grid">
            ${Object.entries(report.notificacoes).map(([k,v])=>`<div><strong>${k}:</strong> ${v?'Ativado':'Desativado'}</div>`).join('')}
          </div>
        </div>
        <div class="card"><h2>Privacidade</h2>
          <div class="grid">
            ${Object.entries(report.privacidade).map(([k,v])=>`<div><strong>${k}:</strong> ${v?'Sim':'Não'}</div>`).join('')}
          </div>
        </div>
        <script>window.onload = () => { window.print(); setTimeout(()=>window.close(), 500); };</script>
      </body></html>
    `;
    win.document.write(html);
    win.document.close();
    toast.success("Abra o diálogo e escolha 'Salvar como PDF'.");
  };

  const handleDeleteAccount = async () => {
    const step1 = window.confirm('Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.');
    if (!step1) return;
    const challenge = window.prompt('Digite seu email para confirmar:');
    if (!challenge) return toast.info('Ação cancelada.');
    if (challenge.trim().toLowerCase() !== (user?.email || '').toLowerCase()) {
      toast.error('Email não confere. Conta não deletada.');
      return;
    }
    
    try {
      await logout();
      toast.success('Conta deletada com sucesso.');
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Erro ao deletar conta');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
                <FaCog className="mr-3" />
                Configurações
              </h1>
              <p className="text-gray-600">
                Personalize sua experiência na plataforma
              </p>
            </div>
            <BackToDashboard />
          </div>
        </div>

        <div className="space-y-8">
          

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
                onClick={handleExportPdf}
                className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex items-center justify-center transition-colors"
              >
                <FaDownload className="mr-2" />
                Baixar PDF
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleDeleteAccount}
                className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg flex items-center justify-center transition-colors w-full"
              >
                <FaTrash className="mr-2" />
                Deletar Conta
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
