export default [
  {
    path: '/coffees',
    name: 'Coffees',
    component: () => import('@/views/coffees/index.vue'),
  },
  {
    path: '/coffees/add',
    name: 'Add coffee',
    component: () => import('@/views/coffees/add/index.vue'),
  },
  {
    path: '/coffees/edit/:id',
    name: 'Edit coffee',
    component: () => import('@/views/coffees/edit/[id]/index.vue'),
  },
]
