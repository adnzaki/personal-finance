<template>
  <div :class="wrapperPadding()">
    <q-card class="content-card q-pb-sm">
      <q-card-section>
        <div class="text-subtitle1 text-uppercase">
          {{ store.formTitle }}
        </div>
      </q-card-section>

      <EditFormContent mobile />
    </q-card>
  </div>
</template>

<script setup>
import { wrapperPadding } from 'src/composables/screen'
import { useFundStore } from 'src/stores/fund-store'
import EditFormContent from './EditFormContent.vue'
import { onBeforeRouteLeave } from 'vue-router'

const store = useFundStore()

store.getPemilik()

onBeforeRouteLeave(() => {
  store.data = {
    nama: '',
    kepemilikan: [],
    ownerName: '',
    ownerId: null,
    balance: '0',
  }
  store.ownerList = []
  store.deletedBalance = []
})
</script>
