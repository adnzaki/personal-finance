<template>
  <div :class="wrapperPadding()">
    <q-card class="content-card">
      <q-card-section class="q-mb-md">
        <div class="row">
          <q-btn
            color="teal"
            flat
            class="back-button q-mb-md"
            rounded
            icon="arrow_back"
            @click="$router.push('/dashboard')"
            v-if="$q.screen.lt.sm"
          />

          <div
            class="text-subtitle1 text-uppercase q-mt-xs page-title-pl-5"
            v-if="$q.screen.lt.sm"
          >
            {{ cardTitle }}
          </div>
          <div class="text-h6 text-capitalize" v-else>
            {{ cardTitle }}
          </div>
        </div>
        <div :class="['row', titleSpacing()]">
          <DateFilter v-if="$q.screen.gt.md && !hideDateFilter" />
          <RangeType v-if="!hideDateFilter" />
          <DateFilter
            v-if="
              $q.screen.lt.md &&
              !hideDateFilter &&
              store.range.value === 'custom'
            "
          />
          <q-btn
            color="primary"
            class="custom-round btn-w100"
            :label="toggleFilterBtnText"
            v-if="$q.screen.lt.md"
            @click="toggleDateFilter"
          />
        </div>
      </q-card-section>
      <!-- Main content goes here -->
      <RangeNavigator />
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { wrapperPadding, titleSpacing } from 'src/composables/screen'
import RangeType from './RangeType.vue'
import DateFilter from './DateFilter.vue'
import { useStatisticStore } from 'src/stores/statistic-store'
import RangeNavigator from './RangeNavigator.vue'

const store = useStatisticStore()

const cardTitle = ref('Statistik')
const hideDateFilter = ref(false)
const defaultToggleButton = 'Sembunyikan Filter Tanggal'
const toggleFilterBtnText = ref(defaultToggleButton)

const toggleDateFilter = () => {
  hideDateFilter.value = !hideDateFilter.value
  toggleFilterBtnText.value = hideDateFilter.value
    ? 'Tampilkan Filter Tanggal'
    : defaultToggleButton
}
</script>
