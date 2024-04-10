const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'dashboard', component: () => import('pages/IndexPage.vue') },
    ],
  },
  { path: '/login', component: () => import('layouts/LoginPage.vue') },
  { path: '/register', component: () => import('layouts/RegisterPage.vue') },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
