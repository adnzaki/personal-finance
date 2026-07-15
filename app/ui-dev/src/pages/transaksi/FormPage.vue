<template>
  <div :class="wrapperPadding()">
    <q-card class="content-card q-pb-sm">
      <FormContent mobile />
    </q-card>
  </div>
</template>

<script setup>
import { wrapperPadding } from '@/composables/screen'
import FormContent from './FormContent.vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useTransactionStore } from '@/stores/transaction-store'

const store = useTransactionStore()

onBeforeRouteLeave(() => {
  if (store.formType === 'edit') {
    store.resetForm(true)
  }
})
</script>
