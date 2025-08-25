import i18n from '@/plugins/i18n'
import countries from './countries.json'
import { computed, type ComputedRef } from 'vue'
import type { Country } from '@/types/countries.ts'

export const countriesTranslated: ComputedRef<Country[]> = computed(
  () => countries[i18n.global.locale.value],
)

export default () => {
  const getFlag = (countryCode: string): string => {
    const country = countriesTranslated.value.find((c) => c.code === countryCode)
    return country ? country.flag : ''
  }

  const getFlagAndName = (countryCode: string): string => {
    const country = countriesTranslated.value.find((c) => c.code === countryCode)
    return country ? `${country.flag} ${country.name}` : ''
  }

  const getNameAndFlag = (countryCode: string): string => {
    const country = countriesTranslated.value.find((c) => c.code === countryCode)
    return country ? `${country.name} ${country.flag}` : ''
  }

  return {
    countries: countriesTranslated.value,
    getFlag,
    getFlagAndName,
    getNameAndFlag,
  }
}
