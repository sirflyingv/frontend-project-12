import { toast } from 'react-toastify';
import t from '../../i18next/i18next';

const toastNewChannel = (name) => toast.success(t('toastify.toastChannelCreated', { name }), {
  position: toast.POSITION.TOP_RIGHT,
});

const toastRenameChannel = ({ oldName, newName }) => toast.success(t('toastify.toastChannelRenamed', { oldName, newName }), {
  position: toast.POSITION.TOP_RIGHT,
});

const toastDeleteChannel = (name) => toast.success(t('toastify.toastChannelDeleted', { name }), {
  position: toast.POSITION.TOP_RIGHT,
});

const toastNetworkError = () => toast.error(t('toastify.toastNoConnectionToServer'), {
  position: toast.POSITION.TOP_RIGHT,
});

const toastUnspecifiedError = () => toast.error(t('toastify.toastUnspecifiedError'), {
  position: toast.POSITION.TOP_RIGHT,
});

export {
  toastNewChannel, toastRenameChannel, toastDeleteChannel, toastNetworkError, toastUnspecifiedError,
};
