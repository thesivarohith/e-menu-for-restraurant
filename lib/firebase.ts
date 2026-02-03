// Firebase configuration and initialization
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDZalJkBOn77G9EE5utPqrZOkuq0urkUWk",
    authDomain: "wdnd-1.firebaseapp.com",
    projectId: "wdnd-1",
    storageBucket: "wdnd-1.firebasestorage.app",
    messagingSenderId: "115178817368",
    appId: "1:115178817368:web:6084d89ffcb62bc300472d",
    measurementId: "G-7H0MC1DMZ5"
};

// Initialize Firebase (avoid duplicate initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app;
