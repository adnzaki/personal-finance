<template>
  <div class="col-12 col-md-3 justify-end">
    <q-input
      outlined
      v-model="dateStr"
      class="rounded-field q-mr-sm"
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
import { usePagingStore } from 'ss-paging-vue'

const store = useTransactionStore()
const paging = usePagingStore()
const datePicker = ref(null)
const dateStr = ref('Filter Tanggal')
const dateValue = ref(null)
const formatDate = (val) => date.formatDate(val, 'DD-MMM-YYYY', indonesiaDate)

const onDatePickerChanged = (val) => {
  if (val.from !== undefined && val.to !== undefined) {
    dateStr.value = `${formatDate(val.from)} sd. ${formatDate(val.to)}`
  } else {
    dateStr.value = formatDate(val)
  }
}

const reset = () => {
  dateValue.value = null
  dateStr.value = 'Filter Tanggal'
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

  store.filter.date = dateValue.value
  store.getTransactions()
}
</script>
