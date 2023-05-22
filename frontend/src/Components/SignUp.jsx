import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

const SignUp = () => {
  const content = 'Регистрация';

  const formik = useFormik({
    initialValues: { username: '', password: '', repeatPassword: '' },
    validationSchema: yup.object({
      username: yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      password: yup.string()
        .min(4, 'Must be 6 characters or more')
        .required('Required'),
      repeatPassword: yup.string()
        .min(4, 'Must be 6 characters or more')
        .required('Required'),
    }),
    onSubmit: (authData) => {
      // eslint-disable-next-line functional/no-expression-statements
      console.log(authData);
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
                    isInvalid={!!formik.errors.repeatPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.repeatPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
