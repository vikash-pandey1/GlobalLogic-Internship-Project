import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import only the 10 languages used in your dropdown
import en from './locales/en/translation.json';
import zh from './locales/zh/translation.json';
import hi from './locales/hi/translation.json';
import es from './locales/es/translation.json';
import ar from './locales/ar/translation.json';
import bn from './locales/bn/translation.json';
import pt from './locales/pt/translation.json';
import ru from './locales/ru/translation.json';
import ja from './locales/ja/translation.json';
import de from './locales/de/translation.json';

const resources = {
  en: { translation: en },
  zh: { translation: zh },
  hi: { translation: hi },
  es: { translation: es },
  ar: { translation: ar },
  bn: { translation: bn },
  pt: { translation: pt },
  ru: { translation: ru },
  ja: { translation: ja },
  de: { translation: de },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    interpolation: {
      escapeValue: false, // react already safe from xss
    },
  });

export default i18n;
