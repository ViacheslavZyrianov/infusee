export default [
  {
    path: '/roasters',
    name: 'roasters',
    component: () => import('@/views/roasters/index.vue'),
  },
  // {
  //   path: '/brews/add',
  //   name: 'Add brew',
  //   component: () => import('@/views/brews/add/index.vue'),
  // },
  // {
  //   path: '/brews/edit/:id',
  //   name: 'Edit brew',
  //   component: () => import('@/views/brews/edit/[id]/index.vue'),
  // },
]
