<template>
  <div :class="wrapperPadding()">
    <q-card class="content-card">
      <q-card-section class="q-mb-md">
        <div class="text-subtitle1 text-uppercase" v-if="$q.screen.lt.sm">
          {{ cardTitle }}
        </div>
        <div class="text-h6 text-capitalize" v-else>{{ cardTitle }}</div>
        <div :class="['row', titleSpacing()]">
          <ButtonGroup />
          <search-box label="Cari sumber dana..." />
          <!-- <main-button class="q-mt-sm" />
          <row-dropdown class="q-mt-sm" />
          <search-box :label="$t('mapel_cari')" class="q-mt-sm" /> -->
        </div>
      </q-card-section>
      <DataTable />
      <!-- Main content goes here -->
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { wrapperPadding, titleSpacing } from 'src/composables/screen.js'
import ButtonGroup from './ButtonGroup.vue'
import DataTable from './DataTable.vue'

const cardTitle = ref('Sumber Dana')
</script>
