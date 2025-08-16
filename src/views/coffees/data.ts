import type { SelectItem } from '@/types/types'

export const processingOptions: SelectItem[] = [
  {
    title: 'Washed',
    value: 'washed',
  },
  {
    title: 'Natural',
    value: 'natural',
  },
  {
    title: 'Honey',
    value: 'honey',
  },
]

export const roastLevelOptions: SelectItem[] = [
  {
    title: 'Light',
    value: 'light',
  },
  {
    title: 'Medium',
    value: 'medium',
  },
  {
    title: 'Dark',
    value: 'dark',
  },
]

const findOptionByValue = (options: SelectItem[], value: string): string =>
  options.find((option) => option.value === value)?.title || '-'

export const getProcessingOptionTitleByValue = (value: string): string =>
  findOptionByValue(processingOptions, value)

export const getRoastLevelOptionTitleByValue = (value: string): string =>
  findOptionByValue(roastLevelOptions, value)
