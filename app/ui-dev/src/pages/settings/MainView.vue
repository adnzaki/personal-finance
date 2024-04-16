<template>
  <div :class="wrapperPadding()">
    <q-card class="content-card">
      <q-card-section class="q-mb-md">
        <div
          class="text-subtitle1 text-uppercase q-mb-sm"
          v-if="$q.screen.lt.sm"
        >
          {{ cardTitle }}
        </div>
        <div class="text-h6 text-capitalize" v-else>
          {{ cardTitle }}
        </div>
        <div :class="['row', titleSpacing()]">
          <logout-btn class="mobile-only" />
        </div>
      </q-card-section>
      <!-- Main content goes here -->
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { wrapperPadding, titleSpacing } from 'src/composables/screen'

const cardTitle = ref('Pengaturan')
</script>
