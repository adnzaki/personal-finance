<template>
  <div class="q-pa-md" style="margin-top: -50px">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <div class="text-subtitle1 text-uppercase q-mt-xs">Pengeluaran</div>
        <q-list
          bordered
          class="rounded-borders q-mt-lg"
          separator
          v-if="expense.length > 0"
        >
          <q-item
            clickable
            v-for="(item, index) in expense"
            :key="index"
            @click="viewTransactions(item.id_kategori)"
          >
            <q-item-section avatar><q-icon name="o_payments" /></q-item-section>
            <q-item-section>
              <q-item-label>{{ item.category_name }}</q-item-label>
              <q-item-label caption
                >{{ item.total_nominal }} ({{ item.percentage }})</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col-12 col-md-6">
        <div class="text-subtitle1 text-uppercase q-mt-xs">Penerimaan</div>
        <q-list
          bordered
          class="rounded-borders q-mt-lg"
          separator
          v-if="income.length > 0"
        >
          <q-item
            clickable
            v-for="(item, index) in income"
            :key="index"
            @click="viewTransactions(item.id_kategori)"
          >
            <q-item-section avatar><q-icon name="o_payments" /></q-item-section>
            <q-item-section>
              <q-item-label>{{ item.category_name }}</q-item-label>
              <q-item-label caption
                >{{ item.total_nominal }} ({{ item.percentage }})</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStatisticStore } from 'src/stores/statistic-store'
import { useTransactionStore } from 'src/stores/transaction-store'

const store = useStatisticStore()
const transactionStore = useTransactionStore()
const route = useRoute()
const router = useRouter()

const viewTransactions = (id) => {
  transactionStore.filter.category = id
  router.push('/statistik/kategori/transaksi')
}
store.getAllTransactionByCategory(route.params.dateRange)
const income = computed(() => store.allTransactions.income)
const expense = computed(() => store.allTransactions.expense)
</script>
