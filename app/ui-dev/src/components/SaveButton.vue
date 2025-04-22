<template>
  <q-page-sticky
    position="bottom"
    :offset="fabPos"
    class="mobile-save-btn-wrapper"
    v-if="$q.screen.lt.sm"
  >
    <q-btn
      fab
      :label="label"
      class="mobile-save-btn"
      :style="normalCase ? style : ''"
      color="primary"
    />
  </q-page-sticky>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  label: {
    type: String,
    default: 'Simpan',
  },
  normalCase: {
    type: Boolean,
    default: false,
  },
})

const style = { textTransform: 'none !important' }
const fabPos = ref([15, 15])
</script>
