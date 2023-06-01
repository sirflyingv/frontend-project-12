import React, { useState } from 'react';
import axios from 'axios';
import { loginUrl, signUpUrl } from 'routes';
import { AuthContext } from './Contexts';

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
      console.error('op!', err);
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

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut, signUp, isLoggedIn,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
