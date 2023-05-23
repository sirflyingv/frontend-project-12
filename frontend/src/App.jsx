/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable functional/no-expression-statements */
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Routes, Route,
  useNavigate,
} from 'react-router-dom';
import { Nav, Button, Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from './State/store';
import MainPage from './Components/MainPage';
import LoginForm from './Components/LoginForm';
import SignUp from './Components/SignUp';
import NotFound from './Components/NotFound';
import { useAuth } from './Contexts';

const App = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogOutButton = () => {
    localStorage.removeItem('authData');
    navigate('/login');
    auth.logOut();
  };

  return (
    <Provider store={store}>
      <div className="d-flex flex-column h-100">
        <Nav variant="pills" className="shadow-sm navbar navbar-expand-lg navbar-light bg-white" defaultActiveKey="/home">
          <Container>
            <a href="/" className="navbar-brand">Hexlet Chat</a>
            {auth.loggedIn ? <Button onClick={handleLogOutButton}>Выйти</Button> : null}
          </Container>
        </Nav>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
