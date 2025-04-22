<template>
  <div>
    <q-card-section class="scroll card-section">
      <q-markdown
        :src="support"
        :class="[$q.screen.lt.sm ? 'q-pb-lg q-mb-md' : '']"
      />

      <q-btn
        icon="r_double_arrow"
        unelevated
        :label="label"
        :href="trakteerLink"
        class="save-btn normal-case"
        color="primary"
        v-if="$q.screen.gt.xs"
      />
      <save-btn normal-case :label="label" @click="openTrakteerLink" />
    </q-card-section>
  </div>
</template>

<style scoped>
.normal-case {
  text-transform: none !important;
}
</style>

<script setup>
import { ref } from 'vue'
import support from 'src/assets/support.md'

const trakteerLink = ref('https://trakteer.id/adnan_zaki')
const label = ref('Dukung SisaUang di Trakteer')
const openTrakteerLink = () => {
  window.open(trakteerLink.value, '_blank')
}
</script>
