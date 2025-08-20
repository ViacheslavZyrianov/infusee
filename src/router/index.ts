import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes/index.ts'
import middleware from './middleware/index.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(middleware.beforeEach)

export default router
