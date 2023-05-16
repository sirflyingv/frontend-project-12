import React from 'react';
import {
  Button,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ChannelsList = () => {
  const channels = useSelector((state) => state.channels);
  const currentChannelId = useSelector((state) => state.currentChannelId);

  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((channel) => (
        <li key={channel.id} className="nav-item w-100">
          <Button
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
