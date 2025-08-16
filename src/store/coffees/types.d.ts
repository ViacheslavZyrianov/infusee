export type Coffee = {
  name: string
  cupping_score: number | null
  is_specialty: boolean
  is_public: boolean
  country: string | null
  processing: string | null
  roast_level: string
  notes: string
  brew_date: string
  user_id?: string
}

export type CoffeeRead = Coffee & { id: number }
