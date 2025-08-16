import type { SelectItem } from '@/types/types'

const currencies = {
  UAH: { title: 'Ukrainian Hryvnia', symbol: '₴' },
  USD: { title: 'US Dollar', symbol: '$' },
  EUR: { title: 'Euro', symbol: '€' },
  CAD: { title: 'Canadian Dollar', symbol: 'C$' },
}

export default () => {
  const defaultCurrency: keyof typeof currencies = 'UAH'

  const currencyOptions: SelectItem[] = Object.entries(currencies).map(([value, { title }]) => ({
    title,
    value,
  }))

  const getCurrencyTitle = (currency: keyof typeof currencies): string =>
    currencies[currency]?.title || ''

  const getCurrencySymbol = (currency: keyof typeof currencies): string =>
    currencies[currency]?.symbol || ''

  const getCurrencyTitleAndSymbol = (currency: keyof typeof currencies): string =>
    `${currencies[currency]?.title} ${currencies[currency]?.symbol}` || ''

  return {
    defaultCurrency,
    currencyOptions,
    getCurrencyTitle,
    getCurrencySymbol,
    getCurrencyTitleAndSymbol,
  }
}
