export type Coffee = {
  name: string
  roaster_id: string | null
  roast_level: string | null
  cupping_score: number | null
  is_specialty: boolean
  is_public: boolean
  country: string | null
  processing: string | null
  notes: string
  brew_date: string
  price: number | null
  user_id?: string
}

export type CoffeeRead = Coffee & { id: number }
