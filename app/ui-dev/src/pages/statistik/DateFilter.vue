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
import { date } from 'quasar'
import { indonesiaDate } from 'src/composables/utils'
import { useStatisticStore } from 'src/stores/statistic-store'

const store = useStatisticStore()
const datePicker = ref(null)
const dateStr = ref('Rentang Tanggal')
const dateValue = ref(null)
const formatDate = (val) => date.formatDate(val, 'DD-MMM-YYYY', indonesiaDate)

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
}

const reset = () => {
  dateValue.value = null
  dateStr.value = 'Rentang Tanggal'
  store.dateRange = 'all'
  datePicker.value = null
  //store.getTransactions()
}

// const save = () => {
//   if (
//     datePicker.value.from !== undefined &&
//     datePicker.value.to !== undefined
//   ) {
//     dateValue.value = `${datePicker.value.from.replace(/\//g, '-')}_${datePicker.value.to.replace(/\//g, '-')}`
//   } else {
//     dateValue.value = datePicker.value.replace(/\//g, '-')
//   }

//   store.dateRange = dateValue.value
//   //store.getTransactions()
// }
</script>
