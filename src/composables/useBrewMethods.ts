import type { SelectItem } from '@/types/types'

export default () => {
  const brewMethodsOptions: SelectItem[] = [
    { title: 'Espresso', value: 'espresso' },
    { title: 'V60', value: 'v60' },
    { title: 'Chemex', value: 'chemex' },
    { title: 'French Press', value: 'frenchPress' },
    { title: 'Aeropress', value: 'aeropress' },
    { title: 'Moka Pot', value: 'mokaPot' },
    { title: 'Cold Brew', value: 'coldBrew' },
    { title: 'Siphon', value: 'siphon' },
    { title: 'Turkish', value: 'turkish' },
    { title: 'Drip', value: 'drip' },
    { title: 'Percolator', value: 'percolator' },
    { title: 'Kalita Wave', value: 'kalitaWave' },
    { title: 'Clever Dripper', value: 'cleverDripper' },
    { title: 'Nitro Cold Brew', value: 'nitroColdBrew' },
    { title: 'Vacuum Pot', value: 'vacuumPot' },
    { title: 'Soft Brew', value: 'softBrew' },
    { title: 'Snap Coffee', value: 'snapCoffee' },
    { title: 'Hario Switch', value: 'harioSwitch' },
  ]

  const getBrewMethodTitleByValue = (value: string): string =>
    brewMethodsOptions.find((option) => option.value === value)?.title || 'Unknown Method'

  return {
    brewMethodsOptions,
    getBrewMethodTitleByValue,
  }
}
