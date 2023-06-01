import React, { useEffect } from 'react';
import {
  Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions } from '../State/currentChannelIdSlice';
import { addChannel, removeChannel, renameChannel } from '../State/channelsSlice';
import { setModal } from '../State/modalSlice';
import socket from '../ChatSocketAPI';

const ChannelsList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels);
  const currentChannelId = useSelector((state) => state.currentChannelId);

  const handleChannelClick = (id) => {
    dispatch(actions.changeCurrentChannelId(id));
  };

  const handleDeleteCLick = (id) => {
    console.log('handle delete', id);
    dispatch(setModal({ type: 'deleteChannel', opened: true, subjectChannel: id }));
  };

  const handleRenameCLick = (id) => {
    dispatch(setModal({ type: 'renameChannel', opened: true, subjectChannel: id }));
  };

  useEffect(() => {
    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
    });

    socket.on('removeChannel', ({ id }) => {
      dispatch(removeChannel(id));
    });

    socket.on('renameChannel', ({ id, name }) => {
      dispatch(renameChannel({ id, name }));
    });

    return () => {
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [dispatch]);

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {channels.map((channel) => (
        <li key={channel.id} className="nav-item w-100">
          <Dropdown className="w-100 rounded-0 text-start" as={ButtonGroup}>
            <Button
              onClick={() => handleChannelClick(channel.id)}
              variant={channel.id === currentChannelId ? 'secondary' : 'light'}
              className="w-100 rounded-0 text-start"
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
            {channel.removable && (
              <>
                <Dropdown.Toggle
                  split
                  variant={channel.id === currentChannelId ? 'secondary' : 'light'}
                  id="dropdown-split-basic"
                >
                  <span className="visually-hidden">{t('editChannel')}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleDeleteCLick(channel.id)}>
                    {t('deleteChannelDropDown')}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleRenameCLick(channel.id)}>
                    {t('renameChannelDropDown')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </>
            )}
          </Dropdown>
        </li>
      ))}
    </ul>
  );
};

export default ChannelsList;
