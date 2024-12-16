<template>
  <div :class="wrapperPadding()">
    <q-card class="content-card">
      <q-card-section>
        <div class="row">
          <q-btn
            color="teal"
            flat
            class="back-button"
            rounded
            icon="arrow_back"
            @click="$router.push('/pengaturan')"
          />
          <div class="text-subtitle1 text-uppercase q-mt-xs page-title-pl-5">
            Ubah Password
          </div>
        </div>
      </q-card-section>
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
