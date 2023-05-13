import React from 'react';
import {
  Button,
} from 'react-bootstrap';

const ChannelsList = ({ list }) => (
  <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
    {list.map((channel, i) => (
      <li key={channel.id} className="nav-item w-100">
        <Button type="button" className="w-100 rounded-0 text-start" variant={i === 0 ? 'secondary' : 'light'}>
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      </li>
    ))}
  </ul>
);

export default ChannelsList;
