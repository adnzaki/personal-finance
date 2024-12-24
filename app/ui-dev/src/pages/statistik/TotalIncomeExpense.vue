<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-sm">
      <div class="col-6">
        <h6 class="text-h6 custom-h6">Pemasukan</h6>
        <h6 class="text-h6 custom-h6">Pengeluaran</h6>
        <h6 class="text-h6 custom-h6">Surplus</h6>
      </div>
      <div class="col-6">
        <h6 class="text-h6 custom-h6-2 text-right">
          {{ store.totalIncome || '-' }}
        </h6>
        <h6 class="text-h6 custom-h6-2 text-right">
          {{ store.totalExpense || '-' }}
        </h6>
        <h6 class="text-h6 custom-h6-2 text-right">
          {{ store.netIncome || '-' }}
        </h6>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.total-income-expense
  font-size: .8rem

.custom-h6
  font-weight: 400

.custom-h6, .custom-h6-2
  line-height: .7rem
</style>

<script setup>
import { useStatisticStore } from 'src/stores/statistic-store'

const store = useStatisticStore()
</script>
