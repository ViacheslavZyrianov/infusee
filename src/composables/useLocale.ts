import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/store/settings/index.ts'

export default () => {
  const store = useSettingsStore()
  const { locale: i18nLocale } = useI18n()

  // Sync i18n with Pinia store
  watch(
    () => store.locale,
    (val) => {
      i18nLocale.value = val
    },
    { immediate: true },
  )

  watch(
    () => i18nLocale.value,
    (val) => {
      if (store.locale !== val) store.locale = val
    },
  )

  // Available locales for select
  const localesForSelect = [
    { title: 'English', value: 'en' },
    { title: 'Українська', value: 'uk' },
  ] as const

  // Computed binding to store.locale
  const currentLocale = computed({
    get: () => store.locale,
    set: (val: string) => {
      store.locale = val
    },
  })

  return { localesForSelect, currentLocale }
}
