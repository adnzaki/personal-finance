<template>
  <div class="col-2 col-md-1 text-right">
    <q-btn
      icon="o_filter_alt"
      color="primary"
      class="custom-round q-mr-sm"
      unelevated
      @click="store.showFilter = true"
    />
  </div>
  <div class="col-10 col-lg-3 col-md-4 q-gutter-xs justify-end">
    <q-input
      outlined
      v-model="dateStr"
      class="rounded-field date-filter"
      dense
      readonly
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date
              v-model="datePicker"
              range
              @update:model-value="onDatePickerChanged"
              ><div class="row items-center justify-end q-gutter-sm">
                <q-btn label="Cancel" color="primary" flat v-close-popup />
                <q-btn
                  label="Reset"
                  @click="reset"
                  color="negative"
                  flat
                  v-close-popup
                />
                <q-btn
                  label="OK"
                  color="primary"
                  flat
                  @click="save"
                  v-close-popup
                /></div
            ></q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { date } from 'quasar'
import { indonesiaDate } from 'src/composables/utils'
import { useTransactionStore } from 'src/stores/transaction-store'

const store = useTransactionStore()
const datePicker = ref(null)
const dateStr = ref('Filter Tanggal')
const dateValue = ref(null)
const formatDate = (val) => date.formatDate(val, 'DD-MMM-YYYY', indonesiaDate)

// Does date filter value exist in localStorage?
// If it does, set the dateValue and dateStr accordingly
if (localStorage.getItem('dateFilterStr')) {
  dateStr.value = localStorage.getItem('dateFilterStr')
}

if (localStorage.getItem('dateFilterValue')) {
  dateValue.value = localStorage.getItem('dateFilterValue')
  store.filter.date.value = dateValue.value
}

// If dateValue is set, parse it and set the datePicker value
if (dateValue.value) {
  if (dateValue.value.includes('_')) {
    const [from, to] = dateValue.value.split('_')
    datePicker.value = {
      from: from.replace(/-/g, '/'),
      to: to.replace(/-/g, '/'),
    }
  } else {
    datePicker.value = dateValue.value.replace(/-/g, '/')
  }
}

const onDatePickerChanged = (val) => {
  if (val.from !== undefined && val.to !== undefined) {
    dateStr.value = `${formatDate(val.from)} sd. ${formatDate(val.to)}`
  } else {
    dateStr.value = formatDate(val)
  }

  localStorage.setItem('dateFilterStr', dateStr.value)
}

const reset = () => {
  dateValue.value = null
  dateStr.value = 'Filter Tanggal'
  store.filter.date.value = 'all'
  datePicker.value = null
  store.getTransactions()

  localStorage.removeItem('dateFilterStr')
  localStorage.removeItem('dateFilterValue')
}

const save = () => {
  if (
    datePicker.value.from !== undefined &&
    datePicker.value.to !== undefined
  ) {
    dateValue.value = `${datePicker.value.from.replace(/\//g, '-')}_${datePicker.value.to.replace(/\//g, '-')}`
  } else {
    dateValue.value = datePicker.value.replace(/\//g, '-')
  }

  store.filter.date.value = dateValue.value
  localStorage.setItem('dateFilterValue', dateValue.value)
  store.getTransactions()
}
</script>
