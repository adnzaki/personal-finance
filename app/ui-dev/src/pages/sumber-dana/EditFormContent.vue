<template>
  <div>
    <!-- Content -->
    <q-card-section class="scroll card-section">
      <q-form class="q-gutter-xs" @submit="save">
        <q-input
          outlined
          v-model="store.data.nama"
          class="rounded-field"
          label="Nama Sumber Dana"
        />
        <dropdown-search
          @selected="onOwnerSelected"
          label="Pilih Kepemilikan"
          :list="store.ownerList"
          :options-value="{ label: 'kepemilikan', value: 'id' }"
          load-on-route
          custom-class="rounded-field q-mt-md"
          v-if="showOwnerInput"
        />

        <q-input
          outlined
          v-model="store.data.balance"
          class="rounded-field q-mt-md"
          label="Jumlah Saldo"
          input-class="saldo"
          :rules="[(val) => validateNumber(val) || 'Jumlah Saldo Tidak Valid']"
          @keyup.enter="addBalance"
          v-if="showOwnerInput"
        />

        <q-list
          bordered
          class="rounded-borders q-mt-md"
          separator
          v-if="kepemilikan.length > 0 && showOwnerList"
        >
          <q-item clickable v-for="(item, index) in kepemilikan" :key="index">
            <q-item-section avatar><q-icon name="credit_card" /></q-item-section
            ><q-item-section
              >{{ item.name }}
              <q-item-label caption>{{
                formatDecimal(item.jumlah_dana)
              }}</q-item-label></q-item-section
            ><q-item-section side>
              <q-btn
                class="custom-round"
                flat
                color="primary"
                icon="r_delete_outline"
                @click="store.removeBalance(item)"
              /> </q-item-section
          ></q-item>
        </q-list>

        <q-btn
          unelevated
          label="Tambah Saldo"
          @click="addOwner"
          class="save-btn q-mt-md"
          color="blue"
          icon="add"
          style="width: 100%"
          v-if="!showOwnerInput"
        />

        <q-btn
          unelevated
          label="Simpan Saldo"
          @click="addBalance"
          class="save-btn q-mt-md"
          color="blue"
          icon="save"
          style="width: 100%"
          v-if="showOwnerInput"
        />
        <q-btn
          unelevated
          label="Batalkan"
          @click="closeOwner"
          class="save-btn q-mt-md"
          color="negative"
          icon="close"
          style="width: 100%"
          v-if="showOwnerInput"
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
        class="save-btn mobile-hide"
        color="primary"
      />
    </q-card-actions>
    <save-btn @click="save" />
  </div>
</template>
<script setup>
import { useFundStore } from 'stores/fund-store'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { formatDecimal, validateNumber } from 'src/composables/utils'
import { formatNumeral } from 'cleave-zen'

const props = defineProps({
  mobile: {
    type: Boolean,
    default: false,
  },
})

const store = useFundStore()
const router = useRouter()
const $q = useQuasar()
const showOwnerInput = ref(false)
const showOwnerList = ref(true)
const kepemilikan = computed(() => store.data.kepemilikan)

const save = () => {
  showOwnerList.value = false
  store.save(closeForm)
}

const onOwnerSelected = (v) => {
  store.data.ownerId = v.value
  store.data.ownerName = v.label
}

const addBalance = () => {
  store.addBalance()
  showOwnerInput.value = false
  showOwnerList.value = true
}

const addOwner = () => {
  if (store.ownerList.length > 0) {
    showOwnerInput.value = true

    const amountInput = ref(null)
    setTimeout(() => {
      amountInput.value = document.querySelector('.saldo')
      amountInput.value.addEventListener('input', (e) => {
        const value = e.target.value
        store.data.balance = formatNumeral(value)
      })
    }, 500)
  } else {
    $q.notify({
      type: 'negative',
      message: 'Silakan tambah data pemilik terlebih dahulu',
      position: 'center',
    })
  }
}

const closeOwner = () => {
  showOwnerInput.value = false
}

const closeForm = () => {
  if (props.mobile) {
    router.push('/sumber-dana')
  } else {
    store.showEditForm = false
  }

  store.fundId = null

  store.data = {
    nama: '',
    kepemilikan: [],
    ownerName: '',
    ownerId: null,
    balance: 0,
  }
}
</script>
