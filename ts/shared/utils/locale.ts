import {initReactI18next} from 'react-i18next';
import i18next from 'i18next';
import he from '../locale/he.json';
import en from '../locale/en.json';

export const loadLocale = (locale: string): void => {
  i18next.use(initReactI18next).init({
    resources: {en, he},
    lng: locale,
    fallbackLng: 'en',
    defaultNS: 'common',
    fallbackNS: 'common',
    debug: true,
  });
};
