import Index from '@/views/index.vue'

import NotFound from '@/views/404.vue';

// pages
export default [
  // Index page
  {
    path: '/',
    component: Index,
  },
  
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    component: NotFound,
  },
]
