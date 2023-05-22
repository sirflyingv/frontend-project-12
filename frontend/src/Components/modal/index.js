import CreateNewChannel from './createNewChannel';
import DeleteChannel from './deleteChannel';
import RenameChannel from './renameChannel';

const modalMapping = {
  deleteChannel: DeleteChannel,
  createChannel: CreateNewChannel,
  renameChannel: RenameChannel,
};

const getModalContent = (modalType) => modalMapping[modalType];

export { CreateNewChannel, DeleteChannel, getModalContent };
