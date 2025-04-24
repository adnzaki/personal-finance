<template>
  <div>
    <!-- Content -->
    <q-card-section class="scroll card-section mobile-form-space">
      <q-form class="q-gutter-xs" @submit="save">
        <q-select
          filled
          v-model="store.fundId"
          :options="store.fundSource"
          label="Sumber Dana"
          class="rounded-field q-mb-md"
          @update:model-value="onFundSelected"
        />
        <q-select
          filled
          v-model="store.ownerId"
          :options="store.owners"
          label="Pemilik"
          class="rounded-field q-mb-md"
          @update:model-value="onOwnerSelected"
        />
        <q-btn-toggle
          v-model="store.data.jenis_transaksi"
          toggle-color="teal-10"
          color="teal-5"
          rounded
          unelevated
          spread
          class="q-mb-md"
          size="16px"
          :options="[
            { label: 'Income', value: 'income' },
            { label: 'Expense', value: 'expense' },
            { label: 'Transfer', value: 'transfer' },
          ]"
          @update:model-value="onTransactionTypeChanged"
        />
        <q-input
          outlined
          v-model="dateStr"
          readonly
          class="rounded-field q-mb-md"
        >
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  @update:model-value="datePickerChanged"
                  v-model="dateValue"
                  mask="YYYY-MM-DD HH:mm"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time
                  :disable="readonly"
                  @update:model-value="datePickerChanged"
                  v-model="dateValue"
                  mask="YYYY-MM-DD HH:mm"
                  format24h
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          outlined
          v-model="store.data.deskripsi"
          class="rounded-field q-mb-md"
          label="Deskripsi"
          :rules="[(val) => !!val || 'Deskripsi Tidak Boleh Kosong']"
        />
        <q-input
          outlined
          v-model="store.data.nominal"
          class="rounded-field"
          input-class="nominal"
          label="Nominal"
          @update:model-value="onInput"
          :rules="[(val) => validateNumber(val, true) || 'Nominal Tidak Valid']"
        />
        <!-- For Add New Transaction -->
        <dropdown-search
          @selected="onCategorySelected"
          label="Kategori"
          :list="store.categories"
          :options-value="{ label: 'category_name', value: 'id' }"
          load-on-route
          custom-class="rounded-field"
          v-if="showCategory && store.transactionId === null"
        />

        <!-- For Edit Transaction -->
        <dropdown-search
          @selected="onCategorySelected"
          label="Kategori"
          :list="store.categories"
          :default="{
            label: store.categoryName,
            value: store.data.id_kategori,
          }"
          :options-value="{ label: 'category_name', value: 'id' }"
          load-on-route
          custom-class="rounded-field"
          v-if="showCategory && store.transactionId !== null"
        />
        <q-select
          filled
          v-model="store.destinationFundId"
          :options="store.targetFunds"
          label="Sumber Dana Tujuan"
          class="rounded-field q-mt-sm"
          @update:model-value="onTargetFundSelected"
          v-if="!showCategory"
        />

        <q-select
          filled
          v-model="store.destinationOwnerId"
          :options="store.targetOwners"
          label="Pemilik"
          class="rounded-field q-mt-md"
          @update:model-value="onTargetOwnerSelected"
          v-if="!showCategory"
        />
      </q-form>
    </q-card-section>

    <!-- Action button -->
    <q-card-actions align="right">
      <q-btn
        flat
        label="Tutup"
        @click="closeForm"
        class="custom-round close-btn"
        color="negative"
      />
      <q-btn
        unelevated
        label="Simpan"
        @click="save"
        class="save-btn"
        color="primary"
        v-if="$q.screen.gt.xs"
      />
    </q-card-actions>
    <save-btn @click="save" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { date, useQuasar } from 'quasar'
import { useTransactionStore } from 'stores/transaction-store'
import { indonesiaDate, validateNumber } from 'src/composables/utils'
import { formatNumeral } from 'z-cleave-zen'

const props = defineProps({
  mobile: {
    type: Boolean,
    default: false,
  },
})
const store = useTransactionStore()
const router = useRouter()
const $q = useQuasar()
const showCategory = ref(true)

const onTransactionTypeChanged = (v) => {
  if (v === 'transfer') {
    showCategory.value = false
  } else {
    showCategory.value = true
    store.data.jenis_transaksi = v
    if (store.transactionId === null) {
      store.getCategories()
    } else {
      store.getCategories(store.data.id_kategori)
    }
  }
}

onBeforeRouteLeave((to, from, next) => {
  store.data.jenis_transaksi = 'expense'
  next()
})

const dateModelFormat = 'YYYY-MM-DD HH:mm'
const defaultDateValue = date.formatDate(new Date(), dateModelFormat)

const dateStrFormat = $q.screen.gt.sm
  ? 'dddd, DD MMMM YYYY | HH:mm'
  : 'ddd, DD-MMM-YYYY | HH:mm'
const formatDate = (val) => date.formatDate(val, dateStrFormat, indonesiaDate)
const dateStr = ref(formatDate(new Date()))
const dateValue = ref(defaultDateValue)

// set initial value
// this is only fired when transaction is created
if (store.transactionId === null) {
  store.data.tgl_transaksi = defaultDateValue
}

const datePickerChanged = (val) => {
  dateStr.value = formatDate(new Date(val))

  // update transaction date in store
  store.data.tgl_transaksi = val
}

// this is only fired when transaction is edited
if (store.transactionId !== null) {
  onTransactionTypeChanged(store.data.jenis_transaksi)
  dateStr.value = formatDate(new Date(store.data.tgl_transaksi))
}

const onInput = (v) => {
  store.data.nominal = formatNumeral(v, { allowArithmetic: true })
}

const onCategorySelected = (v) => {
  store.data.id_kategori = v.value
}

const onTargetFundSelected = (v) => {
  store.data.sumber_dana_tujuan = v.value
  store.getTargetOwners(v.value)
}

const onTargetOwnerSelected = (v) => {
  store.data.pemilik_dana_tujuan = v.value
}

const onOwnerSelected = (v) => {
  store.data.id_pemilik_sumber_dana = v.value
}

const onFundSelected = (v) => {
  store.getOwnerByFundSource(v.value)
  store.getTargetFunds(v.value)
  if (store.transactionId === null) {
    store.getCategories()
  }
}

const save = () => {
  store.save(() => {
    closeForm()
    showCategory.value = true
  })
}

const closeForm = () => {
  if (props.mobile) {
    router.back()
  } else {
    store.showForm = false
  }

  store.resetForm()
}
</script>
