import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import resources from './i18next/locales/index';
import App from './App';
import AuthProvider from './AuthProvider';

// import reportWebVitals from './reportWebVitals';

const rollbarConfig = {
  accessToken: 'cae3d5fc49a04a5c95c4b056b86b0a44',
  environment: 'testenv',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

// function TestError() {
//   const a = null;
//   return a.hello();
// }

const init = async () => {
  const rootEl = document.getElementById('root');
  const root = ReactDOM.createRoot(rootEl);

  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({ resources, fallbackLng: 'ru' });

  root.render(
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        {/* <TestError /> */}
        <AuthProvider>
          <I18nextProvider i18n={i18n}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </I18nextProvider>
        </AuthProvider>
      </ErrorBoundary>
    </RollbarProvider>,
  );
};

init();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
