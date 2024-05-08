<template>
  <q-dialog no-backdrop-dismiss v-model="store.showEditForm">
    <q-card class="q-pa-sm" :style="dialogSize()">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-capitalize">{{ store.formTitle }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <EditFormContent />
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useOwnershipStore } from 'stores/ownership-store'
import { dialogSize } from 'src/composables/screen'
import EditFormContent from './EditFormContent.vue'

const store = useOwnershipStore()
</script>
