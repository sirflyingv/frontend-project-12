/* eslint-disable functional/no-expression-statements */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import socket from '../../ChatSocketAPI';
import { actions } from '../../State/modalSlice';

const CreateNewChannel = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: () => {
      const { name } = formik.values;
      socket.emit('newChannel', { name }, (response) => {
        console.log(response);
      });
      dispatch(actions.setModal(false));
    },
  });

  return (
    <>
      <div className="modal-header">
        <div className="modal-title h4">Добавить канал</div>
        <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" />
      </div>
      <div className="modal-body">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label className="visually-hidden">Название канала</Form.Label>
            <Form.Control
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              required
              aria-label="Название нового канала"
              className="mb-2 form-control"
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2">Отменить</Button>
            <Button type="submit" variant="primary">Отправить</Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default CreateNewChannel;
