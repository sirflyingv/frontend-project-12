/* eslint-disable functional/no-expression-statements */
import React, { /* useEffect, */ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, Form, Button, Alert,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../Contexts';

const SignUp = () => {
  const content = 'Регистрация';
  const auth = useAuth();
  console.log(auth);
  const navigate = useNavigate();
  const [isSigUpFailed, setSigUpFailed] = useState(false);
  const [failMessage, setFailMessage] = useState('Sign up failed');

  const formik = useFormik({
    initialValues: { username: '', password: '', repeatPassword: '' },
    validationSchema: yup.object({
      username: yup.string()
        .min(3, 'Must be 3 characters or more')
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      password: yup.string()
        .min(6, 'Must be 6 characters or more')
        .required('Required'),
      repeatPassword: yup.string()
        .oneOf([yup.ref('password')], 'Must match password'),

    }),
    onSubmit: async (signUpData) => {
      // eslint-disable-next-line functional/no-expression-statements
      console.log(signUpData);
      const { password, username } = signUpData;
      try {
        await auth.signUp({ password, username });
        navigate('/');
      } catch (error) {
        setFailMessage(error.response.status === 409 ? 'User with this name already exists' : 'Sign up failed');
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
                <h2>{content}</h2>
              </Card.Title>
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
                    isInvalid={formik.touched.username && !!formik.errors.username}
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
                    isInvalid={formik.touched.password && !!formik.errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
                  <Form.Label> Repeat password</Form.Label>
                  <Form.Control
                    name="repeatPassword"
                    onChange={formik.handleChange}
                    value={formik.values.repeatPassword}
                    onBlur={formik.handleBlur}
                    type="password"
                    required
                    placeholder="repeatPassword"
                    isInvalid={formik.touched.repeatPassword && !!formik.errors.repeatPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.repeatPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Sign Up
                </Button>
              </Form>
              { isSigUpFailed ? <Alert variant="danger">{failMessage}</Alert> : null }
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
