import { createI18n } from 'vue-i18n'
import en from './en.json'
import uk from './uk.json'

export default createI18n({
  legacy: false,
  messages: {
    en,
    uk,
  },
})
