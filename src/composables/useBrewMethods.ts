import { computed } from 'vue'
import type { SelectItem } from '@/types/types'

export const brewMethods = {
  aeropress: 'Aeropress',
  chemex: 'Chemex',
  cleverDripper: 'Clever Dripper',
  coldBrew: 'Cold Brew',
  drip: 'Drip',
  espresso: 'Espresso',
  frenchPress: 'French Press',
  harioSwitch: 'Hario Switch',
  kalitaWave: 'Kalita Wave',
  mokaPot: 'Moka Pot',
  nitroColdBrew: 'Nitro Cold Brew',
  percolator: 'Percolator',
  siphon: 'Siphon',
  snapCoffee: 'Snap Coffee',
  softBrew: 'Soft Brew',
  turkish: 'Turkish',
  vacuumPot: 'Vacuum Pot',
  v60: 'V60',
} as const

export type BrewMethodKey = keyof typeof brewMethods
export type BrewMethodValue = (typeof brewMethods)[BrewMethodKey]

export enum BrewCategory {
  Espresso = 'Espresso',
  PourOver = 'PourOver',
  Immersion = 'Immersion',
  Cold = 'Cold',
  Drip = 'Drip',
}

// Гарні назви категорій
export const categoryLabels: Record<BrewCategory, string> = {
  [BrewCategory.Espresso]: 'Espresso',
  [BrewCategory.PourOver]: 'Pour Over',
  [BrewCategory.Immersion]: 'Immersion',
  [BrewCategory.Cold]: 'Cold',
  [BrewCategory.Drip]: 'Drip',
}

// Іконки для категорій
const categoryIcons: Record<BrewCategory, string> = {
  [BrewCategory.Espresso]: 'mdi-coffee',
  [BrewCategory.PourOver]: 'mdi-filter',
  [BrewCategory.Immersion]: 'mdi-cup-water',
  [BrewCategory.Cold]: 'mdi-snowflake',
  [BrewCategory.Drip]: 'mdi-water',
}

// Категорії з методами
export const categories: Record<BrewCategory, BrewMethodKey[]> = {
  [BrewCategory.Espresso]: ['espresso', 'mokaPot', 'turkish', 'percolator'],
  [BrewCategory.PourOver]: [
    'v60',
    'chemex',
    'kalitaWave',
    'harioSwitch',
    'cleverDripper',
    'softBrew',
  ],
  [BrewCategory.Immersion]: ['frenchPress', 'aeropress', 'siphon', 'vacuumPot'],
  [BrewCategory.Cold]: ['coldBrew', 'nitroColdBrew', 'snapCoffee'],
  [BrewCategory.Drip]: ['drip'],
}

export default () => {
  const brewMethodsOptions = computed(() => {
    const items: SelectItem[] = []

    const categoryEntries = Object.entries(categories) as [BrewCategory, BrewMethodKey[]][]

    categoryEntries.forEach(([category, keys], index) => {
      items.push({
        type: 'subheader',
        title: categoryLabels[category],
        icon: categoryIcons[category],
      })

      keys.forEach((key) => {
        items.push({
          title: brewMethods[key],
          value: key,
        })
      })

      if (index < categoryEntries.length - 1) {
        items.push({ type: 'divider' })
      }
    })

    return items
  })

  const getBrewMethodTitleByValue = (value: BrewMethodKey): BrewMethodValue => brewMethods[value]

  return {
    brewMethodsOptions,
    getBrewMethodTitleByValue,
  }
}
