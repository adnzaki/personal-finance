<template>
  <div class="col-12 col-md-3 col-lg-5">
    <div class="q-gutter-xs mobile-hide">
      <q-btn
        icon="add"
        class="q-pl-sm custom-round"
        unelevated
        color="primary"
        label="Tambah"
        @click="showForm"
      />
    </div>

    <!-- FAB -->
    <q-page-sticky
      position="bottom-right"
      :offset="fabPos"
      class="mobile-only custom-fab"
    >
      <q-btn
        fab
        icon="add"
        class="custom-round"
        color="primary"
        @click="showForm"
      />
    </q-page-sticky>
  </div>
</template>

<script setup>
import { fabPos } from 'src/composables/fab'
import { useTransactionStore } from 'src/stores/transaction-store'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()
const store = useTransactionStore()

const showForm = () => {
  if (store.filterMode) {
    store.filterMode = false
    store.resetForm()
  }

  if ($q.screen.lt.sm) {
    router.push('/transaksi/add')
  } else {
    store.showForm = true
  }

  store.formType = 'add'
}
</script>
