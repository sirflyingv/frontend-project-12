import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider as StoreProvider } from 'react-redux';
import store from './State/store';
import resources from './i18next/locales/index';
import App from './App';
import AuthProvider from './AuthProvider';
import rollbarConfig from './config/rollbarConfig';

const init = async () => {
  const rootEl = document.getElementById('root');
  const root = ReactDOM.createRoot(rootEl);

  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({ resources, fallbackLng: 'ru' });

  root.render(
    <StoreProvider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <AuthProvider>
            <I18nextProvider i18n={i18n}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </I18nextProvider>
          </AuthProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </StoreProvider>,
  );
};

init();
