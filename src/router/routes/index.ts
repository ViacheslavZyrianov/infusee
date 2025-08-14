import brews from './brews.ts'

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
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/profile/index.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/settings/index.vue'),
  },
  ...brews,
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    meta: {
      layout: 'full-page',
    },
    component: () => import('@/views/privacy-policy/index.vue'),
  },
  {
    path: '/terms-of-service',
    name: 'TermsOfService',
    meta: {
      layout: 'full-page',
    },
    component: () => import('@/views/terms-of-service/index.vue'),
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   meta: { layout: 'CenteredLayout' },
  //   component: () => import('@/views/NotFound/index.vue'),
  // },
]
