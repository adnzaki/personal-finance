<template>
  <div :class="wrapperPadding()">
    <q-card class="content-card">
      <q-card-section>
        <div class="text-subtitle1 text-uppercase" v-if="$q.screen.lt.sm">
          {{ cardTitle }}
        </div>
        <div class="text-h6 text-capitalize" v-else>
          {{ cardTitle }}
        </div>
      </q-card-section>
      <!-- Main content goes here -->
      <change-password v-if="$q.screen.gt.xs" />
      <settings-menu v-else />
    </q-card>
    <logout-mobile v-if="$q.screen.lt.sm" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { wrapperPadding } from 'src/composables/screen'
import ChangePassword from './ChangePassword.vue'
import LogoutMobile from './LogoutMobile.vue'
import SettingsMenu from './SettingsMenu.vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const cardTitle = computed(() => {
  return $q.screen.lt.sm ? 'Pengaturan' : 'Ubah Password'
})
</script>
