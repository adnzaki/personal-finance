<template>
  <div :class="wrapperPadding()">
    <q-card class="content-card">
      <q-card-section class="q-mb-md">
        <div class="text-h6 text-capitalize" v-if="$q.screen.gt.xs">
          {{ cardTitle }}
        </div>
        <div :class="['row', titleSpacing()]">
          <DateFilter v-if="$q.screen.gt.md && !hideDateFilter" />
          <RangeType v-if="!hideDateFilter" />
          <DateFilter
            v-if="
              $q.screen.lt.md &&
              !hideDateFilter &&
              store.range.value === 'custom'
            "
          />
          <SelectOwner />
          <q-btn
            color="primary"
            class="custom-round btn-w100"
            :label="toggleFilterBtnText"
            v-if="$q.screen.lt.md"
            @click="toggleDateFilter"
          />
        </div>
      </q-card-section>
      <!-- Main content goes here -->
      <RangeNavigator />
      <BalanceInfo />
      <TotalIncomeExpense />
      <BiggestCategoryExpense />
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { wrapperPadding, titleSpacing } from 'src/composables/screen'
import RangeType from './RangeType.vue'
import DateFilter from './DateFilter.vue'
import SelectOwner from './SelectOwner.vue'
import { useStatisticStore } from 'src/stores/statistic-store'
import RangeNavigator from './RangeNavigator.vue'
import TotalIncomeExpense from './TotalIncomeExpense.vue'
import BiggestCategoryExpense from './BiggestCategoryExpense.vue'
import BalanceInfo from './BalanceInfo.vue'

localStorage.removeItem('back_path')
const store = useStatisticStore()

const cardTitle = ref('Statistik')
const hideDateFilter = ref(false)
const defaultToggleButton = 'Sembunyikan Filter Tanggal'
const toggleFilterBtnText = ref(defaultToggleButton)

const toggleDateFilter = () => {
  hideDateFilter.value = !hideDateFilter.value
  toggleFilterBtnText.value = hideDateFilter.value
    ? 'Tampilkan Filter Tanggal'
    : defaultToggleButton
}
</script>
