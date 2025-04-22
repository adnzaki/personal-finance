import { validatePage } from './http'
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
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
        beforeEnter: () => {
          if (localStorage.getItem('force_reload') !== null) {
            localStorage.removeItem('force_reload')
            window.location.reload()
          }

          validatePage()
        },
        name: 'Dashboard',
      },
      {
        path: 'changelog',
        component: () => import('pages/changelog/MobilePage.vue'),
        beforeEnter: () => validatePage(),
        name: 'Informasi',
      },
      {
        path: 'kepemilikan',
        children: [
          {
            path: '',
            component: () => import('pages/kepemilikan/MainView.vue'),
            beforeEnter: () => validatePage(),
            name: 'Kepemilikan',
          },
          {
            path: 'add',
            component: () => import('pages/kepemilikan/AddFormPage.vue'),
            beforeEnter: () => validatePage(),
            name: 'Tambah Kepemilikan',
          },
          {
            path: 'edit',
            component: () => import('pages/kepemilikan/EditFormPage.vue'),
            beforeEnter: () => validatePage(),
            name: 'Edit Kepemilikan',
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
            name: 'Sumber Dana',
          },
          {
            path: 'add',
            component: () => import('pages/sumber-dana/AddFormPage.vue'),
            beforeEnter: () => validatePage(),
            name: 'Tambah Sumber Dana',
          },
          {
            path: 'edit',
            component: () => import('pages/sumber-dana/EditFormPage.vue'),
            beforeEnter: () => validatePage(),
            name: 'Edit Sumber Dana',
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
            name: 'Transaksi',
          },
          {
            path: 'add',
            component: () => import('src/pages/transaksi/FormPage.vue'),
            beforeEnter: () => validatePage(),
            name: 'Tambah Transaksi',
          },
          {
            path: 'edit',
            component: () => import('pages/transaksi/FormPage.vue'),
            beforeEnter: () => validatePage(),
            name: 'Edit Transaksi',
          },
        ],
      },
      {
        path: 'kategori',
        children: [
          {
            path: '',
            component: () => import('pages/kategori/MainView.vue'),
            beforeEnter: () => validatePage(),
            name: 'Kategori',
          },
          {
            path: 'add',
            component: () => import('pages/kategori/AddFormPage.vue'),
            beforeEnter: () => validatePage(),
            name: 'Tambah Kategori',
          },
          {
            path: 'edit',
            component: () => import('pages/kategori/EditFormPage.vue'),
            beforeEnter: () => validatePage(),
            name: 'Edit Kategori',
          },
        ],
      },
      {
        path: 'statistik',
        children: [
          {
            path: '',
            component: () => import('pages/statistik/MainView.vue'),
            beforeEnter: () => validatePage(),
            name: 'Statistik',
          },
          {
            path: 'kategori/:dateRange',
            component: () => import('pages/statistik/kategori/MainView.vue'),
            beforeEnter: () => validatePage(),
            name: 'Statistik Kategori',
          },
          {
            path: 'kategori/transaksi/:categoryId/:dateRange',
            component: () =>
              import('pages/statistik/kategori/TransactionList.vue'),
            beforeEnter: () => validatePage(),
            name: 'Daftar Transaksi',
          },
        ],
      },
      {
        path: 'pengaturan',
        children: [
          {
            path: '',
            component: () => import('pages/settings/MainView.vue'),
            beforeEnter: () => validatePage(),
            name: 'Pengaturan',
          },
          {
            path: 'reset-password',
            component: () => import('pages/settings/ResetPassword.vue'),
            beforeEnter: () => validatePage(),
            name: 'Reset Password',
          },
        ],
      },
      {
        path: 'dukungan',
        component: () => import('pages/support/MainView.vue'),
        beforeEnter: () => validatePage(),
        name: 'Dukungan',
      },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/LoginPage.vue'),
    beforeEnter: () => validatePage(true),
  },
  {
    path: '/register',
    component: () => import('layouts/RegisterPage.vue'),
    beforeEnter: () => validatePage('register'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
