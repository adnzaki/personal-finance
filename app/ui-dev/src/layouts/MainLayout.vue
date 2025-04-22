<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated :reveal="$q.screen.lt.sm ? true : false">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          v-if="$q.screen.gt.xs"
        />

        <q-toolbar-title>
          <div class="row">
            <div class="col-10">
              <div class="row">
                <q-btn
                  color="white"
                  flat
                  class="back-button"
                  rounded
                  icon="arrow_back"
                  @click="$router.back()"
                  v-if="$q.screen.lt.sm && mobileSubRoute($route.path)"
                />
                <div
                  :class="[
                    'text-subtitle1 text-uppercase q-ml-sm',
                    mobileSubRoute($route.path) ? 'q-mt-xs' : '',
                  ]"
                  :style="
                    isFormPage($route.path) ? 'margin-top: 7px !important' : ''
                  "
                >
                  {{ toolbarTitle() }}
                </div>
              </div>
            </div>
            <div class="col-2 text-right" v-if="isFormPage($route.path)">
              <q-btn
                flat
                round
                color="white"
                class="mobile-save-btn"
                icon="o_close"
                @click="$router.back()"
              />
            </div>
          </div>
        </q-toolbar-title>
        <ChangeLog v-if="!isFormPage($route.path)" />
      </q-toolbar>
    </q-header>
    <q-footer v-if="$q.screen.lt.sm" class="su-box-shadow">
      <q-tabs
        align="center"
        v-model="activeMobileMenu"
        class="bg-white text-black"
      >
        <q-route-tab
          name="dashboard"
          :class="activeClass('dashboard')"
          icon="r_dashboard"
          to="/dashboard"
        />

        <q-route-tab
          to="/sumber-dana"
          name="sumber-dana"
          :class="activeClass('sumber-dana')"
          icon="r_storage"
        />
        <q-route-tab
          to="/transaksi"
          name="transaksi"
          :class="['main-feature', activeClass('transaksi')]"
          icon="r_sync_alt"
        />
        <q-route-tab
          to="/statistik"
          name="statistik"
          :class="activeClass('statistik')"
          icon="r_equalizer"
        />
        <q-route-tab
          to="/pengaturan"
          name="pengaturan"
          :class="activeClass('pengaturan')"
          icon="r_settings"
        />
      </q-tabs>
    </q-footer>

    <q-drawer v-model="leftDrawerOpen" class="q-mt-md" show-if-above bordered>
      <q-list class="q-px-sm">
        <!-- <q-item-label header>
          Halo, <strong>{{ userName }}</strong
          >!
        </q-item-label> -->

        <MenuItem v-for="link in linksList" :key="link.title" v-bind="link" />
        <q-item class="q-mt-md">
          <logout-btn />
        </q-item>
        <app-version />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import MenuItem from 'src/components/MenuItem.vue'
import { useRoute } from 'vue-router'
import ChangeLog from 'pages/changelog/MainView.vue'

const $q = useQuasar()
const route = useRoute()

const activeMobileMenu = ref('dashboard')

const activeClass = (menu) =>
  menu === activeMobileMenu.value ? 'text-primary' : ''

const isFormPage = (str) => /(add|edit)/.test(str)

const mobileSubRoute = (currentPath) => {
  let cleanPath = currentPath.replace(
    /(\/\d+)?\/\d{4}-\d{2}-\d{2}_\d{4}-\d{2}-\d{2}$/,
    '',
  )

  const paths = [
    '/kepemilikan',
    '/kategori',
    '/changelog',
    '/pengaturan/reset-password',
    '/statistik/kategori',
    '/statistik/kategori/transaksi',
    '/dukungan',
    // '/sumber-dana/add',
    // '/sumber-dana/edit',
    // '/transaksi/add',
    // '/transaksi/edit',
    // '/kategori/add',
    // '/kategori/edit',
    // '/kepemilikan/add',
    // '/kepemilikan/edit',
  ]

  return paths.includes(cleanPath)
}

const toolbarTitle = () => {
  if ($q.screen.lt.sm) {
    return route.name
  } else {
    return 'SisaUang'
  }
}
const linksList = [
  {
    title: 'Dashboard',
    icon: 'r_dashboard',
    link: '/dashboard',
  },
  {
    title: 'Kepemilikan',
    icon: 'r_groups',
    link: '/kepemilikan',
  },
  {
    title: 'Sumber Dana',
    icon: 'r_storage',
    link: '/sumber-dana',
  },
  {
    title: 'Transaksi',
    icon: 'r_sync_alt',
    link: '/transaksi',
  },
  {
    title: 'Kategori',
    icon: 'r_category',
    link: '/kategori',
  },
  {
    title: 'Statistik',
    icon: 'r_equalizer',
    link: '/statistik',
  },
  {
    title: 'Pengaturan',
    icon: 'r_settings',
    link: '/pengaturan',
  },
  {
    title: 'Dukungan',
    icon: 'r_volunteer_activism',
    link: '/dukungan',
  },
]

const leftDrawerOpen = ref(false)
// const userName = localStorage.getItem('username')

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
