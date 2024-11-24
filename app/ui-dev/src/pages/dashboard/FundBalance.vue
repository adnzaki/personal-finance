<template>
  <div class="row q-col-gutter-sm">
    <div
      v-for="(item, index) in store.biggestFunds.funds"
      :key="index"
      :class="['col-12', `col-md-${12 / store.biggestFunds.rows}`]"
    >
      <q-card
        :class="['custom-round', 'bg-' + cardColors[index], 'text-white']"
      >
        <q-card-section>
          <div class="text-h6">{{ item.nama }}</div>
          <div class="text-subtitle2">{{ item.total_dana }}</div>
          <q-badge
            v-for="(val, index) in item.pemilik"
            :key="index"
            class="q-mr-xs q-mt-md"
            color="white"
            text-color="black"
          >
            {{ val.label }}:
            <strong class="q-ml-xs"> {{ val.jumlah_dana }}</strong>
          </q-badge>
        </q-card-section>

        <!-- <q-card-actions>
          <q-btn flat>Action 1</q-btn>
          <q-btn flat>Action 2</q-btn>
        </q-card-actions> -->
      </q-card>
    </div>
    <div class="col-12">
      <q-btn
        flat
        label="Lihat Semua"
        to="/sumber-dana"
        class="save-btn q-my-md see-more"
        color="primary"
      />
    </div>
  </div>
</template>
<style lang="sass" scoped>
.see-more
  width: 100%
  padding-top: 10px
  padding-bottom: 10px
</style>
<script setup>
import { getRandomColor } from 'src/composables/utils'
import { useDashboardStore } from 'src/stores/dashboard-store'

const store = useDashboardStore()
const cardColors = ['red-5', 'pink-5', 'purple-5']
store.getBiggestFunds()
</script>
