import type { Ref } from "vue"

export type WidgetData = {
  title: string | number | Ref<string>
  subtitle?: string
  size: 'half' | 'full'
  color?: string
  to?: string
  onClick?: () => void
}
