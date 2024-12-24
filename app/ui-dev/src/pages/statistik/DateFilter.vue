<template>
  <div class="col-12 col-md-6 justify-end">
    <q-input
      outlined
      v-model="dateStr"
      class="rounded-field date-filter"
      :readonly="store.range.value === 'custom'"
      :disable="store.range.value !== 'custom'"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date
              v-model="datePicker"
              range
              @update:model-value="onDatePickerChanged"
              ><div class="row items-center justify-end q-gutter-sm">
                <!-- <q-btn label="Cancel" color="primary" flat v-close-popup /> -->
                <!-- <q-btn
                  label="Reset"
                  @click="reset"
                  color="negative"
                  flat
                  v-close-popup
                /> -->
                <q-btn label="OK" color="primary" flat v-close-popup /></div
            ></q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStatisticStore } from 'src/stores/statistic-store'

const store = useStatisticStore()
const datePicker = ref(null)
const dateStr = ref('Rentang Tanggal')

const onDatePickerChanged = (val) => {
  if (val.from !== undefined && val.to !== undefined) {
    dateStr.value = `${store.formatDateStr(val.from)} sd. ${store.formatDateStr(val.to)}`
    store.dateRange = `${val.from.replace(/\//g, '-')}_${val.to.replace(/\//g, '-')}`
    store.dateRangeText = `${store.formatDateStr(val.from)} - ${store.formatDateStr(val.to)}`
  } else {
    dateStr.value = store.formatDateStr(val)
    store.dateRange = val.replace(/\//g, '-')
    store.dateRangeText = store.formatDateStr(val)
  }

  store.getTotalBalance()
  store.getTotalIncomeExpense()
  store.getBiggestTransactionByCategory()
}
</script>
