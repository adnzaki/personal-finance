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
      <q-list class="q-px-sm">
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
            @click="logout"
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
import { useQuasar } from 'quasar'
import { api, conf } from 'src/router/http'
import EssentialLink from 'components/EssentialLink.vue'

defineOptions({
  name: 'MainLayout',
})

const $q = useQuasar()

const logout = () => {
  api
    .get('logout-user', {
      headers: {
        Authorization: `Bearer ${$q.cookies.get(conf.cookieName)}`,
      },
    })
    .then(({ data }) => {
      if (data.status === 'success') {
        $q.cookies.remove(conf.cookieName)
        window.location.href = conf.loginUrl()
      }
    })
}

const linksList = [
  {
    title: 'Dashboard',
    icon: 'r_dashboard',
    link: '/dashboard',
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

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
