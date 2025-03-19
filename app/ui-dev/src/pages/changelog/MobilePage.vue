<template>
  <div :class="wrapperPadding()">
    <q-card class="content-card q-pb-sm">
      <ModalContent mobile />
    </q-card>
  </div>
</template>

<script setup>
import { wrapperPadding } from 'src/composables/screen'
import ModalContent from './ModalContent.vue'
</script>
