/* eslint-disable functional/no-expression-statements */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
// import { useFormik } from 'formik';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../ChatSocketAPI';
import { setModal } from '../../State/modalSlice';

const DeleteChannel = () => {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.modal.subjectChannel);

  const handleDelete = (channelId) => {
    console.log(channelId);
    socket.emit('removeChannel', { id: channelId }, (response) => {
      console.log(response);
    });
    dispatch(setModal({ opened: false }));
  };

  const handleCancel = () => {
    dispatch(setModal({ opened: false }));
  };

  return (
    <>
      <div className="modal-header">
        <div className="modal-title h4">Удалить канал</div>
        <button onClick={handleCancel} type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" />
      </div>
      <div className="modal-body">
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button onClick={handleCancel} variant="secondary" className="me-2">Отменить</Button>
          <Button onClick={() => handleDelete(id)} type="submit" variant="danger">Удалить</Button>
        </div>

      </div>
    </>
  );
};

export default DeleteChannel;
