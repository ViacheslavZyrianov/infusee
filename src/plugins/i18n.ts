import { createI18n } from 'vue-i18n'

export default createI18n({
  legacy: false,
  messages: {
    en: {
      message: {
        hello: 'hello world',
      },
    },
    uk: {
      message: {
        hello: 'доброго дня',
      },
    },
  },
})
