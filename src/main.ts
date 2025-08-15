import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'
import '@/assets/styles.css'
import { registerGlobalComponents } from '@/plugins/global-components'

import App from './App.vue'
import router from './router'

const app = createApp(App)
registerGlobalComponents(app)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
