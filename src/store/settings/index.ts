import { defineStore } from 'pinia'
import { ref, computed, type Ref } from 'vue'
import useCurrencies from '@/composables/useCurrencies.ts'

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

    const localesForSelect = [
      { title: 'English', value: 'en' },
      { title: 'Українська', value: 'uk' },
    ]

    // Union type of values
    type Locale = (typeof localesForSelect)[number]['value'] // "en" | "uk"

    const locale: Ref<Locale> = ref('uk' as Locale)

    const setLocale = (newLocale: Locale) => {
      locale.value = newLocale
    }

    return {
      isThemeDark,
      currency,
      getTheme,
      toggleTheme,
      locale,
      localesForSelect,
      setLocale,
    }
  },
  {
    persist: {
      storage: localStorage,
    },
  },
)
