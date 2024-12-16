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
            @click="$router.push('/pengaturan')"
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
          <ButtonGroup />
          <search-box label="Cari kategori..." />
          <!-- <main-button class="q-mt-sm" />
          <row-dropdown class="q-mt-sm" />
          <search-box :label="$t('mapel_cari')" class="q-mt-sm" /> -->
        </div>
      </q-card-section>
      <!-- Main content goes here -->
      <DataTable />
      <!-- <AddFormDialog />
      <EditFormDialog /> -->
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { wrapperPadding, titleSpacing } from 'src/composables/screen'
import ButtonGroup from './ButtonGroup.vue'
import DataTable from './DataTable.vue'
// import AddFormDialog from './AddFormDialog.vue'
// import EditFormDialog from './EditFormDialog.vue'

const cardTitle = ref('Kategori')
</script>
