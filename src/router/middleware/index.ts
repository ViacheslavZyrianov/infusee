import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import detectIsPWA from './isPWA.ts'

const publicURLs = ['/privacy-policy', '/terms-of-service', '/not-pwa']

export default {
  beforeEach(to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) {
    if (
      !detectIsPWA() &&
      !publicURLs.includes(to.path) &&
      !import.meta.env.DEV &&
      !import.meta.env.VITE_E2E
    ) {
      next('/not-pwa')
    } else {
      next()
    }
  },
}
