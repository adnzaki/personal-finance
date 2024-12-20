<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-md-6">
        <q-card class="custom-round bg-red-5 text-white">
          <q-card-section>
            <div class="text-h6">Total Pemasukan</div>
            <div class="text-subtitle1">
              <q-badge
                size="lg"
                class="q-mr-xs q-mt-md total-income-expense"
                color="white"
                text-color="black"
                ><strong class="q-ml-xs">
                  {{ store.totalIncome }}</strong
                ></q-badge
              >
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-6">
        <q-card class="custom-round bg-pink-5 text-white">
          <q-card-section>
            <div class="text-h6">Total Pengeluaran</div>
            <div class="text-subtitle2">
              <q-badge
                class="q-mr-xs q-mt-md total-income-expense"
                color="white"
                text-color="black"
                ><strong class="q-ml-xs">
                  {{ store.totalExpense }}</strong
                ></q-badge
              >
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.total-income-expense
  font-size: .8rem
</style>

<script setup>
import { useStatisticStore } from 'src/stores/statistic-store'

const store = useStatisticStore()
</script>
