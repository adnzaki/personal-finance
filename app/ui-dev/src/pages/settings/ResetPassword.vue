<template>
  <div :class="wrapperPadding()">
    <q-card class="content-card">
      <!-- Main content goes here -->
      <change-password />
    </q-card>
  </div>
</template>

<script setup>
import { wrapperPadding } from 'src/composables/screen'
import ChangePassword from './ChangePassword.vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()

if ($q.screen.gt.xs) {
  router.push('/pengaturan')
}
</script>
