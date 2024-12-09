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
        path: 'kepemilikan',
        children: [
          {
            path: '',
            component: () => import('pages/kepemilikan/MainView.vue'),
            beforeEnter: () => validatePage(),
          },
          {
            path: 'add',
            component: () => import('pages/kepemilikan/AddFormPage.vue'),
            beforeEnter: () => validatePage(),
          },
          {
            path: 'edit',
            component: () => import('pages/kepemilikan/EditFormPage.vue'),
            beforeEnter: () => validatePage(),
          },
        ],
      },
      {
        path: 'sumber-dana',
        children: [
          {
            path: '',
            component: () => import('pages/sumber-dana/MainView.vue'),
            beforeEnter: () => validatePage(),
          },
          {
            path: 'add',
            component: () => import('pages/sumber-dana/AddFormPage.vue'),
            beforeEnter: () => validatePage(),
          },
          {
            path: 'edit',
            component: () => import('pages/sumber-dana/EditFormPage.vue'),
            beforeEnter: () => validatePage(),
          },
        ],
      },
      {
        path: 'transaksi',
        children: [
          {
            path: '',
            component: () => import('pages/transaksi/MainView.vue'),
            beforeEnter: () => validatePage(),
          },
          {
            path: 'add',
            component: () => import('src/pages/transaksi/FormPage.vue'),
            beforeEnter: () => validatePage(),
          },
          {
            path: 'edit',
            component: () => import('pages/transaksi/FormPage.vue'),
            beforeEnter: () => validatePage(),
          },
        ],
      },
      {
        path: 'pengaturan',
        component: () => import('pages/settings/MainView.vue'),
        beforeEnter: () => validatePage(),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/LoginPage.vue'),
    beforeEnter: () => validatePage(true),
  },
  { path: '/register', component: () => import('layouts/RegisterPage.vue') },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
