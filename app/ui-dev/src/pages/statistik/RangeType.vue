<template>
  <div class="col-12 col-md-6">
    <q-select
      filled
      v-model="store.range"
      :options="options"
      label="Pilih rentang waktu"
      class="rounded-field q-mb-md range-type"
      @update:model-value="onRangeSelected"
    />
  </div>
</template>

<style lang="sass" scoped>
@media(max-width: $breakpoint-md-min)
  .range-type
    width: 99%
</style>

<script setup>
import { useStatisticStore } from 'src/stores/statistic-store'

const store = useStatisticStore()

const options = [
  {
    label: 'Harian',
    value: 'daily',
  },
  {
    label: 'Mingguan',
    value: 'weekly',
  },
  {
    label: 'Bulanan',
    value: 'monthly',
  },
  {
    label: 'Tahunan',
    value: 'yearly',
  },
  {
    label: 'Custom',
    value: 'custom',
  },
]

const onRangeSelected = (model) => {
  store.range = model
  if (
    typeof store.dateRange === 'string' &&
    store.dateRange.indexOf('_') > -1 &&
    model.value !== 'custom'
  ) {
    store.dateRange = store.dateRange.split('_')[0]
  }
  store.setDateRange()
  store.getTotalIncomeExpense()
  store.getBiggestTransactionByCategory()
}

onRangeSelected(store.range)
</script>
