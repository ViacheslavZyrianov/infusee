export default [
  {
    path: '/coffees',
    name: 'coffees',
    component: () => import('@/views/coffees/index.vue'),
  },
  {
    path: '/coffees/add',
    name: 'coffee_add',
    component: () => import('@/views/coffees/add/index.vue'),
  },
  {
    path: '/coffees/edit/:id',
    name: 'coffee_edit',
    component: () => import('@/views/coffees/edit/[id]/index.vue'),
  },
]
