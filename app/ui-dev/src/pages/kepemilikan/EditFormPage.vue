<template>
  <div :class="wrapperPadding()">
    <q-card class="content-card q-pb-sm">
      <q-card-section>
        <div class="text-subtitle1 text-uppercase">
          {{ store.formTitle }}
        </div>
      </q-card-section>

      <EditFormContent mobile />
    </q-card>
  </div>
</template>

<script setup>
import { wrapperPadding } from 'src/composables/screen'
import { useOwnershipStore } from 'stores/ownership-store'
import EditFormContent from './EditFormContent.vue'

const store = useOwnershipStore()
</script>
