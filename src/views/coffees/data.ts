import type { SelectItem, SelectOption } from '@/types/types.ts'
import i18n from '@/plugins/i18n'
import { computed, type ComputedRef } from 'vue'

export const processingOptions: ComputedRef<SelectItem[]> = computed(
  () => i18n.global.messages.value[i18n.global.locale.value].processing_options,
)

export const roastLevelOptions: ComputedRef<SelectItem[]> = computed(
  () => i18n.global.messages.value[i18n.global.locale.value].roast_level_options,
)

const findOptionByValue = (options: SelectItem[], value: string | number): string => {
  const option = options.find(
    (selectOption): selectOption is SelectOption =>
      'value' in selectOption && selectOption.value === value,
  )
  return option?.title ?? '-'
}

export const getProcessingOptionTitleByValue = (value: string): string =>
  findOptionByValue(processingOptions.value, value)

export const getRoastLevelOptionTitleByValue = (value: string): string =>
  findOptionByValue(roastLevelOptions.value, value)
