<template>
  <div class="q-pa-sm">
    <div class="row">
      <div :class="[rangeWidth, 'q-mt-sm']">
        <p>{{ rowRange }}</p>
      </div>
      <div :class="[navWidth, navOffset]" v-if="totalPages() > 0">
        <q-pagination
          :model-value="modelValue"
          :max="totalPages()"
          input
          @update:model-value="onPaginationUpdate"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useQuasar } from 'quasar'
import { conf } from 'src/router/http'
import { errorNotif } from 'src/composables/notify'
import { usePagingStore } from 'ss-paging-vue'

const props = defineProps({
  modelValue: [Number, String],
  rangeWidth: {
    type: String,
    default: 'col-12 col-md-6',
  },
  navWidth: {
    type: String,
    default: 'col-12 col-md-2',
  },
  navOffset: {
    type: String,
    default: 'offset-md-4',
  },
})

const emit = defineEmits(['update:modelValue'])

const $q = useQuasar()
const paging = usePagingStore()

const totalPages = () => {
  const pageLinks = computed(() => paging.state.pageLinks)

  return pageLinks.value.length
}

const onPaginationUpdate = (value) => {
  if ($q.cookies.has(conf.cookieName)) {
    emit('update:modelValue', value)
    paging.nav(value - 1)
  } else {
    errorNotif()
  }
}

const rowRange = computed(() => paging.rowRange())
</script>
