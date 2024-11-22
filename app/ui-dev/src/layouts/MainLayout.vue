<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated :reveal="$q.screen.lt.sm ? true : false">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="mobile-hide"
        />

        <q-toolbar-title> SisaUang </q-toolbar-title>
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
          class="text-capitalize"
          icon="r_dashboard"
          to="/dashboard"
        />

        <q-route-tab
          to="/sumber-dana"
          name="sumber-dana"
          class="text-capitalize"
          icon="r_storage"
        />
        <q-route-tab
          to="/transaksi"
          name="transaksi"
          class="text-capitalize main-feature"
          icon="r_sync_alt"
        />
        <q-route-tab
          to="/kepemilikan"
          name="kepemilikan"
          class="text-capitalize"
          icon="r_groups"
        />
        <q-route-tab
          to="/pengaturan"
          name="pengaturan"
          class="text-capitalize"
          icon="r_settings"
        />
      </q-tabs>
    </q-footer>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list class="q-px-sm">
        <q-item-label header>
          Halo, <strong>{{ userName }}</strong
          >!
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
        <q-item>
          <logout-btn />
        </q-item>
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
import EssentialLink from 'components/EssentialLink.vue'

defineOptions({
  name: 'MainLayout',
})

const $q = useQuasar()

const activeMobileMenu = ref('dashboard')

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
    title: 'Pengaturan',
    icon: 'r_settings',
    link: '/pengaturan',
  },
]

const leftDrawerOpen = ref(false)
const userName = localStorage.getItem('username')

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
