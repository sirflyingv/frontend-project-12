import { io } from 'socket.io-client';
import store from '../State/store';
import {
  addChannel, removeChannel, renameChannel, /* , changeCurrentChannelId, */
} from '../State/channelsSlice';
import { addMessage } from '../State/messagesSlice';

const socket = io();

const { dispatch } = store;

socket.on('newChannel', (channel) => {
  dispatch(addChannel(channel));
});

socket.on('removeChannel', ({ id }) => {
  dispatch(removeChannel(id));
});

socket.on('renameChannel', ({ id, name }) => {
  dispatch(renameChannel({ id, name }));
});

socket.on('newMessage', (message) => {
  dispatch(addMessage(message));
});

const chatAPI = {
  createNewChannel: (name) => new Promise((resolve, reject) => {
    socket.emit('newChannel', { name }, (response) => {
      if (response.status === 'ok') {
        // dispatch(changeCurrentChannelId(response.data.id));
        resolve(response.data);
      } else {
        reject();
      }
    });
  }),

  deleteChannel: (id) => new Promise((resolve, reject) => {
    socket.emit('removeChannel', { id }, (response) => {
      if (response.status === 'ok') {
        resolve();
      } else {
        reject();
      }
    });
  }),

  renameChannelAPI: (id, name) => new Promise((resolve, reject) => {
    socket.emit('renameChannel', { id, name }, (response) => {
      if (response.status === 'ok') {
        resolve();
      } else {
        reject();
      }
    });
  }),

  sendMessage: (messageData) => socket.emit('newMessage', messageData),
};

export { chatAPI };

export default socket;
