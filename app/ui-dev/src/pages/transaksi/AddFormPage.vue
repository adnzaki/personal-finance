<template>
  <div :class="wrapperPadding()">
    <q-card class="content-card q-pb-sm">
      <q-card-section>
        <div class="text-subtitle1 text-uppercase">
          {{ store.formTitle }}
        </div>
      </q-card-section>

      <FormContent mobile />
    </q-card>
  </div>
</template>

<script setup>
import { wrapperPadding } from 'src/composables/screen'
import { useTransactionStore } from 'stores/transaction-store'
import FormContent from './FormContent.vue'

const store = useTransactionStore()
</script>
