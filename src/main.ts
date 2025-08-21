import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'
import '@/assets/styles.css'
import { registerGlobalComponents } from '@/plugins/global-components'
import piniaPersist from 'pinia-plugin-persistedstate'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'

const app = createApp(App)
registerGlobalComponents(app)

const pinia = createPinia()
pinia.use(piniaPersist)

const i18n = createI18n({
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

app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(i18n)

app.mount('#app')
