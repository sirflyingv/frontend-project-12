/* eslint-disable functional/no-expression-statements */
/* eslint-disable import/no-extraneous-dependencies */
import React, { /* useEffect, */ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Container, Alert,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
// import cn from 'classnames';
import axios from 'axios';
import { useAuth } from '../Contexts';

const LoginForm = () => {
  const [isAuthFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const { localStorage } = window;

  const formik = useFormik({
    initialValues: { username: 'admin', password: 'admin' },
    validationSchema: yup.object({
      username: yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      password: yup.string()
        .min(4, 'Must be 6 characters or more')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      const res = await axios.post('/api/v1/login', values, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch((e) => {
        setAuthFailed(true);
        console.log('op!', e);
      });
      localStorage.setItem('userId', JSON.stringify(res.data));
      auth.logIn();
      setAuthFailed(false);
      navigate('/');
    },
  });

  return (
    <Container className="container bg-light border rounded">
      <Form className="p-3" onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            onBlur={formik.handleBlur}
            type="text"
            required
            placeholder="Enter name"
            isInvalid={!!formik.errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.username}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            type="password"
            required
            placeholder="Password"
            isInvalid={!!formik.errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Log in
        </Button>
      </Form>
      {isAuthFailed ? <Alert variant="danger">Wrong username or passwords</Alert> : null}
    </Container>
  );
};

export default LoginForm;
