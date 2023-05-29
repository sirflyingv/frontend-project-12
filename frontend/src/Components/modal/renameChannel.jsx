/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
import React, { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toastRenameChannel } from '../toastify';
import socket from '../../ChatSocketAPI';
import { setModal } from '../../State/modalSlice';

const RenameChannel = () => {
  const { t } = useTranslation();
  const [isDisabled, setDisabled] = useState(false); // test

  const dispatch = useDispatch();
  const id = useSelector((state) => state.modal.subjectChannel);

  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: () => {
      const { name } = formik.values;
      setDisabled(true); // test
      new Promise((resolve, reject) => {
        socket.emit('renameChannel', { id, name }, (response) => {
          if (response.status === 'ok') {
            resolve();
          } else {
            reject();
          }
        });
      }).then(() => {
        dispatch(setModal({ type: '', opened: false, subjectChannel: undefined }));
        toastRenameChannel();
      }).catch((error) => {
        console.log(error);
      });
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
        <div className="modal-title h4">{t('renameChannel')}</div>
        <button onClick={handleCancel} type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" />
      </div>
      <div className="modal-body">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label className="visually-hidden">{t('renameChannel')}</Form.Label>
            <Form.Control
              autoFocus
              ref={inputRef}
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              required
              aria-label={t('newChannelName')}
              className="mb-2 form-control"
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button onClick={handleCancel} variant="secondary" className="me-2">{t('cancel')}</Button>
            <Button type="submit" disabled={isDisabled} variant="primary">{t('rename')}</Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default RenameChannel;
