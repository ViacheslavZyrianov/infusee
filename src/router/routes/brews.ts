export default [
  {
    path: '/brews',
    name: 'Brews',
    component: () => import('@/views/brews/index.vue'),
  },
  {
    path: '/brews/:id',
    name: 'Brew Details',
    component: () => import('@/views/brews/[id]/index.vue'),
  },
  {
    path: '/brews/add',
    name: 'Add brew',
    component: () => import('@/views/brews/add/index.vue'),
  },
  {
    path: '/brews/edit/:id',
    name: 'Edit brew',
    component: () => import('@/views/brews/edit/[id]/index.vue'),
  },
]
