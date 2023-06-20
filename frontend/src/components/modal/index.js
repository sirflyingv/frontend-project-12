import CreateNewChannel from './CreateNewChannel';
import DeleteChannel from './DeleteChannel';
import RenameChannel from './RenameChannel';

const modalMapping = {
  deleteChannel: DeleteChannel,
  createChannel: CreateNewChannel,
  renameChannel: RenameChannel,
};

const getModalContent = (modalType) => modalMapping[modalType];

export {
  CreateNewChannel, DeleteChannel, RenameChannel, getModalContent,
};
