<template>
  <div>
    <q-card-section class="scroll card-section">
      <q-markdown :src="updates" />
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
import { useRouter } from 'vue-router'
import updates from 'src/assets/updates/1.0.0-beta.4.md'

const router = useRouter()

const props = defineProps({
  modelValue: Boolean,
  mobile: {
    default: false,
    type: Boolean,
  },
})

const emit = defineEmits(['update:modelValue'])
const close = () => {
  if (props.mobile) router.back()
  emit('update:modelValue', false)
}
</script>
