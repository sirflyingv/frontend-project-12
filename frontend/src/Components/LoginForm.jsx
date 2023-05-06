import React from 'react';
import { useFormik } from 'formik';

function LoginForm() {
  const formik = useFormik({
    initialValues: { name: '', password: '' },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">
        Name
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
      </label>

      <label htmlFor="name">
        Password
        <input
          id="password"
          name="password"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginForm;
