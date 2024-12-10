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
      <change-password />
    </q-card>
    <logout-mobile class="mobile-only" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { wrapperPadding } from 'src/composables/screen'
import ChangePassword from './ChangePassword.vue'
import LogoutMobile from './LogoutMobile.vue'

const cardTitle = ref('Ubah Password')
</script>
