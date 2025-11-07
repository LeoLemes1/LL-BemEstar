import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  addDoc,
  deleteDoc,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

// User Operations
export const createUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { success: true, data: { id: userSnap.id, ...userSnap.data() } };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId, updates) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Progress Operations
export const addProgressEntry = async (userId, progressData) => {
  try {
    const progressRef = collection(db, 'users', userId, 'progress');
    const docRef = await addDoc(progressRef, {
      ...progressData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding progress entry:', error);
    throw error;
  }
};

export const getProgressHistory = async (userId, limitCount = 50) => {
  try {
    const progressRef = collection(db, 'users', userId, 'progress');
    const q = query(progressRef, orderBy('date', 'desc'), limit(limitCount));
    const querySnapshot = await getDocs(q);
    
    const progressData = [];
    querySnapshot.forEach((doc) => {
      progressData.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: progressData };
  } catch (error) {
    console.error('Error getting progress history:', error);
    throw error;
  }
};

export const deleteProgressEntry = async (userId, entryId) => {
  try {
    const entryRef = doc(db, 'users', userId, 'progress', entryId);
    await deleteDoc(entryRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting progress entry:', error);
    throw error;
  }
};

// Nutrition Plan Operations
export const saveNutritionPlan = async (userId, planData) => {
  try {
    const planRef = doc(db, 'users', userId, 'plans', 'nutrition');
    await setDoc(planRef, {
      ...planData,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error saving nutrition plan:', error);
    throw error;
  }
};

export const getNutritionPlan = async (userId) => {
  try {
    const planRef = doc(db, 'users', userId, 'plans', 'nutrition');
    const planSnap = await getDoc(planRef);
    
    if (planSnap.exists()) {
      return { success: true, data: planSnap.data() };
    } else {
      return { success: false, error: 'Plan not found' };
    }
  } catch (error) {
    console.error('Error getting nutrition plan:', error);
    throw error;
  }
};

// Workout Plan Operations
export const saveWorkoutPlan = async (userId, planData) => {
  try {
    const planRef = doc(db, 'users', userId, 'plans', 'workout');
    await setDoc(planRef, {
      ...planData,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error saving workout plan:', error);
    throw error;
  }
};

export const getWorkoutPlan = async (userId) => {
  try {
    const planRef = doc(db, 'users', userId, 'plans', 'workout');
    const planSnap = await getDoc(planRef);
    
    if (planSnap.exists()) {
      return { success: true, data: planSnap.data() };
    } else {
      return { success: false, error: 'Plan not found' };
    }
  } catch (error) {
    console.error('Error getting workout plan:', error);
    throw error;
  }
};

// Meal Tracking Operations
export const addMealEntry = async (userId, mealData) => {
  try {
    const mealsRef = collection(db, 'users', userId, 'meals');
    const docRef = await addDoc(mealsRef, {
      ...mealData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding meal entry:', error);
    throw error;
  }
};

export const getMealsByDate = async (userId, date) => {
  try {
    const mealsRef = collection(db, 'users', userId, 'meals');
    const q = query(mealsRef, where('date', '==', date));
    const querySnapshot = await getDocs(q);
    
    const meals = [];
    querySnapshot.forEach((doc) => {
      meals.push({ id: doc.id, ...doc.data() });
    });
    
    // Ordena no client-side ao invés de no Firestore
    meals.sort((a, b) => {
      if (a.timestamp && b.timestamp) {
        return new Date(a.timestamp) - new Date(b.timestamp);
      }
      return 0;
    });
    
    return { success: true, data: meals };
  } catch (error) {
    console.error('Error getting meals by date:', error);
    // Retorna array vazio em caso de erro
    return { success: true, data: [] };
  }
};

// Workout Tracking Operations
export const addWorkoutEntry = async (userId, workoutData) => {
  try {
    const workoutsRef = collection(db, 'users', userId, 'workouts');
    const docRef = await addDoc(workoutsRef, {
      ...workoutData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding workout entry:', error);
    throw error;
  }
};

export const saveGeneratedWorkout = async (userId, workoutData) => {
  try {
    const workoutsRef = collection(db, 'users', userId, 'workoutPlans');
    const docRef = await addDoc(workoutsRef, {
      ...workoutData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving workout plan:', error);
    throw error;
  }
};

export const getAllWorkouts = async (userId) => {
  try {
    const workoutsRef = collection(db, 'users', userId, 'workoutPlans');
    const querySnapshot = await getDocs(workoutsRef);
    
    const workouts = [];
    querySnapshot.forEach((doc) => {
      workouts.push({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate().toISOString() : doc.data().createdAt
      });
    });
    
    // Ordena por data de criação (mais recente primeiro)
    workouts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    return { success: true, data: workouts };
  } catch (error) {
    console.error('Error getting workouts:', error);
    return { success: true, data: [] };
  }
};

export const deleteWorkout = async (userId, workoutId) => {
  try {
    const workoutRef = doc(db, 'users', userId, 'workoutPlans', workoutId);
    await deleteDoc(workoutRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting workout:', error);
    throw error;
  }
};

export const getWorkoutsByDate = async (userId, date) => {
  try {
    const workoutsRef = collection(db, 'users', userId, 'workouts');
    const q = query(workoutsRef, where('date', '==', date), orderBy('createdAt'));
    const querySnapshot = await getDocs(q);
    
    const workouts = [];
    querySnapshot.forEach((doc) => {
      workouts.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: workouts };
  } catch (error) {
    console.error('Error getting workouts by date:', error);
    throw error;
  }
};

// Settings Operations
export const saveUserSettings = async (userId, settingsData) => {
  try {
    const settingsRef = doc(db, 'users', userId, 'settings', 'preferences');
    await setDoc(settingsRef, {
      ...settingsData,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error saving settings:', error);
    throw error;
  }
};

export const getUserSettings = async (userId) => {
  try {
    const settingsRef = doc(db, 'users', userId, 'settings', 'preferences');
    const settingsSnap = await getDoc(settingsRef);
    
    if (settingsSnap.exists()) {
      return { success: true, data: settingsSnap.data() };
    } else {
      return { success: false, error: 'Settings not found' };
    }
  } catch (error) {
    console.error('Error getting settings:', error);
    throw error;
  }
};

// AI Chat History Operations
export const saveAiChatEntry = async (userId, chatData) => {
  try {
    const chatRef = collection(db, 'users', userId, 'aiChats');
    const docRef = await addDoc(chatRef, {
      ...chatData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving AI chat entry:', error);
    throw error;
  }
};

export const getAiChatHistory = async (userId, limitCount = 20) => {
  try {
    const chatRef = collection(db, 'users', userId, 'aiChats');
    const querySnapshot = await getDocs(chatRef);
    
    const chats = [];
    querySnapshot.forEach((doc) => {
      chats.push({ id: doc.id, ...doc.data() });
    });
    
    // Ordena no client-side (mais recente primeiro)
    chats.sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.timestamp);
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.timestamp);
      return dateB - dateA;
    });
    
    // Limita quantidade
    const limitedChats = chats.slice(0, limitCount);
    
    return { success: true, data: limitedChats };
  } catch (error) {
    console.error('Error getting AI chat history:', error);
    return { success: true, data: [] };
  }
};

