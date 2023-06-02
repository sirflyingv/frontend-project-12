import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, Form, Button, Alert,
} from 'react-bootstrap';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../Contexts';

const SignUp = () => {
  const { t } = useTranslation();

  const auth = useAuth();
  const navigate = useNavigate();
  const [isSigUpFailed, setSigUpFailed] = useState(false);
  const [failMessage, setFailMessage] = useState(t('signUpFailed'));

  const formik = useFormik({
    initialValues: { username: '', password: '', repeatPassword: '' },
    validationSchema: yup.object({
      username: yup
        .string()
        .min(3, t('regErrorNameLength'))
        .max(20, t('regErrorNameLength'))
        .required(t('regErrorRequired')),
      password: yup
        .string()
        .min(6, t('regErrorPassMin'))
        .required(t('regErrorRequired')),
      repeatPassword: yup
        .string()
        .oneOf([yup.ref('password')], t('regErrorRepeatPass')),
    }),
    onSubmit: async (signUpData) => {
      const { password, username } = signUpData;
      try {
        await auth.signUp({ password, username });
        navigate('/');
      } catch (error) {
        setFailMessage(
          error.response.status === 409
            ? t('userExists')
            : t('signUpFailed'),
        );
        setSigUpFailed(true);
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
                <h2>{t('registration')}</h2>
              </Card.Title>
              <Form className="p-3" onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{t('regName')}</Form.Label>
                  <Form.Control
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    type="text"
                    required
                    placeholder={t('regTypeName')}
                    isInvalid={
                      formik.touched.username && !!formik.errors.username
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>{t('regPass')}</Form.Label>
                  <Form.Control
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    type="password"
                    required
                    placeholder={t('regTypePass')}
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
                  <Form.Label>{t('regRepeatPass')}</Form.Label>
                  <Form.Control
                    name="repeatPassword"
                    onChange={formik.handleChange}
                    value={formik.values.repeatPassword}
                    onBlur={formik.handleBlur}
                    type="password"
                    required
                    placeholder={t('regRepeatPass')}
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
                  {t('signUp')}
                </Button>
              </Form>
              {isSigUpFailed ? (
                <Alert variant="danger">{failMessage}</Alert>
              ) : null}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
