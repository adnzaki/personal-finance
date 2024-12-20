<template>
  <div :class="wrapperPadding()">
    <q-card class="content-card">
      <q-card-section class="q-mb-md">
        <div
          class="text-subtitle1 text-uppercase q-mb-sm"
          v-if="$q.screen.lt.sm"
        >
          {{ cardTitle }}
        </div>
        <div class="text-h6 text-capitalize" v-else>{{ cardTitle }}</div>
        <div :class="['row', titleSpacing()]">
          <ButtonGroup />
          <DateFilter />
          <search-box label="Cari transaksi..." />
        </div>
      </q-card-section>
      <!-- Main content goes here -->
      <DataTable />
      <FormDialog />
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { wrapperPadding, titleSpacing } from 'src/composables/screen.js'
import ButtonGroup from './ButtonGroup.vue'
import DataTable from './DataTable.vue'
import FormDialog from './FormDialog.vue'
import DateFilter from './DateFilter.vue'

const cardTitle = ref('Transaksi')
</script>
