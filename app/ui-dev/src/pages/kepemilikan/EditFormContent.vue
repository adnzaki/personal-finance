<template>
  <div>
    <!-- Content -->
    <q-card-section class="scroll card-section">
      <q-form class="q-gutter-xs" @submit="save">
        <q-input
          outlined
          v-model="store.data.kepemilikan"
          class="rounded-field"
          label="Nama Pemilik"
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
import { useOwnershipStore } from 'stores/ownership-store'
import { useRouter } from 'vue-router'

const props = defineProps({
  mobile: {
    type: Boolean,
    default: false,
  },
})
const store = useOwnershipStore()
const router = useRouter()

const save = () =>
  store.save({
    id: store.data.id,
    afterSuccess: () => closeForm(),
  })

const closeForm = () => {
  if (props.mobile) {
    router.push('/kepemilikan')
  } else {
    store.showEditForm = false
  }

  store.data.kepemilikan = ''
}
</script>
