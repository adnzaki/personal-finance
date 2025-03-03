<template>
  <q-page-sticky
    position="bottom"
    :offset="fabPos"
    class="mobile-only mobile-save-btn-wrapper"
  >
    <q-btn fab label="Simpan" class="mobile-save-btn" color="primary" />
  </q-page-sticky>
</template>

<script setup>
import { ref } from 'vue'

const fabPos = ref([15, 15])
</script>
