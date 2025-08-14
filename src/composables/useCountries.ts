import countries from '@/data/countries.json'

export function useCountries() {
  const getFlag = (countryCode: string): string => {
    const country = countries.find((c) => c.code === countryCode)
    return country ? country.flag : ''
  }

  const getFlagAndName = (countryCode: string): string => {
    const country = countries.find((c) => c.code === countryCode)
    return country ? `${country.flag} ${country.name}` : ''
  }

  const getNameAndFlag = (countryCode: string): string => {
    const country = countries.find((c) => c.code === countryCode)
    return country ? `${country.name} ${country.flag}` : ''
  }

  return {
    countries,
    getFlag,
    getFlagAndName,
    getNameAndFlag,
  }
}
