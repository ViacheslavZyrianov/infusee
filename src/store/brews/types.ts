import type { BrewMethodKey } from '@/composables/useBrewMethods.ts'
import type { CoffeeRead } from '@/store/coffees/types'

export type Brew = {
  coffee_id: string | null
  brew_method: BrewMethodKey | null
  rating_aroma: number
  rating_flavor: number
  rating_acidity: number
  rating_bitterness: number
  rating_sweetness: number
  rating_body: number
  rating_aftertaste: number
  grind: string | null
  dose: string | null
  channeling: string | null
  output: string | null
  notes: string | null
}

export type BrewRead = Brew & { id: string; coffees: Pick<CoffeeRead, 'name'>; created_at: string }

export type BrewsLoading = {
  getBrews: boolean
}

export type BrewLoading = {
  getBrew: boolean
  postBrew: boolean
  updateBrew: boolean
  deleteBrew: boolean
}
