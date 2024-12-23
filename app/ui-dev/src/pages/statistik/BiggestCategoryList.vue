<template>
  <q-list bordered class="rounded-borders" separator v-if="data.length > 0">
    <q-item clickable v-for="(item, index) in data" :key="index">
      <q-item-section avatar><q-icon name="o_payments" /></q-item-section>
      <q-item-section>
        <q-item-label>{{ item.category_name }}</q-item-label>
        <q-item-label caption
          >{{ item.total_nominal }} ({{ item.percentage }})</q-item-label
        >
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { computed } from 'vue'
import { useStatisticStore } from 'src/stores/statistic-store'

const store = useStatisticStore()

const data = computed(() => store.biggestTransaction.response)
</script>
