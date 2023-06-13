import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import modalReducer from './modalSlice';

export default {
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
  },
};
