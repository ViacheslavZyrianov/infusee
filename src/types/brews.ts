export type BrewMethod = {
  label: string
  icon: `mdi-${string}`
  methods: Record<string, string>
}

/** Type for all ratings, keyed by their friendly name */
export type RatingsObject = Record<
  string,
  {
    model: string
    label: string
    hint: string
  }
>
