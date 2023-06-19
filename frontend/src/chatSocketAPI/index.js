const TIMEOUT_TIME = 3000;

const createChatAPI = (socketIoInstance) => {
  const withTimeout = async (promise, timeout) => {
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Socket emit timed out'));
      }, timeout);
    });

    return Promise.race([promise, timeoutPromise]);
  };

  return {
    createNewChannel: (name) => {
      const emitNewChannel = new Promise((resolve, reject) => {
        socketIoInstance.emit('newChannel', { name }, (response) => {
          if (response.status === 'ok') {
            resolve(response.data);
          } else {
            reject();
          }
        });
      });

      return withTimeout(emitNewChannel, TIMEOUT_TIME);
    },

    deleteChannel: (id) => {
      const emitDeleteChannel = new Promise((resolve, reject) => {
        socketIoInstance.emit('removeChannel', { id }, (response) => {
          if (response.status === 'ok') {
            resolve();
          } else {
            reject();
          }
        });
      });

      return withTimeout(emitDeleteChannel, TIMEOUT_TIME);
    },

    renameChannelAPI: (id, name) => {
      const emitRenameChannel = new Promise((resolve, reject) => {
        socketIoInstance.emit('renameChannel', { id, name }, (response) => {
          if (response.status === 'ok') {
            resolve();
          } else {
            reject();
          }
        });
      });

      return withTimeout(emitRenameChannel, TIMEOUT_TIME);
    },

    sendMessage: (messageData) => {
      const emitNewMessage = new Promise((resolve, reject) => {
        socketIoInstance.emit('newMessage', messageData, (response) => {
          if (response.status === 'ok') {
            resolve();
          } else {
            reject();
          }
        });
      });

      return withTimeout(emitNewMessage, TIMEOUT_TIME);
    },
  };
};

export default createChatAPI;
