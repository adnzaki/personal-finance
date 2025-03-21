<template>
  <div :class="wrapperPadding()">
    <q-card class="content-card q-pb-sm">
      <EditFormContent mobile />
    </q-card>
  </div>
</template>

<script setup>
import { wrapperPadding } from 'src/composables/screen'
import EditFormContent from './EditFormContent.vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useCategoryStore } from 'src/stores/category-store'

const store = useCategoryStore()

onBeforeRouteLeave(() => {
  store.data = {
    category_name: '',
    category_type: 'expense',
  }
})
</script>
