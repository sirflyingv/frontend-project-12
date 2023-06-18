// const withTimeout = (onSuccess, onTimeout, timeout) => {
//   // eslint-disable-next-line functional/no-let
//   let called = false;

//   const timer = setTimeout(() => {
//     if (called) return;
//     called = true;
//     onTimeout();
//   }, timeout);

//   return (...args) => {
//     if (called) return;
//     called = true;
//     clearTimeout(timer);
//     onSuccess.apply(this, args);
//   };
// };

// socket.emit('hello', 1, 2, withTimeout(() => {
//   console.log('success!');
// }, () => {
//   console.log('timeout!');
// }, 1000));

const createChatAPI = (socketIoInstance) => ({

  createNewChannel: (name) => new Promise((resolve, reject) => {
    socketIoInstance.emit('newChannel', { name }, (response) => {
      if (response.status === 'ok') {
        resolve(response.data);
      } else {
        console.log('here');
        reject();
      }
    });
  }),

  deleteChannel: (id) => new Promise((resolve, reject) => {
    socketIoInstance.emit('removeChannel', { id }, (response) => {
      if (response.status === 'ok') {
        resolve();
      } else {
        reject();
      }
    });
  }),

  renameChannelAPI: (id, name) => new Promise((resolve, reject) => {
    socketIoInstance.emit('renameChannel', { id, name }, (response) => {
      if (response.status === 'ok') {
        resolve();
      } else {
        reject();
      }
    });
  }),

  sendMessage: (messageData) => socketIoInstance.emit('newMessage', messageData),
});

export default createChatAPI;
