import React from 'react';

import moment from 'moment';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.scss';
import Providers from './lib/Providers';
import { frLocale } from './lib/locales';
import i18n from './translations/i18n';

moment.defineLocale('fr', frLocale);
moment.locale(i18n.language);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
