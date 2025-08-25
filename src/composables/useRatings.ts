import { computed, type ComputedRef } from 'vue'
import i18n from '@/plugins/i18n'
import type { RatingsObject } from '@/types/brews.ts'

/**
 * Composable for working with coffee Brew ratings.
 * Fetches all ratings dynamically from i18n and provides helpers.
 */
export function useRatings() {
  const ratings: ComputedRef<RatingsObject> = computed(() =>
    Object.fromEntries(
      Object.entries(
        i18n.global.messages.value[i18n.global.locale.value].brew_form.ratings.items,
      ).map(([key, { title, hint }]) => [
        key,
        {
          model: `rating_${key}`,
          label: title,
          hint,
        },
      ]),
    ),
  )

  /** Array of all rating keys for iteration */
  const ratingKeys = computed(() => Object.keys(ratings.value))

  /** Get the human-readable label for a rating key */
  const ratingLabel = (key: string) => ratings.value[key]?.label ?? key

  /** Get the model field name for a rating key */
  const ratingModel = (key: string) => ratings.value[key]?.model ?? key

  /** Compute the average rating from a form object */
  const ratingAverage = (form: Record<string, number>) => {
    const keys = ratingKeys.value
    const sum = keys.reduce((acc, key) => acc + (form[ratingModel(key)] ?? 0), 0)
    return parseFloat((sum / keys.length).toFixed(2))
  }

  return { ratings, ratingKeys, ratingLabel, ratingModel, ratingAverage }
}
