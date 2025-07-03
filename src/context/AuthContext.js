'use client';

import { createContext, useState, useEffect } from 'react';
import { gql, useMutation } from "@apollo/client";
import { auth } from "@/lib/firebaseClient";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import client from "@/lib/apolloClient";
import { handleFirebaseError } from '@/utils/firebaseErrors';

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

const GET_USER_QUERY = gql`
  query GetUser($id: String!) {
    users_by_pk(id: $id) {
      id
      email
      name
      isPremiumMember
    }
  }
`;

const UPGRADE_TO_PREMIUM_MUTATION = gql`
  mutation UpgradeToPremium($userId: String!, $code: String!) {
    update_users_by_pk(pk_columns: {id: $userId}, _set: {isPremiumMember: true}) {
      id
      isPremiumMember
    }
    insert_referralCodes_one(object: {code: $code, user_id: $userId, is_used: false}) {
      id
    }
  }
`;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [insertUser, { loading: insertUserLoading }] = useMutation(INSERT_USER_MUTATION, {
    client,
    onError: (error) => {
      console.error("Error inserting user:", error);
      setError(error.message);
    },
  });
  
  const [upgradeUser, { loading: upgradeLoading }] = useMutation(UPGRADE_TO_PREMIUM_MUTATION, {
    client,
    onError: (error) => {
      console.error("Error upgrading user:", error);
      setError(error.message);
    },
  });

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        try {
          // Get the ID token with custom claims
          const token = await firebaseUser.getIdToken(true);

          // Fetch user data from Hasura
          const userResult = await client.query({
            query: GET_USER_QUERY,
            variables: { id: firebaseUser.uid },
            context: {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          });

          if (userResult.data?.users_by_pk) {
            setUser({
              id: firebaseUser.uid,
              name: userResult.data.users_by_pk.name,
              email: userResult.data.users_by_pk.email,
              isPremium: userResult.data.users_by_pk.isPremiumMember,
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Failed to load user data");
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (name, email, password) => {
    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      await new Promise(resolve => setTimeout(resolve, 2000));
      const token = await firebaseUser.getIdToken(true);

      await insertUser({
        variables: {
          object: {
            id: firebaseUser.uid,
            email: firebaseUser.email,
            name: name || "User",
            isPremiumMember: false,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      setUser({
        id: firebaseUser.uid,
        name: name,
        email: email,
        isPremium: false,
      });

      setLoading(false);
      return true;
    } catch (err) {
      const errorMessage = handleFirebaseError(err);
      console.log("Signup error:", errorMessage);
      setError(errorMessage);
      setLoading(false);
      return false;
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      const token = await firebaseUser.getIdToken(true);

      const userResult = await client.query({
        query: GET_USER_QUERY,
        variables: { id: firebaseUser.uid },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        fetchPolicy: 'network-only',
      });

      if (userResult.data?.users_by_pk) {
        setUser({
          id: firebaseUser.uid,
          name: userResult.data.users_by_pk.name,
          email: userResult.data.users_by_pk.email,
          isPremium: userResult.data.users_by_pk.isPremiumMember,
        });
        setLoading(false);
        return true;
      } else {
        throw new Error("User not found in database");
      }
    } catch (err) {
      const errorMessage = handleFirebaseError(err);
      setError(errorMessage);
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setError('');
    } catch (err) {
      console.error("Logout failed:", err);
      setError(err.message);
    }
  };
  
  const upgradeToPremium = async () => {
    if (!user) return false;
    
    setLoading(true);
    setError('');

    const referralCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    try {
      await upgradeUser({
        variables: {
          userId: user.id,
          code: referralCode,
        },
      });

      // Update local user state
      setUser((prevUser) => ({
        ...prevUser,
        isPremium: true,
      }));
      setLoading(false);
      return true;
    } catch (err) {
      console.error("Premium upgrade failed:", err);
      setError("Could not complete the upgrade. Please try again.");
      setLoading(false);
      return false;
    }
  };

  const value = {
    user,
    isLoggedIn: !!user,
    isPremium: user?.isPremium ?? false,
    loading: loading || insertUserLoading || upgradeLoading,
    error,
    login,
    logout,
    signup,
    upgradeToPremium,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
