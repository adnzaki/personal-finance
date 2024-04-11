import { ref } from 'vue'
import { Screen } from 'quasar'

const singlePos = Screen.lt.sm ? 18 : 25

const fabPos = ref([singlePos, singlePos])
const draggingFab = ref(false)

const moveFab = (ev) => {
  draggingFab.value = ev.isFirst !== true && ev.isFinal !== true

  fabPos.value = [fabPos.value[0] - ev.delta.x, fabPos.value[1] - ev.delta.y]
}

export { fabPos, draggingFab, moveFab, singlePos }
