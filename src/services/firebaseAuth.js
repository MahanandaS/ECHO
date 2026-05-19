/**
 * FIREBASE AUTHENTICATION SERVICE
 * Handles all authentication operations with Firebase Auth
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase.js';

const googleProvider = new GoogleAuthProvider();

/**
 * Sign up with email and password
 */
export const signUpWithEmail = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const user = userCredential.user;

    // Create user profile in Firestore
    await createUserProfile(user.uid, email, displayName);

    return user;
  } catch (error) {
    throw new Error(error.message || 'Failed to sign up');
  }
};

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message || 'Failed to sign in');
  }
};

/**
 * Sign in with Google
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if profile exists, create if not
    const profileExists = await getUserProfile(user.uid);
    if (!profileExists) {
      await createUserProfile(user.uid, user.email, user.displayName || user.email);
    }

    return user;
  } catch (error) {
    throw new Error(error.message || 'Failed to sign in with Google');
  }
};

/**
 * Sign out
 */
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw new Error(error.message || 'Failed to sign out');
  }
};

/**
 * Listen to auth state changes
 */
export const subscribeToAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Get current user
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Create user profile in Firestore
 */
export const createUserProfile = async (userId, email, displayName) => {
  try {
    const profileRef = doc(db, 'users', userId);
    await setDoc(
      profileRef,
      {
        email,
        displayName: displayName || email.split('@')[0],
        avatarUrl: null,
        bio: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  } catch (error) {
    console.error('Failed to create user profile:', error);
    throw error;
  }
};

/**
 * Get user profile
 */
export const getUserProfile = async (userId) => {
  try {
    const profileRef = doc(db, 'users', userId);
    const snapshot = await getDoc(profileRef);
    return snapshot.exists() ? snapshot.data() : null;
  } catch (error) {
    console.error('Failed to get user profile:', error);
    return null;
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userId, updates) => {
  try {
    const profileRef = doc(db, 'users', userId);
    await updateDoc(profileRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Failed to update user profile:', error);
    throw error;
  }
};
