import { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { 
  createUserProfile, 
  getUserProfile, 
  updateUserProfile 
} from '../services/firestoreService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, get their profile from Firestore
        try {
          const profileResult = await getUserProfile(firebaseUser.uid);
          if (profileResult.success) {
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email,
              ...profileResult.data
            });
          } else {
            // Profile not found, user might be new
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email
            });
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email
          });
        }
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Get user profile from Firestore
      const profileResult = await getUserProfile(firebaseUser.uid);
      if (profileResult.success) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          ...profileResult.data
        });
      }
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Erro ao fazer login';
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Email ou senha inválidos';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email inválido';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Credenciais inválidas';
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const register = async (name, email, password) => {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Create user profile in Firestore with default values
      const profileData = {
        name: name,
        email: email,
        language: 'pt',
        weight: 70,
        height: 170,
        age: 25,
        goals: 'maintenance',
        activityLevel: 'light',
        preferences: {
          vegetarian: false,
          vegan: false,
          glutenFree: false,
          lactoseFree: false,
          allergies: []
        }
      };
      
      await createUserProfile(firebaseUser.uid, profileData);
      
      setUser({
        id: firebaseUser.uid,
        ...profileData
      });
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      let errorMessage = 'Erro ao criar conta';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este email já está em uso';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email inválido';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'A senha deve ter pelo menos 6 caracteres';
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: 'Erro ao fazer logout' };
    }
  };

  const updateUser = async (updates) => {
    try {
      if (user && user.id) {
        await updateUserProfile(user.id, updates);
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        return { success: true };
      }
      return { success: false, error: 'Usuário não autenticado' };
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, error: 'Erro ao atualizar usuário' };
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
