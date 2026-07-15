<template>
  <div>
    <q-card-section class="scroll card-section">
      <q-markdown no-heading-anchor-links :src="updates" />
      <p>
        Yuk, bantu dukung SisaUang untuk tetap berjalan dan terus berkembang.
        Silakan kunjungi halaman
        <a href="javascript:void" @click="goto('/dukungan', '/changelog')"
          >Dukungan</a
        >
        untuk info lebih lanjut.
      </p>
    </q-card-section>

    <q-separator class="mobile-hide" />

    <q-card-actions align="right">
      <q-btn
        flat
        label="Tutup"
        class="custom-round close-btn"
        color="negative"
        @click="close"
      />
    </q-card-actions>
  </div>
</template>

<style lang="sass" scoped>
.changelog-content
  border: solid 2px $primary
  border-radius: 15px
  box-shadow: 0 0 5px rgba(209, 48, 121, 0.3)
</style>

<script setup>
import updates from '@/assets/updates/1.0.0-rc.1.md'
import { inject } from 'vue'

const goto = inject('goto')

defineProps({
  modelValue: Boolean,
  mobile: {
    default: false,
    type: Boolean,
  },
})

const emit = defineEmits(['update:modelValue'])
const close = () => {
  emit('update:modelValue', false)
}
</script>
