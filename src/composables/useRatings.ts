// useRatings.ts

/**
 * Ratings definition: maps a friendly key to its model field and display label.
 */
export const Ratings = {
  Aroma: { model: 'rating_aroma', label: 'Aroma' },
  Flavor: { model: 'rating_flavor', label: 'Flavor' },
  Acidity: { model: 'rating_acidity', label: 'Acidity' },
  Bitterness: { model: 'rating_bitterness', label: 'Bitterness' },
  Body: { model: 'rating_body', label: 'Body' },
  Aftertaste: { model: 'rating_aftertaste', label: 'Aftertaste' },
  Sweetness: { model: 'rating_sweetness', label: 'Sweetness' },
} as const

/** Type for the rating keys, e.g., 'Aroma', 'Flavor', etc. */
export type RatingKey = keyof typeof Ratings

/** Type for the model fields, e.g., 'rating_aroma', 'rating_flavor', etc. */
export type RatingModel = (typeof Ratings)[RatingKey]['model']

/**
 * Composable for working with coffee Brew ratings.
 * Provides helpers for iterating over ratings, retrieving labels, model fields, and computing averages.
 */
export function useRatings() {
  /**
   * Array of all rating keys for iteration.
   * @type {RatingKey[]}
   */
  const ratingKeys: RatingKey[] = Object.keys(Ratings) as RatingKey[]

  /**
   * Get the human-readable label for a rating key.
   * @param {RatingKey} key - The rating key (e.g., 'Aroma').
   * @returns {string} The label for display.
   */
  const ratingLabel = (key: RatingKey) => Ratings[key].label

  /**
   * Get the model field name for a rating key.
   * Useful for binding v-model in Vue.
   * @param {RatingKey} key - The rating key.
   * @returns {RatingModel} The corresponding model field (e.g., 'rating_aroma').
   */
  const ratingModel = (key: RatingKey) => Ratings[key].model

  /**
   * Compute the average rating from a form object.
   * @param {Record<RatingModel, number>} form - The Brew form object containing rating fields.
   * @returns {number} The average of all ratings.
   */
  const ratingAverage = (form: Record<RatingModel, number>) => {
    const sum = ratingKeys.reduce((acc, key) => acc + form[Ratings[key].model], 0)
    return parseFloat((sum / ratingKeys.length).toFixed(2))
  }

  return { Ratings, ratingKeys, ratingLabel, ratingModel, ratingAverage }
}
