export type Brew = {
  coffee_id: string | null
  brew_method: string | null
  roaster: string | null
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

export type BrewRead = Brew & { id: string; created_at: string }
