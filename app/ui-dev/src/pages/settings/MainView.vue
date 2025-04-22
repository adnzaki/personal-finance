<template>
  <div :class="wrapperPadding()">
    <q-card class="content-card">
      <q-card-section :class="$q.screen.lt.sm ? 'q-pt-none' : ''">
        <div class="text-h6 text-capitalize" v-if="$q.screen.gt.xs">
          {{ cardTitle }}
        </div>
      </q-card-section>
      <!-- Main content goes here -->
      <change-password v-if="$q.screen.gt.xs" />
      <settings-menu v-else />
    </q-card>
    <account-chooser class="q-mt-md" />
    <logout-mobile v-if="$q.screen.lt.sm" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { wrapperPadding } from 'src/composables/screen'
import ChangePassword from './ChangePassword.vue'
import LogoutMobile from './LogoutMobile.vue'
import SettingsMenu from './SettingsMenu.vue'
import AccountChooser from '../dashboard/AccountChooser.vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const cardTitle = computed(() => {
  return $q.screen.lt.sm ? 'Pengaturan' : 'Ubah Password'
})
</script>
