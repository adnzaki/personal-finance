<template>
  <q-page-sticky
    position="bottom"
    :offset="fabPos"
    class="mobile-save-btn-wrapper"
    v-if="$q.screen.lt.sm"
  >
    <q-btn fab label="Simpan" class="mobile-save-btn" color="primary" />
  </q-page-sticky>
</template>

<script setup>
import { ref } from 'vue'

const fabPos = ref([15, 15])
</script>
