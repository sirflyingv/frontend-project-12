import React from 'react';
import { useTranslation } from 'react-i18next';
import notFound from '../assets/404.svg';
import appRoutes from '../routes/appRoutes';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt={t('pageNotFound')} className="img-fluid h-25" src={notFound} />
      <h1 className="h4 text-muted">{t('pageNotFound')}</h1>
      <p className="text-muted">
        {t('butCanNavigate')}
        {' '}
        <a href={appRoutes.mainPage}>{t('toMain')}</a>
      </p>

    </div>
  );
};

export default NotFound;
