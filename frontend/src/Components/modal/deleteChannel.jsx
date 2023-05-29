/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toastDeleteChannel } from '../toastify';
import socket from '../../ChatSocketAPI';
import { setModal } from '../../State/modalSlice';

const DeleteChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isDisabled, setDisabled] = useState(false); // test

  const id = useSelector((state) => state.modal.subjectChannel);

  const handleDelete = (channelId) => {
    setDisabled(true); // test
    new Promise((resolve, reject) => {
      socket.emit('removeChannel', { id: channelId }, (response) => {
        if (response.status === 'ok') {
          resolve();
        } else {
          reject();
        }
      });
    }).then(() => {
      setDisabled(false);
      dispatch(setModal({ opened: false }));
      toastDeleteChannel();
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleCancel = () => {
    dispatch(setModal({ type: '', opened: false, subjectChannel: undefined }));
  };

  return (
    <>
      <div className="modal-header">
        <div className="modal-title h4">{t('deleteChannel')}</div>
        <button onClick={handleCancel} type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" />
      </div>
      <div className="modal-body">
        <p className="lead">{t('sure')}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={handleCancel} variant="secondary" className="me-2">{t('cancel')}</Button>
          <Button onClick={() => handleDelete(id)} type="submit" disabled={isDisabled} variant="danger">{t('delete')}</Button>
        </div>
      </div>
    </>
  );
};

export default DeleteChannel;
