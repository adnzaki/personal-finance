<template>
  <div :class="wrapperPadding()">
    <q-card class="content-card">
      <q-card-section class="q-mb-md">
        <div class="text-h6 text-capitalize" v-if="$q.screen.gt.xs">
          {{ cardTitle }}
        </div>
        <div :class="['row', titleSpacing()]">
          <ButtonGroup />
          <DateFilter />
          <search-box
            root-class="col-12 col-lg-3 col-md-4"
            label="Cari transaksi..."
          />
        </div>
      </q-card-section>
      <!-- Main content goes here -->
      <DataTable />
      <FormDialog />
      <AdvanceFilter />
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { wrapperPadding, titleSpacing } from 'src/composables/screen.js'
import { useTransactionStore } from 'src/stores/transaction-store'
import ButtonGroup from './ButtonGroup.vue'
import DataTable from './DataTable.vue'
import FormDialog from './FormDialog.vue'
import DateFilter from './DateFilter.vue'
import AdvanceFilter from './AdvanceFilter.vue'

const store = useTransactionStore()

store.getFundSource()

const cardTitle = ref('Transaksi')

store.filter = {
  fundId: { label: 'Semua', value: 'all' },
  ownerId: { label: 'Semua', value: 'all' },
  transactionType: { label: 'Semua', value: 'all' },
  category: { label: 'Semua', value: 'all' },
  date: { label: 'Semua', value: 'all' },
}
</script>
