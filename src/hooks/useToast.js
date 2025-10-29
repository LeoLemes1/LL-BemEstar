import { useToast as useToastContext } from '../context/ToastContext';

export const useToast = () => {
  const toast = useToastContext();
  
  return {
    success: (message, duration = 3000) => toast.success(message, duration),
    error: (message, duration = 3000) => toast.error(message, duration),
    warning: (message, duration = 3000) => toast.warning(message, duration),
    info: (message, duration = 3000) => toast.info(message, duration),
  };
};
