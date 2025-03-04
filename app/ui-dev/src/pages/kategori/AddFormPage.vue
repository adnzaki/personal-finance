<template>
  <div :class="wrapperPadding()">
    <q-card class="content-card q-pb-sm">
      <AddFormContent mobile />
    </q-card>
  </div>
</template>

<script setup>
import { wrapperPadding } from 'src/composables/screen'
import AddFormContent from './AddFormContent.vue'
</script>
