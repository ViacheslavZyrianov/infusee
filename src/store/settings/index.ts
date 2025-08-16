import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const isThemeDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)
  const isShowDayNightCodes = ref(true)

  const getTheme = computed(() => (isThemeDark.value ? 'dark' : 'light'))

  const toggleTheme = () => {
    isThemeDark.value = !isThemeDark.value
  }

  return {
    isThemeDark,
    isShowDayNightCodes,
    getTheme,
    toggleTheme,
  }
})
