<template>
  <div :class="spaces" :style="{ marginTop: navWrapper }">
    <div class="row" v-if="totalPages > 0">
      <div class="col-2 col-sm-1 text-center prev-bg">
        <q-btn
          color="primary"
          class="custom-round prev-btn"
          size="lg"
          flat
          icon="keyboard_arrow_left"
          :disable="modelValue === 1"
          @click="navigate(prev)"
        />
      </div>
      <div class="col-8 col-sm-10 range-bg q-pt-md">
        <p class="text-center">{{ pageInfo }}</p>
      </div>
      <div class="col-2 col-sm-1 text-center next-bg">
        <q-btn
          color="primary"
          class="custom-round next-btn"
          size="lg"
          flat
          icon="keyboard_arrow_right"
          :disable="modelValue === totalPages"
          @click="navigate(next)"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p class="text-center">{{ store.rowRange() }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@media(max-width: $breakpoint-sm-min)
  .prev-btn
    margin-left: 2px
  .next-btn
    margin-left: -8px
.prev-bg
  // background-color: $positive
.next-bg
  // background-color: $secondary
.range-bg
  // background-color: $primary
</style>

<script setup>
import { useQuasar } from 'quasar'
import { conf } from 'src/router/http'
import { computed, toRefs } from 'vue'
import { usePagingStore } from 'ss-paging-vue'
import { errorNotif } from 'src/composables/notify'

const $q = useQuasar()
const store = usePagingStore()
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const spaces = computed(() =>
  store.state.data.length > 4 ? 'q-pt-md q-pb-lg q-mb-xl' : 'q-py-md',
)

const { prev, next } = toRefs(store.state)

const navWrapper = computed(() => ($q.screen.lt.md ? '0' : '-30px'))
const totalPages = computed(() => {
  const pageLinks = computed(() => store.state.pageLinks)

  return pageLinks.value.length
})

const navigate = (direction) => {
  if ($q.cookies.has(conf.cookieName)) {
    store.nav(direction)
    emit('update:modelValue', direction + 1)
  } else {
    errorNotif()
  }
}

const pageInfo = computed(() => `${props.modelValue} / ${totalPages.value}`)
</script>
