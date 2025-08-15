// src/plugins/global-components.ts
import type { App, Component } from 'vue'

type VueModule = { default: Component }

export function registerGlobalComponents(app: App) {
  const modules = import.meta.glob<VueModule>('@/components/shared/**/*.vue', { eager: true })

  for (const path in modules) {
    const mod = modules[path]
    const component = mod.default
    if (!component) continue

    const parts = path.split('/')
    let name = parts[parts.length - 1].replace('.vue', '')

    // If file is index.vue, use the parent folder name
    if (name.toLowerCase() === 'index') {
      name = parts[parts.length - 2]
    }

    // Register globally with the exact kebab-case name
    app.component(name, component)
  }
}
