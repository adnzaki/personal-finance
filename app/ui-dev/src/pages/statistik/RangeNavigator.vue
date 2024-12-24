<template>
  <div class="q-pb-md" :style="{ marginTop: navWrapper }">
    <div class="row">
      <div class="col-2 col-sm-1 text-center prev-bg">
        <q-btn
          color="primary"
          class="custom-round prev-btn"
          size="lg"
          flat
          icon="keyboard_arrow_left"
          @click="moveTo('prev')"
          :disable="store.range.value === 'custom'"
        />
      </div>
      <div class="col-8 col-sm-10 range-bg q-pt-md">
        <p class="text-center">{{ store.dateRangeText }}</p>
      </div>
      <div class="col-2 col-sm-1 text-center next-bg">
        <q-btn
          color="primary"
          class="custom-round next-btn"
          size="lg"
          flat
          icon="keyboard_arrow_right"
          @click="moveTo('next')"
          :disable="store.range.value === 'custom'"
        />
      </div>
    </div>
  </div>
</template>
<style lang="sass" scoped>
@media(max-width: $breakpoint-sm-min)
  .prev-btn
    margin-left: 2px
  .next-btn
    margin-left: -8px
.prev-bg
  // background-color: $positive
.next-bg
  // background-color: $secondary
.range-bg
  // background-color: $primary
</style>

<script setup>
import { useStatisticStore } from 'src/stores/statistic-store'
import { date, useQuasar } from 'quasar'
import { ref, computed } from 'vue'

const store = useStatisticStore()
const $q = useQuasar()
const navWrapper = computed(() => ($q.screen.lt.sm ? '0' : '-30px'))

const navigateDay = (numberOfDays, navType) => {
  const newDate = ref(null)
  if (navType === 'next') {
    newDate.value = date.addToDate(store.dateRange, {
      days: numberOfDays,
    })
  } else {
    newDate.value = date.subtractFromDate(store.dateRange, {
      days: numberOfDays,
    })
  }

  console.log(newDate.value)

  store.dateRange = store.formatDateValue(newDate.value)
  store.dateRangeText = store.formatDateStr(newDate.value)
}

const navigateWeek = (numberOfDays, navType) => {
  const splitRange = store.dateRange.split('_')
  const weekStart = ref('')
  const weekEnd = ref('')

  if (navType === 'next') {
    weekStart.value = date.addToDate(splitRange[0], {
      days: numberOfDays,
    })
    weekEnd.value = date.addToDate(splitRange[1], {
      days: numberOfDays,
    })
  } else {
    weekStart.value = date.subtractFromDate(splitRange[0], {
      days: numberOfDays,
    })
    weekEnd.value = date.subtractFromDate(splitRange[1], {
      days: numberOfDays,
    })
  }

  store.dateRange = `${store.formatDateValue(weekStart.value)}_${store.formatDateValue(weekEnd.value)}`
  store.dateRangeText = `${store.formatDateStr(weekStart.value)} - ${store.formatDateStr(weekEnd.value)}`
}

const navigateMonth = (navType) => {
  const splitMonthDate = store.dateRange.split('_')
  const monthStart = ref('')
  const monthEnd = ref('')
  monthStart.value = date.startOfDate(splitMonthDate[0], 'month')
  monthEnd.value = date.endOfDate(splitMonthDate[0], 'month')

  if (navType === 'next') {
    monthStart.value = date.addToDate(monthStart.value, {
      months: 1,
    })
    monthEnd.value = date.addToDate(monthEnd.value, {
      months: 1,
    })
  } else {
    monthStart.value = date.subtractFromDate(monthStart.value, {
      months: 1,
    })
    monthEnd.value = date.subtractFromDate(monthEnd.value, {
      months: 1,
    })
  }

  store.dateRange = `${store.formatDateValue(monthStart.value)}_${store.formatDateValue(monthEnd.value)}`
  store.dateRangeText = `${store.formatDateStr(monthStart.value)} - ${store.formatDateStr(monthEnd.value)}`
}

const navigateYear = (navType) => {
  const splitYearDate = store.dateRange.split('_')
  const yearStart = ref('')
  const yearEnd = ref('')
  yearStart.value = date.startOfDate(splitYearDate[0], 'year')
  yearEnd.value = date.endOfDate(splitYearDate[0], 'year')

  if (navType === 'next') {
    yearStart.value = date.addToDate(yearStart.value, {
      years: 1,
    })
    yearEnd.value = date.addToDate(yearEnd.value, {
      years: 1,
    })
  } else {
    yearStart.value = date.subtractFromDate(yearStart.value, {
      years: 1,
    })
    yearEnd.value = date.subtractFromDate(yearEnd.value, {
      years: 1,
    })
  }

  store.dateRange = `${store.formatDateValue(yearStart.value)}_${store.formatDateValue(yearEnd.value)}`
  store.dateRangeText = `${store.formatDateStr(yearStart.value)} - ${store.formatDateStr(yearEnd.value)}`
}

const moveTo = (navType) => {
  if (store.range.value === 'daily') {
    navigateDay(1, navType)
  } else if (store.range.value === 'weekly') {
    navigateWeek(7, navType)
  } else if (store.range.value === 'monthly') {
    navigateMonth(navType)
  } else if (store.range.value === 'yearly') {
    navigateYear(navType)
  }

  store.getTotalBalance()
  store.getTotalIncomeExpense()
  store.getBiggestTransactionByCategory()
}
</script>
