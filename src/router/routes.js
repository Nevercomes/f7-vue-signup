import Index from '@/views/index.vue'
import Login from '@/views/login.vue'
import NotFound from '@/views/404.vue';

// pages
export default [
  // Index page
  {
    path: '/',
    component: Index,
  },
  // Login page
  {
    path: '/login',
    component: Login
  },

  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    component: NotFound,
  },
]
