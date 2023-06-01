import { toast } from 'react-toastify';
import t from '../../i18next/i18next';

const toastNewChannel = () => toast.success(t('toastChannelCreated'), {
  position: toast.POSITION.TOP_RIGHT,
});

const toastRenameChannel = () => toast.success(t('toastChannelRenamed'), {
  position: toast.POSITION.TOP_RIGHT,
});

const toastDeleteChannel = () => toast.success(t('toastChannelDeleted'), {
  position: toast.POSITION.TOP_RIGHT,
});

export {
  toastNewChannel, toastRenameChannel, toastDeleteChannel,
};
