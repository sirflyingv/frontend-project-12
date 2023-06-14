import React from 'react';
import {
  Navbar, Nav, Button, Container,
} from 'react-bootstrap';

import {
  BrowserRouter,
  Routes, Route,
  Navigate, Outlet,
} from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { useAuth } from './Contexts';

import appRoutes from './routes/appRoutes';
import MainPage from './Components/MainPage';
import LoginForm from './Components/LoginForm';
import SignUp from './Components/SignUp';
import NotFound from './Components/NotFound';

const ProtectedRoute = () => {
  const auth = useAuth();
  return auth.isLoggedIn() ? <Outlet /> : <Navigate to={appRoutes.loginPage} replace />;
};

const View = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <BrowserRouter>

      <ToastContainer />

      <div className="d-flex flex-column h-100">
        <Navbar variant="pills" className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <Container>
            <Navbar.Brand href={appRoutes.mainPage}>
              {t('appHeader')}
            </Navbar.Brand>
            <Nav>
              <Nav.Link href={appRoutes.loginPage} className="p-0">
                {auth.isLoggedIn()
                  ? (<Button onClick={auth.logOut}>{t('logOut')}</Button>)
                  : null }
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route path={appRoutes.mainPage} element={<ProtectedRoute />}>
            <Route path="" element={<MainPage />} />
          </Route>
          <Route path={appRoutes.loginPage} element={<LoginForm />} />
          <Route path={appRoutes.signUpPage} element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

    </BrowserRouter>
  );
};

export default View;
