"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signUp: (email: string, password: string, displayName?: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Sign up with email and password
    const signUp = async (email: string, password: string, displayName?: string) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Update profile with display name if provided
        if (displayName && userCredential.user) {
            await updateProfile(userCredential.user, { displayName });
        }
    };

    // Sign in with email and password
    const signIn = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    // Sign in with Google
    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleProvider);
    };

    // Sign out
    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signUp,
            signIn,
            signInWithGoogle,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
