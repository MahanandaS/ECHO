import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase.js';

const ADMIN_EMAIL = 'admin@blog.com';
const ADMIN_UID = 'ncTz91HofKOpDBnJE5Kp7q2v3V52';
const ADMIN_ID = 'admin-owner';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          isAdmin: firebaseUser.email === ADMIN_EMAIL || firebaseUser.uid === ADMIN_UID,
          role: (firebaseUser.email === ADMIN_EMAIL || firebaseUser.uid === ADMIN_UID) ? 'admin' : 'user',
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password, name) => {
    if (!email || !password || !name) {
      throw new Error('All fields are required');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    if (!email.includes('@')) {
      throw new Error('Please enter a valid email');
    }

    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Save display name to Firebase
    await updateProfile(result.user, { displayName: name.trim() });

    const userData = {
      id: result.user.uid,
      email: result.user.email,
      name: name.trim(),
      isAdmin: email === ADMIN_EMAIL || result.user.uid === ADMIN_UID,
      role: (email === ADMIN_EMAIL || result.user.uid === ADMIN_UID) ? 'admin' : 'user',
    };

    setUser(userData);
    return userData;
  };

  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const result = await signInWithEmailAndPassword(auth, email, password);
    
    const userData = {
      id: result.user.uid,
      email: result.user.email,
      name: result.user.displayName || result.user.email.split('@')[0],
      isAdmin: result.user.email === ADMIN_EMAIL || result.user.uid === ADMIN_UID,
      role: (result.user.email === ADMIN_EMAIL || result.user.uid === ADMIN_UID) ? 'admin' : 'user',
    };

    setUser(userData);
    return userData;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const isAuthenticated = Boolean(user);
  const isAdmin = user?.isAdmin || false;

  return {
    user,
    isLoading,
    isAuthenticated,
    isAdmin,
    login,
    signup,
    logout,
    ADMIN_ID,
  };
}