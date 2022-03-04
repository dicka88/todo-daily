import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from './locales/en/translation.json';
import id from './locales/id/translation.json';

const resources = {
  en: {
    translation: en
  },
  id: {
    translation: id
  }
};

i18next.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  debug: true,
  interpolation: {
    escapeValue: false
  }
});

export default i18next;