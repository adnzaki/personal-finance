<template>
  <div :class="wrapperPadding()">
    <q-card class="content-card q-pb-sm">
      <PageContent />
    </q-card>
  </div>
</template>

<script setup>
import { wrapperPadding } from 'src/composables/screen'
import PageContent from './PageContent.vue'
</script>
