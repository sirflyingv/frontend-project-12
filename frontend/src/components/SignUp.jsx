import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, Form, Button, Alert,
} from 'react-bootstrap';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../contexts';
import appRoutes from '../routes/appRoutes';

const SignUp = () => {
  const { t } = useTranslation();

  const errorMessageMapping = {
    networkError: t('error.network'),
    serverConflict: t('signUpForm.userExists'),
    other: t('error.unspecified'),
  };

  const auth = useAuth();
  const navigate = useNavigate();
  const [isSigUpFailed, setSigUpFailed] = useState(false);
  const [errorKey, setErrorKey] = useState();

  const formik = useFormik({
    initialValues: { username: '', password: '', repeatPassword: '' },
    validationSchema: yup.object({
      username: yup
        .string()
        .min(3, t('signUpForm.errorNameLength'))
        .max(20, t('signUpForm.errorNameLength'))
        .required(t('signUpForm.errorRequired')),
      password: yup
        .string()
        .min(6, t('signUpForm.errorPassMin'))
        .required(t('signUpForm.errorRequired')),
      repeatPassword: yup
        .string()
        .oneOf([yup.ref('password')], t('signUpForm.errorRepeatPassword')),
    }),
    onSubmit: async (signUpData) => {
      const { password, username } = signUpData;
      try {
        await auth.signUp({ password, username });
        navigate(appRoutes.mainPage);
      } catch (error) {
        console.log(error);
        setSigUpFailed(true);
        if (error.code === 'ERR_NETWORK') {
          setErrorKey('networkError');
        } else if (error.response.status === 409) {
          setErrorKey('serverConflict');
        } else {
          setErrorKey('other');
        }
      }
    },
  });

  return (
    <div className="d-flex flex-column h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>
                <h2>{t('signUpForm.header')}</h2>
              </Card.Title>
              <Form className="p-3" onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{t('signUpForm.username')}</Form.Label>
                  <Form.Control
                    autoFocus
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    type="text"
                    required
                    placeholder={t('signUpForm.typeName')}
                    isInvalid={
                      formik.touched.username && !!formik.errors.username
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>{t('signUpForm.password')}</Form.Label>
                  <Form.Control
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    type="password"
                    required
                    placeholder={t('signUpForm.typePassword')}
                    isInvalid={
                      formik.touched.password && !!formik.errors.password
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="formBasicRepeatPassword"
                >
                  <Form.Label>{t('signUpForm.repeatPassword')}</Form.Label>
                  <Form.Control
                    name="repeatPassword"
                    onChange={formik.handleChange}
                    value={formik.values.repeatPassword}
                    onBlur={formik.handleBlur}
                    type="password"
                    required
                    placeholder={t('signUpForm.repeatPassword')}
                    isInvalid={
                      formik.touched.repeatPassword
                      && !!formik.errors.repeatPassword
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.repeatPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                  {t('signUpForm.signUp')}
                </Button>
              </Form>
              {isSigUpFailed ? (
                <Alert className="m-0" variant="danger">{errorMessageMapping[errorKey]}</Alert>
              ) : null}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
