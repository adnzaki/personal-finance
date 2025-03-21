<template>
  <div :class="wrapperPadding()">
    <q-card class="content-card q-pb-sm">
      <EditFormContent mobile />
    </q-card>
  </div>
</template>

<script setup>
import { wrapperPadding } from 'src/composables/screen'
import EditFormContent from './EditFormContent.vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useOwnershipStore } from 'src/stores/ownership-store'

const store = useOwnershipStore()

onBeforeRouteLeave(() => {
  store.data.kepemilikan = ''
})
</script>
