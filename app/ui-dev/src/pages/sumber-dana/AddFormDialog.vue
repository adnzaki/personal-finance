<template>
  <q-dialog
    no-backdrop-dismiss
    v-model="store.showAddForm"
    @before-show="store.getPemilik()"
  >
    <q-card class="q-pa-sm" :style="dialogSize()">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-capitalize">{{ store.formTitle }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <AddFormContent />
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useFundStore } from 'src/stores/fund-store'
import { dialogSize } from 'src/composables/screen'
import AddFormContent from './AddFormContent.vue'

const store = useFundStore()
</script>
