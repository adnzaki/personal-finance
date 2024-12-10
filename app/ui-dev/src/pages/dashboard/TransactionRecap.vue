<template>
  <div :class="[dashboardWrapperPadding(), 'q-mb-md']">
    <q-card class="content-card custom-round">
      <q-card-section class="q-mb-lg">
        <div
          class="text-subtitle1 text-uppercase q-mb-sm"
          v-if="$q.screen.lt.sm"
        >
          {{ title }}
        </div>
        <div class="text-h6 text-capitalize" v-else>{{ title }}</div>
      </q-card-section>
      <!-- Main content goes here -->
      <div class="q-px-md q-pb-md">
        <q-list
          bordered
          class="rounded-borders"
          separator
          v-if="data.length > 0"
        >
          <q-item clickable v-for="(item, index) in data" :key="index">
            <q-item-section avatar><q-icon :name="icon" /></q-item-section>
            <q-item-section>
              <q-item-label>{{ item.category_name }}</q-item-label>
              <q-item-label caption>{{ item.total_nominal }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <p v-else>Belum ada transaksi.</p>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { dashboardWrapperPadding } from 'src/composables/screen'

defineProps({
  data: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
})
</script>
