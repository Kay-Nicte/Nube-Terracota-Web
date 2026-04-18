import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import es from './es.json'
import en from './en.json'
import fr from './fr.json'
import eu from './eu.json'
import ca from './ca.json'
import gl from './gl.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
      fr: { translation: fr },
      eu: { translation: eu },
      ca: { translation: ca },
      gl: { translation: gl },
    },
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export const languages = [
  { code: 'es', name: 'Castellano' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'eu', name: 'Euskara' },
  { code: 'ca', name: 'Català' },
  { code: 'gl', name: 'Galego' },
]

export default i18n
