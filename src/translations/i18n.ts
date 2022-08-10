import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { EN_TRANSLATIONS, FR_TRANSLATIONS } from './languages';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: EN_TRANSLATIONS,
      },
      fr: {
        translation: FR_TRANSLATIONS,
      },
    },
  });

export default i18n;
