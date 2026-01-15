<template>
  <div class="q-pa-md">
    <greetings-text />
    <owner-not-found v-if="showOwnerSuggestion" />
    <fund-not-found v-if="showFundSuggestion" />
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
import { ref } from 'vue'
import GreetingsText from './dashboard/GreetingsText.vue'
import FundBalance from './dashboard/FundBalance.vue'
import TransactionRecap from './dashboard/TransactionRecap.vue'
import AccountChooser from './dashboard/AccountChooser.vue'
import OwnerNotFound from './dashboard/OwnerNotFound.vue'
import FundNotFound from './dashboard/FundNotFound.vue'
import { useDashboardStore } from 'src/stores/dashboard-store'
import { useFundStore } from 'src/stores/fund-store'
import { usePagingStore } from 'ss-paging-vue'

const showFundSuggestion = ref(false)
const showOwnerSuggestion = ref(false)

const paging = usePagingStore()
const fundStore = useFundStore()

const store = useDashboardStore()

fundStore.getPemilik((data) => {
  if (data.length === 0) {
    showOwnerSuggestion.value = true
  } else {
    showOwnerSuggestion.value = false
  }

  fundStore.getFund(() => {
    if (data.length > 0 && paging.state.data.length === 0) {
      showFundSuggestion.value = true
    } else {
      showFundSuggestion.value = false
    }
  })
})
store.getTransactionByCategory()
defineOptions({
  name: 'IndexPage',
})
</script>
