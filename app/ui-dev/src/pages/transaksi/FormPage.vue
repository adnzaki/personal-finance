<template>
  <div :class="wrapperPadding()">
    <q-card class="content-card q-pb-sm">
      <FormContent mobile />
    </q-card>
  </div>
</template>

<script setup>
import { wrapperPadding } from 'src/composables/screen'
import FormContent from './FormContent.vue'
</script>
