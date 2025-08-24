import brews from './brews.ts'
import coffees from './coffees.ts'
import roasters from './roasters.ts'

export default [
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
    meta: {
      layout: 'full-page',
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/index.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile/index.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/settings/index.vue'),
  },
  ...brews,
  ...coffees,
  ...roasters,
  {
    path: '/privacy-policy',
    name: 'privacy_policy',
    meta: {
      layout: 'full-page',
    },
    component: () => import('@/views/privacy-policy/index.vue'),
  },
  {
    path: '/terms-of-service',
    name: 'terms_of_service',
    meta: {
      layout: 'full-page',
    },
    component: () => import('@/views/terms-of-service/index.vue'),
  },
  {
    path: '/not-pwa',
    name: 'not_pwa',
    meta: {
      layout: 'full-page',
    },
    component: () => import('@/views/not-pwa/index.vue'),
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   meta: { layout: 'CenteredLayout' },
  //   component: () => import('@/views/NotFound/index.vue'),
  // },
]
