<template>
  <div>
    <q-card-section class="scroll card-section">
      <ul>
        <li v-for="(item, index) in changelog" :key="index">
          <strong>{{ item.title }}</strong
          >:
          {{ item.detail }}
        </li>
      </ul>
    </q-card-section>

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

<script setup>
import { useRouter } from 'vue-router'
import changelog from 'src/composables/changelog'

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
