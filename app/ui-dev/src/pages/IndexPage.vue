<template>
  <div class="q-pa-md">
    <greetings-text />
    <fund-balance />
    <transaction-recap
      :data="store.transactions.expense"
      icon="o_payments"
      title="Pengeluaran Bulan Ini"
    />
    <transaction-recap
      :data="store.transactions.income"
      icon="o_account_balance_wallet"
      title="Pemasukan Bulan Ini"
    />
    <!-- <transaction-recap
      :data="store.transactions.transfer"
      icon="label_important_outline"
      title="Transfer"
    /> -->
  </div>
</template>

<script setup>
import GreetingsText from './dashboard/GreetingsText.vue'
import FundBalance from './dashboard/FundBalance.vue'
import TransactionRecap from './dashboard/TransactionRecap.vue'
import { useDashboardStore } from 'src/stores/dashboard-store'

const store = useDashboardStore()
store.getTransactionByCategory()
defineOptions({
  name: 'IndexPage',
})
</script>
