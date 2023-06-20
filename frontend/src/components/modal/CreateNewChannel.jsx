import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toastNewChannel, toastNetworkError } from '../toastify';

import { useChatAPI } from '../../contexts';

import { changeCurrentChannelId } from '../../state/channelsSlice';
import { setModal } from '../../state/modalSlice';

const CreateNewChannel = () => {
  const { t } = useTranslation();

  const [isDisabled, setDisabled] = useState(false);

  const chatAPI = useChatAPI();
  const dispatch = useDispatch();
  const channelsNames = useSelector((state) => state.channels.channels
    .map((channel) => channel.name));

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: yup.object({
      name: yup.string()
        .required(t('modalCreateNewChannel.required'))
        .notOneOf(channelsNames, t('modalCreateNewChannel.errorAlreadyUsed'))
        .max(20, t('modalCreateNewChannel.errorMaxLength')),
    }),
    onSubmit: async () => {
      try {
        const { name } = formik.values;
        setDisabled(true);
        const { id } = await chatAPI.createNewChannel(name);
        dispatch(changeCurrentChannelId(id));
        dispatch(setModal({ opened: false }));
        toastNewChannel(name);
      } catch (error) {
        setDisabled(false);
        toastNetworkError();
        console.log(error);
      }
    },
  });

  const handleCancel = () => {
    dispatch(setModal({ type: '', opened: false, subjectChannel: undefined }));
  };

  return (
    <>
      <div className="modal-header">
        <div className="modal-title h4">{t('modalCreateNewChannel.addChannel')}</div>
        <button onClick={handleCancel} type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" />
      </div>
      <div className="modal-body">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label className="visually-hidden">{t('modalCreateNewChannel.channelsName')}</Form.Label>
            <Form.Control
              autoFocus
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              required
              aria-label={t('modalCreateNewChannel.channelsName')}
              className="mb-2 form-control"
              isInvalid={formik.touched.name && !!formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button onClick={handleCancel} variant="secondary" className="me-2">{t('modalCreateNewChannel.cancel')}</Button>
            <Button type="submit" disabled={isDisabled} variant="primary">{t('modalCreateNewChannel.send')}</Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default CreateNewChannel;
