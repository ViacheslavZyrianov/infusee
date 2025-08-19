export type SelectOption = {
  title: string
  value: string | number
  props?: Record<string, unknown>
}

export type SelectSubheader = {
  type: 'subheader'
  title: string
  icon?: string
}

export type SelectDivider = {
  type: 'divider'
}

export type SelectItem = SelectOption | SelectSubheader | SelectDivider
