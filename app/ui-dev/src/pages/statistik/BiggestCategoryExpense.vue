<template>
  <div class="q-pa-md">
    <div
      class="row q-col-gutter-sm"
      v-if="store.biggestTransaction.response.length > 0"
    >
      <div class="col-12">
        <div class="text-h6">Pengeluaran terbesar</div>
      </div>
      <div class="col-12 col-md-6">
        <div class="container">
          <Doughnut :data="data" v-if="loaded" :options="options"
            >No data to display</Doughnut
          >
        </div>
      </div>
      <div class="col-12 col-md-6">
        <BiggestCategoryList />
        <div class="col-12">
          <q-btn
            flat
            label="Lihat Detail"
            :to="`/statistik/kategori/${store.dateRange}`"
            class="save-btn btn-w100 q-my-md see-more"
            color="primary"
          />
        </div>
      </div>
    </div>
    <div class="row q-col-gutter-sm" v-else>
      <div class="col-12">
        <div class="text-subtitle-1 q-mb-lg">
          Tidak ada data pengeluaran di periode ini.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, toRefs } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useStatisticStore } from 'src/stores/statistic-store'
import BiggestCategoryList from './BiggestCategoryList.vue'

const store = useStatisticStore()
const data = ref(null)
const loaded = ref(false)
const options = {
  responsive: true,
  maintainAspectRatio: false,
}

const backgroundColors = ref([
  '#41B883',
  '#E46651',
  '#00D8FF',
  '#DD1B16',
  '#FFC0CB',
])

ChartJS.register(ArcElement, Tooltip, Legend)
store.getBiggestTransactionByCategory()

watch(store, () => {
  console.log('Biggest transaction changed!')
  const { category, totalTransaction } = toRefs(store.biggestTransaction)
  data.value = {
    labels: category.value,
    datasets: [
      {
        /** ini batesin aja sesuai panjang responsenya. misal response.category.length cuma 2, jadi isinya disini 2 aja */
        backgroundColor: backgroundColors.value.slice(0, category.value.length),
        data: totalTransaction.value,
      },
    ],
  }

  loaded.value = true
})
</script>
