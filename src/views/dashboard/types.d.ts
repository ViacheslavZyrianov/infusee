import type { Component, Ref } from 'vue'

export type WidgetData = {
  title: string | number | Ref<string>
  component?: Component
  subtitle?: string
  size: 'half' | 'full'
  color?: string
  to?: string
  onClick?: () => void
}
