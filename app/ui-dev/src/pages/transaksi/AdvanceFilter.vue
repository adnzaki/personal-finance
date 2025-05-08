<template>
  <q-dialog
    no-backdrop-dismiss
    v-model="store.showFilter"
    @before-show="prepareFilter"
    :maximized="maximizedDialog()"
  >
    <q-card class="q-pa-sm" :style="dialogSize()">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-capitalize">Filter</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="scroll card-section">
        <q-form class="q-gutter-xs">
          <q-select
            filled
            v-model="store.filter.fundId"
            :options="store.fundSource"
            label="Sumber Dana"
            class="rounded-field q-mb-md"
            @update:model-value="onFundSelected"
          >
            <template v-slot:append>
              <q-icon
                name="close"
                class="cursor-pointer"
                @click.stop.prevent="clearSelectedFund"
              />
            </template>
          </q-select>
          <q-select
            filled
            v-model="store.filter.ownerId"
            :options="store.filter.owners"
            label="Pemilik"
            class="rounded-field q-mb-md"
            ><template v-slot:append>
              <q-icon
                name="close"
                class="cursor-pointer"
                @click.stop.prevent="clearSelectedFilter('ownerId')"
              /> </template
          ></q-select>
          <q-select
            filled
            v-model="store.filter.transactionType"
            :options="transactionType"
            label="Jenis Transaksi"
            class="rounded-field q-mb-md"
            @update:model-value="onTransactionTypeChanged"
            ><template v-slot:append>
              <q-icon
                name="close"
                class="cursor-pointer"
                @click.stop.prevent="clearTransactionType"
              /> </template
          ></q-select>
          <dropdown-search
            label="Kategori"
            :list="store.filter.categories"
            :options-value="{ label: 'category_name', value: 'id' }"
            load-on-route
            custom-class="rounded-field"
            show-reset
            @action:reset="clearCategory"
            :disable="disableCategory"
            @selected="onCategorySelected"
            disable-auto-select
            v-if="
              store.filter.category.value === 'all' ||
              store.filter.category === ''
            "
          />
          <dropdown-search
            label="Kategori"
            :list="store.filter.categories"
            :options-value="{ label: 'category_name', value: 'id' }"
            load-on-route
            custom-class="rounded-field"
            show-reset
            @action:reset="clearCategory"
            :default="{
              label: store.filter.category.label,
              value: store.filter.category.value,
            }"
            :disable="disableCategory"
            @selected="onCategorySelected"
            disable-auto-select
            v-else
          />
        </q-form>
        <q-btn
          unelevated
          label="Reset Filter"
          class="q-mt-md btn-w100 save-btn"
          color="negative"
          icon="autorenew"
          @click="resetFilter"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          unelevated
          label="Terapkan"
          @click="applyFilter"
          class="save-btn mobile-save-btn"
          color="primary"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useTransactionStore } from 'stores/transaction-store'
import { dialogSize, maximizedDialog } from 'src/composables/screen'

const store = useTransactionStore()
const disableCategory = ref(false)
// const showCategory = computed(() => {})

const transactionType = ref([
  { label: 'Income', value: 'income' },
  { label: 'Expense', value: 'expense' },
  { label: 'Transfer', value: 'transfer' },
])

const prepareFilter = () => {
  store.filterMode = true

  // make all filter not to be selected
  if (store.filter.fundId.value === 'all') {
    store.filter.fundId = ''
    store.filter.owners = []
  }

  if (store.filter.ownerId.value === 'all') {
    store.filter.ownerId = ''
  }

  if (store.filter.transactionType.value === 'all') {
    store.filter.transactionType = ''
  }

  if (store.filter.category.value === 'all') {
    store.filter.category = ''
  }
}

const defaultFilterValue = { label: 'Semua', value: 'all' }
const applyFilter = () => {
  store.filter.fundId =
    store.filter.fundId === '' ? defaultFilterValue : store.filter.fundId
  store.filter.ownerId =
    store.filter.ownerId === '' ? defaultFilterValue : store.filter.ownerId

  store.filter.transactionType =
    store.filter.transactionType === ''
      ? defaultFilterValue
      : store.filter.transactionType

  store.filter.category =
    store.filter.category === '' ? defaultFilterValue : store.filter.category
  store.filterMode = false
  store.showFilter = false
  store.getTransactions()
}

const onTransactionTypeChanged = (v) => {
  if (v.value === 'transfer') {
    disableCategory.value = true
    store.filter.category = defaultFilterValue
    store.categories = []
  } else {
    disableCategory.value = false
    store.filter.transactionType.value = v.value
    store.getCategories()
  }
}

const onCategorySelected = (v) => {
  store.filter.category = {
    label: v.label,
    value: v.value,
  }
}

const clearCategory = () => {
  store.filter.category = ''
}

const onFundSelected = (v) => {
  store.getOwnerByFundSource(v.value)
}

const clearSelectedFilter = (filterName) => {
  store.filter[filterName] = ''
}

const clearSelectedFund = () => {
  clearSelectedFilter('fundId')
  store.filter.ownerId = ''
  store.filter.owners = []
}

const clearTransactionType = () => {
  clearSelectedFilter('transactionType')
  store.filter.category = ''
  store.filter.categories = []
  disableCategory.value = false
}

const resetFilter = () => {
  store.filter.fundId = defaultFilterValue
  store.filter.ownerId = defaultFilterValue
  store.filter.transactionType = defaultFilterValue
  store.filter.category = defaultFilterValue

  prepareFilter()
  disableCategory.value = false
  store.filter.categories = []
}
</script>
