/* eslint-disable functional/no-expression-statements */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../ChatSocketAPI';
import { setModal } from '../../State/modalSlice';

const RenameChannel = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.modal.subjectChannel);

  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: () => {
      const { name } = formik.values;
      socket.emit('renameChannel', { id, name }, (response) => {
        console.log(response);
      });
      dispatch(setModal({ type: '', opened: false, subjectChannel: undefined }));
    },
  });

  const handleCancel = () => {
    dispatch(setModal({ type: '', opened: false, subjectChannel: undefined }));
  };

  // autoFocus weirdly doesn't work so this
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <div className="modal-header">
        <div className="modal-title h4">Переименовать канал</div>
        <button onClick={handleCancel} type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" />
      </div>
      <div className="modal-body">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label className="visually-hidden">Переименовать канал</Form.Label>
            <Form.Control
              autoFocus
              ref={inputRef}
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
            <Button onClick={handleCancel} variant="secondary" className="me-2">Отменить</Button>
            <Button type="submit" variant="primary">Переименовать</Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default RenameChannel;
