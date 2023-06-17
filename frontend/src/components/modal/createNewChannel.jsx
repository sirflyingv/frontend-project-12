import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toastNewChannel } from '../toastify';

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
        .required('Required')
        .notOneOf(channelsNames, t('errorChannelNameIsAlreadyUsed'))
        .max(20, t('errorNewChanelNameMax')),
    }),
    onSubmit: async () => {
      const { name } = formik.values;
      setDisabled(true);
      const { id } = await chatAPI.createNewChannel(name);
      dispatch(changeCurrentChannelId(id));
      dispatch(setModal({ opened: false }));
      toastNewChannel(name);
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
            <Form.Label className="visually-hidden">{t('channelsName')}</Form.Label>
            <Form.Control
              autoFocus
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              required
              aria-label={t('channelsName')}
              className="mb-2 form-control"
              isInvalid={formik.touched.name && !!formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
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
