/* eslint-disable functional/no-expression-statements */
// eslint-disable-next-line import/no-extraneous-dependencies
import { io } from 'socket.io-client';
// import { useDispatch } from 'react-redux';
import { actions } from '../State/messagesSlice';

// const socket = io('<http://192.168.199.5:5001>');
// console.log(socket);

// socket.on('message', (message) => {
//   console.log('kek socket', message);
// });

// socket.emit('connect');
const socket = io();
// console.log(actions);

socket.on('connect', () => {
  console.log('kek socket connected');
});

socket.on('newMessage', (message) => {
//   const dispatch = useDispatch();
  actions.addMessage(message);
  console.log(message);
});

const trySocket = (messageData) => {
  socket.emit('newMessage', messageData);
};

export default trySocket;
