import type { SelectItem } from '@/types/types.ts'

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
  {
    title: 'Wet-Hulled',
    value: 'wet_hulled',
  },
  {
    title: 'Anaerobic Fermentation',
    value: 'anaerobic_fermentation',
  },
  {
    title: 'Carbonic Maceration',
    value: 'carbonic_maceration',
  },
  {
    title: 'Experimental / Other',
    value: 'other',
  },
]

export const roastLevelOptions: SelectItem[] = [
  { title: 'Light', value: 'light' },
  { title: 'Light-Medium', value: 'light_medium' },
  { title: 'Medium', value: 'medium' },
  { title: 'Medium-Dark', value: 'medium_dark' },
  { title: 'Dark', value: 'dark' },
  { title: 'Very Dark', value: 'very_dark' },
]

const findOptionByValue = (options: SelectItem[], value: string): string =>
  options.find((option) => option.value === value)?.title || '-'

export const getProcessingOptionTitleByValue = (value: string): string =>
  findOptionByValue(processingOptions, value)

export const getRoastLevelOptionTitleByValue = (value: string): string =>
  findOptionByValue(roastLevelOptions, value)
