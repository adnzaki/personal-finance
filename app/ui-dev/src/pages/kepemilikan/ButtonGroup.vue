<template>
  <div class="col-12 col-md-8">
    <div class="q-gutter-xs mobile-hide">
      <q-btn
        icon="add"
        class="q-pl-sm custom-round"
        unelevated
        color="primary"
        label="Tambah"
        @click="showForm"
      />
    </div>

    <!-- FAB -->
    <q-page-sticky
      position="bottom-right"
      :offset="fabPos"
      class="mobile-only custom-fab"
    >
      <q-btn
        fab
        icon="add"
        class="custom-round"
        color="primary"
        @click="showForm"
      />
    </q-page-sticky>
  </div>
</template>

<script setup>
import { fabPos } from 'src/composables/fab'
import { useOwnershipStore } from 'stores/ownership-store'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()
const store = useOwnershipStore()

const showForm = () => {
  if ($q.screen.lt.sm) {
    router.push('/kepemilikan/add')
  } else {
    store.showAddForm = true
  }
}
</script>
