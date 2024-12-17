<template>
  <div :class="wrapperPadding()">
    <q-card class="content-card q-pb-sm">
      <q-card-section>
        <div class="text-subtitle1 text-uppercase">
          {{ store.formTitle }}
        </div>
      </q-card-section>

      <AddFormContent mobile />
    </q-card>
  </div>
</template>

<script setup>
import { wrapperPadding } from 'src/composables/screen'
import { useCategoryStore } from 'stores/category-store'
import AddFormContent from './AddFormContent.vue'

const store = useCategoryStore()
</script>
