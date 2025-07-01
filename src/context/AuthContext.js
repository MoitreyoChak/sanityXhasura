'use client';

import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // In a real app, you'd have more robust logic here,
  // probably involving API calls and token management.
  const login = async (email, password) => {
    console.log("Attempting to log in with:", email, password);
    // TODO: Replace this with your actual authentication logic (e.g., API call).
    // For now, we'll simulate a successful login and set a mock user.
    setUser({
      name: "Jane Doe",
      email: email,
      isPremium: false,
    });
    return true; // Indicate success
  };

  const signup = async (name, email, password) => {
    console.log("Attempting to sign up with:", name, email, password);
    // TODO: Replace this with your actual signup logic (e.g., API call).
    // For now, we'll simulate a successful signup and log the user in.
    setUser({
      name: name,
      email: email,
      isPremium: false,
    });
    return true; // Indicate success
  };

  const logout = () => {
    // TODO: Add any additional cleanup logic here (e.g., clearing tokens).
    setUser(null);
  };

  const value = {
    user,
    isLoggedIn: !!user,
    isPremium: user?.isPremium ?? false,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
