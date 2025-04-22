<template>
  <div>
    <q-btn
      flat
      round
      dense
      icon="bolt"
      @click="showChangelog"
      v-if="$route.path !== '/changelog'"
    >
      <!-- <q-badge color="yellow" text-color="black" floating>{{
        changelog.length
      }}</q-badge> -->
    </q-btn>

    <q-dialog no-backdrop-dismiss v-model="show">
      <q-card class="q-pa-sm" :style="dialogSize()">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-capitalize">Informasi</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <ModalContent v-model="show" />
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { dialogSize } from 'src/composables/screen'
import ModalContent from './ModalContent.vue'
// import changelog from 'src/composables/changelog'

const $q = useQuasar()
const router = useRouter()
const show = ref(false)

const showChangelog = () => {
  if ($q.screen.lt.sm) {
    router.push('/changelog')
  } else {
    show.value = true
  }
}
</script>
