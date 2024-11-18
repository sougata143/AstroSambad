import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './translations/en';
import hi from './translations/hi';
import bn from './translations/bn';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  bn: { translation: bn },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: RNLocalize.getLocales()[0].languageCode,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 