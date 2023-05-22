/* eslint-disable functional/no-expression-statements */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'; // test
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import socket from '../../ChatSocketAPI';
import { setModal } from '../../State/modalSlice';

const CreateNewChannel = () => {
  const [isDisabled, setDisabled] = useState(false); // test
  const dispatch = useDispatch();
  const channelsNames = useSelector((state) => state.channels.map((channel) => channel.name));

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: yup.object({
      name: yup.string()
        .required('Required')
        .notOneOf(channelsNames, 'Channel with this name already exists')
        .max(15, 'Must be 15 characters or less'),
    }),
    onSubmit: () => {
      const { name } = formik.values;
      setDisabled(true); // test

      socket.emit('newChannel', { name }, (response) => {
        console.log(response);
      });

      dispatch(setModal({ opened: false }));
      setDisabled(false); // test
    },
  });

  const handleCancel = () => {
    dispatch(setModal({ type: '', opened: false, subjectChannel: undefined }));
  };

  return (
    <>
      <div className="modal-header">
        <div className="modal-title h4">Добавить канал</div>
        <button onClick={handleCancel} type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" />
      </div>
      <div className="modal-body">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label className="visually-hidden">Название канала</Form.Label>
            <Form.Control
              autoFocus
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
            <Button onClick={handleCancel} variant="secondary" disabled={isDisabled} className="me-2">Отменить</Button>
            <Button type="submit" variant="primary" disabled={isDisabled}>Отправить</Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default CreateNewChannel;
