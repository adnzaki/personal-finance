<template>
  <div
    class="col-12 col-md-3"
    @mouseover="hideCloseIcon = false"
    @mouseleave="hideCloseIcon = true"
  >
    <q-select
      filled
      v-model="store.ownerId"
      :options="store.owners"
      label="Pemilik"
      class="rounded-field q-mb-md md-w99"
      @update:model-value="onOwnerSelected"
      ><template v-slot:append>
        <q-icon
          name="close"
          class="cursor-pointer"
          @click.stop.prevent="clearOwner"
          v-if="!hideCloseIcon"
        /> </template
    ></q-select>
  </div>
</template>

<script setup>
import { useStatisticStore } from 'src/stores/statistic-store'
import { ref } from 'vue'

const store = useStatisticStore()
store.getOwners()
const hideCloseIcon = ref(true)

const defaultFilterValue = { label: 'Semua', value: 'all' }

const clearOwner = () => {
  store.ownerId = defaultFilterValue
  store.getTotalBalance()
  store.getTotalIncomeExpense()
  store.getBiggestTransactionByCategory()
}

const onOwnerSelected = () => {
  store.getTotalBalance()
  store.getTotalIncomeExpense()
  store.getBiggestTransactionByCategory()
}
</script>
