import i18n from '@/plugins/i18n/index.ts'
import type { BrewMethod } from '@/types/brews.ts'
import type { SelectItem } from '@/types/types.ts'

export default () => {
  const messages = i18n.global.messages.value[i18n.global.locale.value]
  const brewMethods = messages.brew_methods as Record<string, BrewMethod>

  const brewMethodsKeyValue = () =>
    Object.fromEntries(
      Object.values(brewMethods).flatMap((category) => Object.entries(category.methods)),
    )

  const getBrewMethodTitleByValue = (key: string) => brewMethodsKeyValue()[key] || key

  const getBrewMethodsForSelect = (): SelectItem[] => {
    const result: SelectItem[] = []
    const categories = Object.entries(brewMethods)

    categories.forEach(([, categoryData], index) => {
      // Add subheader for category
      result.push({
        type: 'subheader',
        title: categoryData.label,
        icon: categoryData.icon,
      })

      // Add each method as selectable item
      Object.entries(categoryData.methods).forEach(([methodKey, methodLabel]) => {
        result.push({
          title: methodLabel,
          value: methodKey,
        })
      })

      // Add divider between categories (except after the last one)
      if (index < categories.length - 1) {
        result.push({ type: 'divider' })
      }
    })

    return result
  }

  return {
    brewMethodsOptions: brewMethods,
    getBrewMethodTitleByValue,
    getBrewMethodsForSelect,
  }
}
