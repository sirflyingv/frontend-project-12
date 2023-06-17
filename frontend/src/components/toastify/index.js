import { toast } from 'react-toastify';
import t from '../../i18next/i18next';

const toastNewChannel = (name) => toast.success(t('toastChannelCreated', { name }), {
  position: toast.POSITION.TOP_RIGHT,
});

const toastRenameChannel = ({ oldName, newName }) => toast.success(t('toastChannelRenamed', { oldName, newName }), {
  position: toast.POSITION.TOP_RIGHT,
});

const toastDeleteChannel = (name) => toast.success(t('toastChannelDeleted', { name }), {
  position: toast.POSITION.TOP_RIGHT,
});

export {
  toastNewChannel, toastRenameChannel, toastDeleteChannel,
};
