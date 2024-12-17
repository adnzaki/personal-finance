<template>
  <div>
    <!-- Content -->
    <q-card-section class="scroll card-section">
      <q-form class="q-gutter-xs" @submit="save">
        <q-input
          outlined
          v-model="store.data.category_name"
          class="rounded-field q-mb-md"
          label="Nama Kategori"
          :rules="[(val) => !!val || 'Nama Kategori Tidak Boleh Kosong']"
        />
        <q-btn-toggle
          v-model="store.data.category_type"
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
          ]"
        />
      </q-form>
    </q-card-section>

    <!-- Action button -->
    <q-card-actions align="right">
      <q-btn
        flat
        label="Tutup"
        @click="closeForm"
        class="custom-round"
        color="negative"
      />
      <q-btn
        unelevated
        label="Simpan"
        @click="save"
        class="save-btn"
        color="primary"
      />
    </q-card-actions>
  </div>
</template>
<script setup>
import { useCategoryStore } from 'stores/category-store'
import { useRouter } from 'vue-router'

const props = defineProps({
  mobile: {
    type: Boolean,
    default: false,
  },
})
const store = useCategoryStore()
const router = useRouter()

const save = () =>
  store.save({
    id: store.data.id,
    afterSuccess: () => closeForm(),
  })

const closeForm = () => {
  if (props.mobile) {
    router.push('/kategori')
  } else {
    store.showEditForm = false
  }
}
</script>
