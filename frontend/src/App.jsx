/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable functional/no-expression-statements */
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './State/store';
import MainPage from './Components/MainPage';
import LoginForm from './Components/LoginForm';
import SignUp from './Components/SignUp';
import NotFound from './Components/NotFound';

import { AuthContext/* , SocketContext */ } from './Contexts';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = async (authData) => {
    try {
      const res = await axios.post('/api/v1/login', authData, {
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
      const res = await axios.post('/api/v1/signup', signUpData, {
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
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut, signUp,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  </Provider>
);

export default App;
