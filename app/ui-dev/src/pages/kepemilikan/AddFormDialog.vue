<template>
  <q-dialog no-backdrop-dismiss v-model="store.showAddForm">
    <q-card class="q-pa-sm" :style="dialogSize()">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-capitalize">{{ store.addFormTitle }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <AddFormContent />
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useOwnershipStore } from 'stores/ownership-store'
import { dialogSize } from 'src/composables/screen'
import AddFormContent from './AddFormContent.vue'

const store = useOwnershipStore()
</script>
