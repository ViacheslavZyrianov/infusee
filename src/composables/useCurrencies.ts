import type { SelectItem } from '@/types/types.ts'
import i18n from '@/plugins/i18n'
import { computed, type ComputedRef } from 'vue'

export default () => {
  const currencies = computed(() => i18n.global.messages.value[i18n.global.locale.value].currencies)

  const defaultCurrency: keyof typeof currencies.value = 'UAH'

  const currencyOptions: ComputedRef<SelectItem[]> = computed(() =>
    Object.entries(currencies.value).map(([value, { title }]) => ({
      title,
      value,
    })),
  )

  const getCurrencyTitle = (currency: keyof typeof currencies.value): string =>
    currencies.value[currency]?.title || ''

  const getCurrencySymbol = (currency: keyof typeof currencies.value): string =>
    currencies.value[currency]?.symbol || ''

  const getCurrencyTitleAndSymbol = (currency: keyof typeof currencies.value): string =>
    `${currencies.value[currency]?.title} ${currencies.value[currency]?.symbol}` || ''

  return {
    currencies,
    defaultCurrency,
    currencyOptions,
    getCurrencyTitle,
    getCurrencySymbol,
    getCurrencyTitleAndSymbol,
  }
}
