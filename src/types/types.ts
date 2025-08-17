export type SelectItem =
  | { type?: undefined; title: string; value: string | number; props?: Record<string, unknown> }
  | { type: 'subheader'; title: string; icon?: string }
  | { type: 'divider' }
