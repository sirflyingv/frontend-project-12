import React from 'react';
import {
  Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { changeCurrentChannelId } from '../state/channelsSlice';
import { setModal } from '../state/modalSlice';

const ChannelsList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const handleChannelClick = (id) => {
    dispatch(changeCurrentChannelId(id));
  };

  const handleDeleteCLick = (id) => {
    dispatch(setModal({ type: 'deleteChannel', opened: true, subjectChannel: id }));
  };

  const handleRenameCLick = (id) => {
    dispatch(setModal({ type: 'renameChannel', opened: true, subjectChannel: id }));
  };

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
                  <span className="visually-hidden">{t('channelsList.editChannel')}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleDeleteCLick(channel.id)}>
                    {t('channelsList.deleteChannelDropDown')}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleRenameCLick(channel.id)}>
                    {t('channelsList.renameChannelDropDown')}
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
