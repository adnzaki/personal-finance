<template>
  <div :class="wrapperPadding()">
    <q-card class="content-card">
      <q-card-section class="q-mb-md">
        <div class="row">
          <q-btn
            color="teal"
            flat
            class="back-button q-mb-md"
            style="padding-right: 8px !important; margin-right: 5px"
            rounded
            icon="arrow_back"
            @click="$router.back()"
          />

          <div
            class="text-subtitle1 text-uppercase q-mt-xs page-title-pl-5"
            v-if="$q.screen.gt.xs"
          >
            {{ cardTitle }}
          </div>
        </div>
        <div :class="['row', titleSpacing()]">
          <div class="col-12 col-md-8"></div>
          <search-box label="Cari transaksi..." />
        </div>
      </q-card-section>
      <!-- Main content goes here -->
      <DataTable v-if="isReady" />
      <FormDialog />
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { wrapperPadding, titleSpacing } from 'src/composables/screen'
import { useTransactionStore } from 'src/stores/transaction-store'
import DataTable from 'pages/transaksi/DataTable.vue'
import FormDialog from 'pages/transaksi/FormDialog.vue'

const route = useRoute()
const store = useTransactionStore()
const isReady = ref(false)

store.filter.date = route.params.dateRange
store.filter.category = route.params.categoryId
isReady.value = true

const cardTitle = ref('Rincian Transaksi')
</script>
