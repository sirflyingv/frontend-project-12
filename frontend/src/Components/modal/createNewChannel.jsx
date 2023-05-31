/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
import React, { useState } from 'react'; // test
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toastNewChannel } from '../toastify';
import socket from '../../ChatSocketAPI';

import { setModal } from '../../State/modalSlice';

const CreateNewChannel = () => {
  const { t } = useTranslation();

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
      new Promise((resolve, reject) => {
        socket.emit('newChannel', { name }, (response) => {
          if (response.status === 'ok') {
            resolve();
          } else {
            reject();
          }
        });
      })
        .then(() => {
          dispatch(setModal({ opened: false }));
          setDisabled(false);
          toastNewChannel(name);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  const handleCancel = () => {
    dispatch(setModal({ type: '', opened: false, subjectChannel: undefined }));
  };

  return (
    <>
      <div className="modal-header">
        <div className="modal-title h4">{t('addChannel')}</div>
        <button onClick={handleCancel} type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" />
      </div>
      <div className="modal-body">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="name" className="visually-hidden">{t('channelsName')}</Form.Label>
            <Form.Control
              autoFocus
              name="name"
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              required
              aria-label={t('channelsName')}
              className="mb-2 form-control"
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button onClick={handleCancel} variant="secondary" className="me-2">{t('cancel')}</Button>
            <Button type="submit" disabled={isDisabled} variant="primary">{t('send')}</Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default CreateNewChannel;
