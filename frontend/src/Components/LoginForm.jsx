import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Container, Alert,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useAuth } from '../Contexts';
import appRoutes from '../routes/appRoutes';

const LoginForm = () => {
  const { t } = useTranslation();

  const [isAuthFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: yup.object({
      username: yup.string()
        .required(),
      password: yup.string()
        .required(),
    }),
    onSubmit: async (authData) => {
      try {
        await auth.logIn(authData);
        navigate(appRoutes.mainPage);
      } catch (error) {
        setAuthFailed(true);
      }
    },
  });

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="d-flex flex-column h-100">
              <div className="container-fluid h-100">
                <div className="row justify-content-center align-content-center h-100">
                  <div className="col-12 col-md-8 col-xxl-6">
                    <Container className="bg-light border rounded">
                      <Form className="p-3" onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>{t('loginUsername')}</Form.Label>
                          <Form.Control
                            name="username"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            onBlur={formik.handleBlur}
                            type="text"
                            required
                            placeholder={t('enterName')}
                            isInvalid={isAuthFailed}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>{t('loginPassword')}</Form.Label>
                          <Form.Control
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            type="password"
                            required
                            placeholder={t('enterPassword')}
                            isInvalid={isAuthFailed}
                          />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                          {t('logIn')}
                        </Button>
                      </Form>
                      { isAuthFailed ? <Alert variant="danger">{t('wrongCred')}</Alert> : null }
                    </Container>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>{t('noAccount')}</span>
              {' '}
              <a href="/signup">{t('signup')}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
