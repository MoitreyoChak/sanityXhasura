'use client';

import { createContext, useState } from 'react';
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";

export const AuthContext = createContext(null);

const INSERT_USER_MUTATION = gql`
  mutation InsertUser($object: users_insert_input!) {
    insert_users_one(object: $object) {
      email
      id
      isPremiumMember
      name
    }
  }
`;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [insertUser, { loading, data }] = useMutation(INSERT_USER_MUTATION, {
    client,
    onCompleted: (mutationData) => {
      console.log("User inserted successfully:", mutationData);
    },
    onError: (error) => {
      setError(error.message);
    },
  });


  const signup = async (name, email, password) => {
    console.log("Attempting to sign up with:", name, email, password);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await insertUser({
        variables: {
          object: {
            id: userCredential.user.uid,
            email: userCredential.user.email,
            name: name || "default name",
            isPremiumMember: false,
          },
        },
      });
      setUser({
        name: name,
        email: email,
        isPremium: false,
      });

      return true;
    } catch (err) {
      console.error("Signup failed:", err);
      return false;
    }

  };

  const login = async (name, email, password) => {
    console.log("Attempting to log in with:", name, email, password);
    // TODO: Replace this with your actual authentication logic (e.g., API call).
    // For now, we'll simulate a successful login and set a mock user.
    setUser({
      name: "Jane Doe",
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
