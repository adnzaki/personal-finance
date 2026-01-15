<template>
  <div class="row q-col-gutter-sm">
    <div class="col-12">
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
          <div class="q-px-md q-pb-lg">
            <p class="text-center">
              Silakan tambahkan sumber dana terlebih dahulu agar bisa
              menambahkan transaksi.
            </p>
            <div class="row justify-center">
              <div class="col-auto">
                <q-btn
                  icon="add"
                  to="/sumber-dana"
                  class="save-btn see-more"
                  color="primary"
                />
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { dashboardWrapperPadding } from 'src/composables/screen'

const title = ref('Anda belum memiliki sumber dana')
</script>
