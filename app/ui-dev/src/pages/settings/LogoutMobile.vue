<template>
  <q-card class="content-card q-mt-lg">
    <q-card-section>
      <div class="text-subtitle1 text-uppercase q-mb-sm" v-if="$q.screen.lt.sm">
        {{ cardTitle }}
      </div>
      <div class="text-h6 text-capitalize" v-else>
        {{ cardTitle }}
      </div>
    </q-card-section>
    <q-card-section>
      <div :class="['row', titleSpacing()]">
        <logout-btn class="mobile-only" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { titleSpacing } from 'src/composables/screen'
import { ref } from 'vue'

const cardTitle = ref('Akun')
</script>
