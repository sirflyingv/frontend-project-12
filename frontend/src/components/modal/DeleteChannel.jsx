import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toastDeleteChannel, toastNetworkError } from '../toastify';
import { useChatAPI } from '../../contexts';

import { setModal } from '../../state/modalSlice';
import { changeCurrentChannelId } from '../../state/channelsSlice';

const DeleteChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const chatAPI = useChatAPI();

  const [isDisabled, setDisabled] = useState(false); // test

  const id = useSelector((state) => state.modal.subjectChannel);
  const subjectChannel = useSelector((state) => state.channels.channels.find((ch) => ch.id === id));
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );

  const handleDelete = async (channelId) => {
    try {
      setDisabled(true); // test
      await chatAPI.deleteChannel(channelId);
      dispatch(setModal({ opened: false }));
      setDisabled(false);
      toastDeleteChannel(subjectChannel.name);
      if (channelId === currentChannelId) dispatch(changeCurrentChannelId(1)); // magic number
    } catch (error) {
      console.log(error);
      toastNetworkError();
      setDisabled(false);
    }
  };

  const handleCancel = () => {
    dispatch(setModal({ type: '', opened: false, subjectChannel: undefined }));
  };

  return (
    <>
      <div className="modal-header">
        <div className="modal-title h4">
          {t('modalDeleteChannel.deleteChannel')}
        </div>
        <button
          onClick={handleCancel}
          type="button"
          aria-label="Close"
          data-bs-dismiss="modal"
          className="btn btn-close"
        />
      </div>
      <div className="modal-body">
        <p className="lead">{t('modalDeleteChannel.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={handleCancel} variant="secondary" className="me-2">
            {t('modalDeleteChannel.cancel')}
          </Button>
          <Button
            onClick={() => handleDelete(id)}
            type="submit"
            disabled={isDisabled}
            variant="danger"
          >
            {t('modalDeleteChannel.delete')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default DeleteChannel;
