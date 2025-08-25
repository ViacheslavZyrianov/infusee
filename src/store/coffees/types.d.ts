import type { RoasterRead } from '@/store/roasters/types'

export type Coffee = {
  name: string
  roaster_id: string | null
  roast_level: string | null
  cupping_score: number | null
  country: string | null
  processing: string | null
  notes: string
  roast_date: string | null
  price: number | null
  user_id?: string
}

export type CoffeeRead = Coffee & { id: number; roasters: Pick<RoasterRead, 'title'> }

export type CoffeesLoading = {
  getCoffees?: boolean
  getCoffeesTotalCount?: boolean
}

export type CoffeeLoading = {
  getCoffees?: boolean
  postCoffee?: boolean
  getCoffee?: boolean
  updateCoffee?: boolean
  deleteCoffee?: boolean
}
