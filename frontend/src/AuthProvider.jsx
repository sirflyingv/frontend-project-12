import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { AuthContext } from './Contexts';
import { loginUrl, signUpUrl } from './routes.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const isLoggedIn = () => {
    const authData = localStorage.getItem('authData');
    return !!authData;
  };

  const logIn = async (authData) => {
    try {
      const res = await axios.post(loginUrl, authData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { username } = authData;
      const { token } = res.data;
      localStorage.setItem('authData', JSON.stringify({ token, username }));
      setLoggedIn(true);
    } catch (err) {
      setLoggedIn(false);
      throw (err); // error traveling magic!!!
    }
  };

  const signUp = async (signUpData) => {
    try {
      const res = await axios.post(signUpUrl, signUpData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { username } = signUpData;
      const { token } = res.data;
      localStorage.setItem('authData', JSON.stringify({ token, username }));
      setLoggedIn(true);
    } catch (err) {
      console.error('op!', err);
      setLoggedIn(false);
      throw (err); // error traveling magic!!!
    }
  };

  const logOut = () => {
    localStorage.removeItem('authData');
    setLoggedIn(false);
  };

  const authAPI = useMemo(() => ({
    loggedIn, logIn, logOut, signUp, isLoggedIn,
  }), [loggedIn]);

  return (
    <AuthContext.Provider value={authAPI}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
