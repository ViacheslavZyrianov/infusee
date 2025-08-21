import { createI18n } from 'vue-i18n'
import en from './en.json'
import uk from './uk.json'

export default createI18n({
  legacy: false,
  useScope: 'global',
  locale: 'en', // default locale
  fallbackLocale: 'en', // fallback if translation missing
  messages: { en, uk },
})
