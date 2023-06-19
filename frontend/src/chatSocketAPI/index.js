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

const createChatAPI = (socketIoInstance) => {
  const withTimeout = (promise, timeout) => {
    // eslint-disable-next-line functional/no-let
    let timeoutId;

    const timeoutPromise = new Promise((resolve, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error('Socket emit timed out'));
      }, timeout);
    });

    return Promise.race([promise, timeoutPromise]).finally(() => {
      clearTimeout(timeoutId);
    });
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

      return withTimeout(emitNewChannel, 3000); // Adjust the timeout value as needed
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

      return withTimeout(emitDeleteChannel, 5000); // Adjust the timeout value as needed
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

      return withTimeout(emitRenameChannel, 5000); // Adjust the timeout value as needed
    },

    // deleteChannel: (id) => new Promise((resolve, reject) => {
    //   socketIoInstance.emit('removeChannel', { id }, (response) => {
    //     if (response.status === 'ok') {
    //       resolve();
    //     } else {
    //       reject();
    //     }
    //   });
    // }),

    // renameChannelAPI: (id, name) => new Promise((resolve, reject) => {
    //   socketIoInstance.emit('renameChannel', { id, name }, (response) => {
    //     if (response.status === 'ok') {
    //       resolve();
    //     } else {
    //       reject();
    //     }
    //   });
    // }),

    sendMessage: (messageData) => socketIoInstance.emit('newMessage', messageData),
  };
};

export default createChatAPI;
