<template>
  <div class="col-12 col-md-8">
    <div class="q-gutter-xs mobile-hide">
      <q-btn
        icon="add"
        class="q-pl-sm"
        unelevated
        color="primary"
        label="Tambah"
      />
    </div>

    <!-- FAB -->
    <q-page-sticky position="bottom-right" :offset="fabPos" class="mobile-only">
      <q-btn fab icon="add" color="primary" />
    </q-page-sticky>
  </div>
</template>

<script setup>
import { fabPos } from 'src/composables/fab'
</script>
