<template>
  <q-dialog
    no-backdrop-dismiss
    v-model="store.showForm"
    @hide="store.resetForm()"
  >
    <q-card class="q-pa-sm" :style="dialogSize()">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-capitalize">{{ store.formTitle }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <FormContent />
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useTransactionStore } from 'stores/transaction-store'
import { dialogSize } from 'src/composables/screen'
import FormContent from './FormContent.vue'

const store = useTransactionStore()
</script>
