import { validatePage } from './http'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: 'dashboard',
      },
      {
        path: 'dashboard',
        component: () => import('pages/IndexPage.vue'),
        beforeEnter: () => validatePage(),
      },
      {
        path: 'sumber-dana',
        component: () => import('pages/sumber-dana/MainView.vue'),
        beforeEnter: () => validatePage(),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/LoginPage.vue'),
    beforeEnter: () => validatePage(true),
  },
  // { path: '/register', component: () => import('layouts/RegisterPage.vue') },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
