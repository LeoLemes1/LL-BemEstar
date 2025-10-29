import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

// Pages
import InicioPagina from "./pages/InicioPagina";
import LoginRegistro from "./pages/LoginRegistro";
import Dashboard from "./pages/Dashboard";
import AiChat from "./pages/AiChat";
import MyPlan from "./pages/MyPlan";
import Workout from "./pages/Workout";
import FoodCalories from "./pages/FoodCalories";
import Profile from "./pages/Profile";
import Progress from "./pages/Progress";
import AiTips from "./pages/AiTips";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import About from "./pages/About";
import Calculadora from "./pages/Calculadora";

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/loginRegistro" />;
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<InicioPagina />} />
            <Route path="/loginRegistro" element={<LoginRegistro />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/ai-chat" element={
              <ProtectedRoute>
                <AiChat />
              </ProtectedRoute>
            } />
            <Route path="/my-plan" element={
              <ProtectedRoute>
                <MyPlan />
              </ProtectedRoute>
            } />
            <Route path="/workout" element={
              <ProtectedRoute>
                <Workout />
              </ProtectedRoute>
            } />
            <Route path="/food-calories" element={
              <ProtectedRoute>
                <FoodCalories />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/progress" element={
              <ProtectedRoute>
                <Progress />
              </ProtectedRoute>
            } />
            <Route path="/ai-tips" element={
              <ProtectedRoute>
                <AiTips />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/calculadora" element={
              <ProtectedRoute>
                <Calculadora />
              </ProtectedRoute>
            } />
            
            {/* Redirect to dashboard for authenticated users */}
            <Route path="/login" element={<Navigate to="/loginRegistro" />} />
            <Route path="/register" element={<Navigate to="/loginRegistro" />} />
          </Routes>
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
