export type Roaster = {
  title: string
  url: string
  countries: string[]
  notes: string
}

export type RoasterRead = Roaster & { id: string }
