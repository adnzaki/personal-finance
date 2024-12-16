<template>
  <div class="col-12 col-md-8">
    <div class="q-gutter-xs">
      <q-btn
        icon="add"
        class="q-pl-sm custom-round mobile-hide"
        unelevated
        color="primary"
        label="Tambah"
        @click="store.showAddForm = true"
      />
      <q-btn
        :icon="visibleIcon"
        :class="['q-pl-sm custom-round', visibleClass]"
        unelevated
        color="primary"
        :label="visibleText + ' Kategori Default'"
        @click="toggleDefault"
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
        to="/sumber-dana/add"
      />
    </q-page-sticky>
  </div>
</template>

<script setup>
import { fabPos } from 'src/composables/fab'
import { computed } from 'vue'
import { useQuasar } from 'quasar'
import { useCategoryStore } from 'src/stores/category-store'

const store = useCategoryStore()
const $q = useQuasar()

const visibleIcon = computed(() => {
  return store.hideDefault === 1 ? 'visibility' : 'visibility_off'
})

const visibleText = computed(() => {
  return store.hideDefault === 1 ? 'Tampilkan' : 'Sembunyikan'
})

const visibleClass = computed(() => {
  return $q.screen.lt.md ? 'btn-w98 q-mb-md' : ''
})

const toggleDefault = () => {
  store.hideDefault = store.hideDefault === 1 ? 0 : 1
  store.toggleDefaultCategory()
}
</script>
