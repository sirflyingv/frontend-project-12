import React, { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toastRenameChannel } from '../toastify';
import { useChatAPI } from '../../Contexts';
import { setModal } from '../../State/modalSlice';

const RenameChannel = () => {
  const { t } = useTranslation();
  const [isDisabled, setDisabled] = useState(false); // test

  const chatAPI = useChatAPI();

  const dispatch = useDispatch();
  const id = useSelector((state) => state.modal.subjectChannel);

  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: async () => {
      const { name } = formik.values;
      setDisabled(true); // test
      await chatAPI.renameChannelAPI(id, name);
      dispatch(setModal({ type: '', opened: false, subjectChannel: undefined }));
      toastRenameChannel();
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
              autoFocus
              ref={inputRef}
              id="name"
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
