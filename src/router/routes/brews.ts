export default [
  {
    path: '/brews',
    name: 'brews',
    component: () => import('@/views/brews/index.vue'),
  },
  {
    path: '/brews/:id',
    name: 'brew',
    component: () => import('@/views/brews/[id]/index.vue'),
  },
  {
    path: '/brews/add',
    name: 'brew_add',
    component: () => import('@/views/brews/add/index.vue'),
  },
  {
    path: '/brews/edit/:id',
    name: 'brew_edit',
    component: () => import('@/views/brews/edit/[id]/index.vue'),
  },
]
