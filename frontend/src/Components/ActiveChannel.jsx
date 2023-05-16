import React from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import trySocket from '../ChatSocketAPI';

const ActiveChannel = () => {
  const channels = useSelector((state) => state.channels);
  const messages = useSelector((state) => state.messages);
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const currentMessages = messages.filter((message) => message.channelId === currentChannelId);

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: ({ message }) => {
      const messageData = {
        body: message, channelId: currentChannelId, username: 'Doooorian',
      };
      // eslint-disable-next-line functional/no-expression-statements
      trySocket(messageData);
    },
  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b>{`# ${currentChannel.name}`}</b></p>
          <span className="text-muted">{`${currentMessages.length} сообщений`}</span>
        </div>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {currentMessages.map((message) => (
          <div key={message.id} className="text-break mb-2">
            <b>{message.username}</b>
            {`: ${message.body}`}
          </div>
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <form noValidate="" onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
          <div className="input-group has-validation">
            <input
              name="message"
              onChange={formik.handleChange}
              value={formik.values.message}
              onBlur={formik.handleBlur}
              required
              aria-label="Новое сообщение"
              placeholder="Введите сообщение..."
              className="border-0 p-0 ps-2 form-control"
            />
            <button
              type="submit"
              disabled=""
              className="btn btn-group-vertical"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg>
              <span className="visually-hidden">Отправить</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActiveChannel;
