import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'

const VBtn = {
  variant: 'tonal',
  class: 'text-subtitle-2',
  color: 'primary',
  rounded: true,
}

const field = {
  variant: 'outlined',
  rounded: true,
  density: 'comfortable',
}

export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1976D2',
          background: '#EEEEEE',
        },
      },
      dark: {
        colors: {
          background: '#121212',
        },
      },
    },
  },
  defaults: {
    VBtn,
    VCard: {
      class: 'pa-4',
      VCardTitle: {
        class: 'text-h6 font-weight-medium ma-0 pa-0',
        style: {
          'line-height': 'normal',
        },
      },
      VCardSubtitle: {
        class: 'font-weight-medium mb-2 pa-0 opacity-100 text-grey-darken-1',
      },
      VCardText: {
        class: 'pa-0',
      },
      VCardActions: {
        class: 'mt-4 pa-0',
        VBtn,
      },
    },
    VTextField: field,
    VTextarea: field,
    VSelect: field,
    VAutocomplete: field,
  },
})
