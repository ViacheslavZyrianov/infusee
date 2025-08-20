import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import detectIsPWA from './isPWA.ts'

export default {
  beforeEach(to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) {
    if (!detectIsPWA() && to.path !== '/not-pwa') {
      next('/not-pwa')
    } else {
      next()
    }
  },
}
