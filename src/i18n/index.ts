import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import es from './locales/es.json';
import en from './locales/en.json';

i18n
  // 1. Detecta el idioma del navegador automáticamente
  .use(LanguageDetector)
  // 2. Conecta con React
  .use(initReactI18next)
  .init({
    // Recursos de traducción
    resources: {
      es: { translation: es },
      en: { translation: en },
    },

    // Idioma fallback si la detección falla
    fallbackLng: 'es',

    // Idiomas soportados
    supportedLngs: ['es', 'en'],

    // Configuración del detector de idioma del navegador
    detection: {
      // Orden de detección: primero localStorage, luego el navegador
      order: ['localStorage', 'navigator'],
      // Clave en localStorage para persistir la elección del usuario
      lookupLocalStorage: 'sunshide-language',
      // Guarda la elección en localStorage automáticamente
      caches: ['localStorage'],
    },

    interpolation: {
      // React ya protege contra XSS, no hace falta escapar
      escapeValue: false,
    },

    // No loguear warnings en producción
    debug: false,
  });

export default i18n;
