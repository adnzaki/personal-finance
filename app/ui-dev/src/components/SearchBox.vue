<template>
  <div :class="[rootClass, 'justify-data-options']">
    <q-input
      outlined
      bottom-slots
      v-model="paging.state.search"
      :label="label"
      @keyup.enter="filter"
      :dense="dense()"
      :class="rounded"
    >
      <template v-slot:append>
        <q-icon name="search" @click="filter" class="cursor-pointer" />
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { computed, watch } from 'vue'
import { conf } from '../router/http'
import { errorNotif } from '../composables/notify'
import { usePagingStore } from 'ss-paging-vue'
import { dense } from '../composables/screen'

const props = defineProps({
  label: {
    type: String,
  },
  rootClass: {
    type: String,
    default: 'col-12 col-md-4',
  },
})

const paging = usePagingStore()
const $q = useQuasar()
let search = computed(() => paging.state.search)
watch(search, () => paging.onSearchChanged())

const rounded = computed(() => ($q.screen.lt.sm ? 'rounded-field' : ''))

const filter = () => {
  if ($q.cookies.has(conf.cookieName)) {
    paging.filter()
  } else {
    errorNotif()
  }
}
</script>
