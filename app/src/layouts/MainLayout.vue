<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> SisaUang </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> User Name </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
        <q-item>
          <q-btn
            color="negative"
            style="width: 100%"
            icon="r_logout"
            label="Logout"
          />
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
import EssentialLink from 'components/EssentialLink.vue'

defineOptions({
  name: 'MainLayout',
})

const linksList = [
  {
    title: 'Dashboard',
    icon: 'r_dashboard',
    link: '#',
  },
  {
    title: 'Sumber Dana',
    icon: 'r_storage',
    link: '#',
  },
  {
    title: 'Transaksi',
    icon: 'r_sync_alt',
    link: '#',
  },
  {
    title: 'Pengaturan',
    icon: 'r_settings',
    link: '#',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
