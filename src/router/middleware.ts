// import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
// import supabase from '@/plugins/supabase'
//
// const publicRoutes = ['/', '/auth', '/privacy-policy', '/terms-of-service']
//
// export default {
//   async beforeEach(
//     to: RouteLocationNormalized,
//     _: RouteLocationNormalized,
//     next: NavigationGuardNext,
//   ) {
//     const isPublicRoute = publicRoutes.includes(to.path)
//     const { data, error } = await supabase.auth.getSession()
//     const isAuthenticated = data.session !== null && !error
//
//     if (isPublicRoute) {
//       // If user is already authenticated and tries to access auth page,
//       // redirect to dashboard
//       if (isAuthenticated) {
//         next({ path: '/dashboard' })
//       } else {
//         // Allow access to public route for non-authenticated users
//         next()
//       }
//     }
//     // Protected route - requires authentication
//     else {
//       if (isAuthenticated) {
//         // User is authenticated, allow access
//         next()
//       } else {
//         // Not authenticated, redirect to auth page
//         next({ path: '/auth' })
//       }
//     }
//   },
// }
