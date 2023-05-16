/* eslint-disable functional/no-expression-statements */
import React from 'react';
import {
  Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../State/currentChannelIdSlice';

const ChannelsList = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels);
  const currentChannelId = useSelector((state) => state.currentChannelId);

  const handleChannelClick = (id) => {
    dispatch(actions.changeCurrentChannelId(id));
  };

  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((channel) => (
        <li key={channel.id} className="nav-item w-100">
          <Button
            id={channel.id}
            onClick={() => handleChannelClick(channel.id)}
            type="button"
            className="w-100 rounded-0 text-start"
            variant={channel.id === currentChannelId ? 'secondary' : 'light'}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default ChannelsList;
