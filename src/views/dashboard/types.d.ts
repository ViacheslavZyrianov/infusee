import type { Component, Ref } from 'vue'

export type WidgetData = {
  component?: Component
  title?: string | number | Ref<string>
  subtitle?: string
  size: 'half' | 'full'
  color?: string
  to?: string
  onClick?: () => void
}
