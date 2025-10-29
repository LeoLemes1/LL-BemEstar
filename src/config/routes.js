export const routes = {
  // Public routes
  HOME: '/',
  LOGIN: '/loginRegistro',
  ABOUT: '/about',
  HELP: '/help',
  
  // Protected routes
  DASHBOARD: '/dashboard',
  AI_CHAT: '/ai-chat',
  MY_PLAN: '/my-plan',
  WORKOUT: '/workout',
  FOOD_CALORIES: '/food-calories',
  PROFILE: '/profile',
  PROGRESS: '/progress',
  AI_TIPS: '/ai-tips',
  SETTINGS: '/settings'
};

export const publicRoutes = [
  routes.HOME,
  routes.LOGIN,
  routes.ABOUT,
  routes.HELP
];

export const protectedRoutes = [
  routes.DASHBOARD,
  routes.AI_CHAT,
  routes.MY_PLAN,
  routes.WORKOUT,
  routes.FOOD_CALORIES,
  routes.PROFILE,
  routes.PROGRESS,
  routes.AI_TIPS,
  routes.SETTINGS
];
