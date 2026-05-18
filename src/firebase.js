/**
 * FIREBASE CONFIGURATION
 * 
 * This file initializes Firebase and Firestore.
 * Think of Firebase as a cloud database service that stores your posts online.
 * Firestore is the database where your posts live in the cloud.
 * 
 * 🔒 SECURITY: Configuration is loaded from .env.local (not committed to git)
 */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration loaded from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
console.log('✅ Firebase initialized successfully');

// Initialize Firestore database
export const db = getFirestore(app);
console.log('✅ Firestore connected');

export { app };
