import { defineStore } from 'pinia'
import { ref, computed, type Ref } from 'vue'
import useCurrencies from '@/composables/useCurrencies.ts'
import i18n from '@/plugins/i18n'
import { useLocale } from 'vuetify'

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const isThemeDark: Ref<boolean> = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)

    const currencies = useCurrencies()
    const currency: Ref<keyof typeof currencies.currencies.value> = ref(currencies.defaultCurrency)
    const { current: currentVuetifyLocale } = useLocale()

    const getTheme = computed(() => (isThemeDark.value ? 'dark' : 'light'))
    const toggleTheme = () => {
      isThemeDark.value = !isThemeDark.value
    }

    type Locale = typeof i18n.global.locale.value

    const locale: Ref<Locale> = ref(i18n.global.locale.value)

    const setLocale = (newLocale: Locale) => {
      locale.value = newLocale
      i18n.global.locale.value = newLocale
      currentVuetifyLocale.value = newLocale
    }

    return {
      isThemeDark,
      currency,
      getTheme,
      toggleTheme,
      locale,
      setLocale,
    }
  },
  {
    persist: {
      storage: localStorage,
    },
  },
)
