const createChatAPI = (socketIoInstance) => ({
  createNewChannel: (name) => new Promise((resolve, reject) => {
    socketIoInstance.emit('newChannel', { name }, (response) => {
      if (response.status === 'ok') {
        resolve(response.data);
      } else {
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
