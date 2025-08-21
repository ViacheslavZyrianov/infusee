import { defineStore } from 'pinia'
import { ref, computed, type Ref } from 'vue'
import useCurrencies from '@/composables/useCurrencies.ts'

const supportedLocales = ['en', 'uk'] // your app's available locales

const getDefaultLocale = (): string => {
  const browserLocale = navigator.language.split('-')[0] // "en-US" -> "en"
  return supportedLocales.includes(browserLocale) ? browserLocale : 'en'
}

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const isThemeDark: Ref<boolean> = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)

    const currencies = useCurrencies()
    const currency: Ref<keyof typeof currencies.currencies> = ref(currencies.defaultCurrency)

    const getTheme = computed(() => (isThemeDark.value ? 'dark' : 'light'))
    const toggleTheme = () => {
      isThemeDark.value = !isThemeDark.value
    }

    const locale: Ref<string> = ref(getDefaultLocale())

    return {
      isThemeDark,
      currency,
      getTheme,
      toggleTheme,
      locale,
    }
  },
  {
    persist: {
      storage: localStorage,
    },
  },
)
