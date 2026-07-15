<template>
  <div :class="wrapperPadding()">
    <q-card class="content-card q-pb-sm">
      <AddFormContent mobile />
    </q-card>
  </div>
</template>

<script setup>
import { wrapperPadding } from '@/composables/screen'
import { useFundStore } from '@/stores/fund-store'
import AddFormContent from './AddFormContent.vue'

const store = useFundStore()

store.getPemilik()
</script>
