import React, { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toastRenameChannel, toastNetworkError } from '../toastify';
import { useChatAPI } from '../../contexts';
import { setModal } from '../../state/modalSlice';

const RenameChannel = () => {
  const { t } = useTranslation();
  const [isDisabled, setDisabled] = useState(false); // test

  const chatAPI = useChatAPI();

  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const channelsNames = channels.map((channel) => channel.name);
  const id = useSelector((state) => state.modal.subjectChannel);
  const currentChannel = channels.find((channel) => channel.id === id);

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: yup.object({
      name: yup.string()
        .required('Required')
        .notOneOf(channelsNames, t('errorChannelNameIsAlreadyUsed'))
        .max(20, t('errorNewChanelNameMax')),
    }),
    onSubmit: async () => {
      try {
        const { name } = formik.values;
        setDisabled(true); // test
        await chatAPI.renameChannelAPI(id, name);
        dispatch(setModal({ type: '', opened: false, subjectChannel: undefined }));
        toastRenameChannel({ oldName: currentChannel.name, newName: name });
      } catch (error) {
        console.log(error);
        toastNetworkError();
        setDisabled(false);
      }
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
        <div className="modal-title h4">{t('renameChannelHeader')}</div>
        <button onClick={handleCancel} type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" />
      </div>
      <div className="modal-body">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="name" className="visually-hidden">{t('renameChannelLabel')}</Form.Label>
            <Form.Control
              ref={inputRef}
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              required
              aria-label={t('newChannelName')}
              className="mb-2 form-control"
              isInvalid={formik.touched.name && !!formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
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
