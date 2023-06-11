import React from 'react';
import { Nav, Button, Container } from 'react-bootstrap';
import {
  Routes, Route,
  useNavigate, Navigate,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { useAuth } from './Contexts';

import appRoutes from './routes/appRoutes';
import MainPage from './Components/MainPage';
import LoginForm from './Components/LoginForm';
import SignUp from './Components/SignUp';
import NotFound from './Components/NotFound';

const ProtectedRoute = ({ isAllowed, children }) => {
  if (!isAllowed) return <Navigate to="/login" replace />;
  return children;
};

const App = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogOutButton = () => {
    localStorage.removeItem('authData');
    navigate(appRoutes.loginPage);
    auth.logOut();
  };

  const handleLogInButton = () => {
    navigate(appRoutes.loginPage);
  };

  return (
    <>
      <ToastContainer />

      <div className="d-flex flex-column h-100">

        <Nav variant="pills" className="shadow-sm navbar navbar-expand-lg navbar-light bg-white" defaultActiveKey="/home">
          <Container>
            <a href="/" className="navbar-brand">
              {t('appHeader')}
            </a>
            {auth.isLoggedIn()
              ? (<Button onClick={handleLogOutButton}>{t('logOut')}</Button>)
              : (<Button onClick={handleLogInButton}>{t('doLogIn')}</Button>) }
          </Container>
        </Nav>

        <Routes>
          <Route
            path="/"
            element={(
              <ProtectedRoute isAllowed={auth.isLoggedIn()}>
                <MainPage />
              </ProtectedRoute>
         )}
          />
          <Route path={appRoutes.loginPage} element={<LoginForm />} />
          <Route path={appRoutes.signUpPage} element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </div>
    </>
  );
};

export default App;
