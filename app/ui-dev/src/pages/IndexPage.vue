<template>
  <div class="q-pa-md">
    <greetings-text />
    <fund-balance />
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-md-6">
        <transaction-recap
          :data="store.transactions.expense"
          icon="o_payments"
          title="Pengeluaran Bulan Ini"
        />
      </div>
      <div class="col-12 col-md-6">
        <transaction-recap
          :data="store.transactions.income"
          icon="o_account_balance_wallet"
          title="Pemasukan Bulan Ini"
        />
      </div>
    </div>
    <account-chooser card-style="custom-round" />
    <!-- <transaction-recap
      :data="store.transactions.transfer"
      icon="label_important_outline"
      title="Transfer"
    /> -->
    <p class="text-center version mobile-hide q-mt-md q-py-md">
      Made with ❤️ by <strong>Adnan Zaki</strong>
    </p>
  </div>
</template>

<script setup>
import GreetingsText from './dashboard/GreetingsText.vue'
import FundBalance from './dashboard/FundBalance.vue'
import TransactionRecap from './dashboard/TransactionRecap.vue'
import AccountChooser from './dashboard/AccountChooser.vue'
import { useDashboardStore } from 'src/stores/dashboard-store'

const store = useDashboardStore()
store.getTransactionByCategory()
defineOptions({
  name: 'IndexPage',
})
</script>
