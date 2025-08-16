import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'
import '@/assets/styles.css'
import { registerGlobalComponents } from '@/plugins/global-components'
import piniaPersist from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)
registerGlobalComponents(app)

const pinia = createPinia()
pinia.use(piniaPersist)

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
