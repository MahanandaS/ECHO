/**
 * FIREBASE CONFIGURATION
 * 
 * This file initializes Firebase and Firestore.
 * Think of Firebase as a cloud database service that stores your posts online.
 * Firestore is the database where your posts live in the cloud.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1myHtW97D1r-q-CR5u9VZycYNviA1NBE",
  authDomain: "echo-ee5aa.firebaseapp.com",
  projectId: "echo-ee5aa",
  storageBucket: "echo-ee5aa.firebasestorage.app",
  messagingSenderId: "1003885670250",
  appId: "1:1003885670250:web:dd16bd596ab0e8c8e0ff13"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
console.log('✅ Firebase initialized successfully');

// Initialize Firestore database
export const db = getFirestore(app);
console.log('✅ Firestore connected');

export { app };
