import React from 'react';
import ReactDOM from 'react-dom/client';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider as StoreProvider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import reducers from './state/store';
import {
  addChannel, removeChannel, renameChannel,
} from './state/channelsSlice';
import { addMessage } from './state/messagesSlice';

import resources from './i18next/locales/index';
import View from './View';
import AuthProvider from './AuthProvider';
import createChatAPI from './chatSocketAPI';
import { ChatAPIContext } from './contexts';
import rollbarConfig from './config/rollbarConfig';

const App = async () => {
  const rootEl = document.getElementById('root');
  const root = ReactDOM.createRoot(rootEl);

  const store = configureStore(reducers);
  const { dispatch } = store;

  const socket = io();
  socket.on('newChannel', (channel) => dispatch(addChannel(channel)));
  socket.on('removeChannel', ({ id }) => dispatch(removeChannel(id)));
  socket.on('renameChannel', ({ id, name }) => dispatch(renameChannel({ id, name })));
  socket.on('newMessage', (message) => dispatch(addMessage(message)));

  const chatAPI = createChatAPI(socket);
  socket.connect();

  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({ resources, fallbackLng: 'ru' });

  root.render(
    <StoreProvider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <AuthProvider>
            <ChatAPIContext.Provider value={chatAPI}>
              <I18nextProvider i18n={i18n}>
                <View />
              </I18nextProvider>
            </ChatAPIContext.Provider>
          </AuthProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </StoreProvider>,
  );
};

export default App;
