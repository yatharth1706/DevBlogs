import React, { useState, useContext, useEffect } from "react";
import firebase, { auth } from "../config/firebase.config";
import { Spinner } from "react-bootstrap";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currUser, setCurrUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password).then((response) => {
      return response;
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("User");
      console.log(user);
      setCurrUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currUser,
    signup,
    login,
    loginWithGoogle,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading ? (
        children
      ) : (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </AuthContext.Provider>
  );
}
