<template>
  <div class="col-12 col-md-8">
    <div class="q-gutter-xs mobile-hide">
      <q-btn
        icon="add"
        class="q-pl-sm custom-round"
        unelevated
        color="primary"
        label="Tambah"
        @click="store.showAddForm = true"
      />
    </div>

    <!-- FAB -->
    <q-page-sticky position="bottom-right" :offset="fabPos" class="mobile-only">
      <q-btn
        fab
        icon="add"
        class="custom-round"
        color="primary"
        to="/transaksi/add"
      />
    </q-page-sticky>
  </div>
</template>

<script setup>
import { fabPos } from 'src/composables/fab'
import { useTransactionStore } from 'src/stores/transaction-store'

const store = useTransactionStore()
</script>
