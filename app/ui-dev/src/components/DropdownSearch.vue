<template>
  <div :class="['col-12 q-mt-sm', flexGrid]">
    <q-select
      :class="customClass"
      :disable="disable"
      outlined
      :model-value="model"
      use-input
      input-debounce="0"
      :options="options"
      @filter="filterFn"
      @update:model-value="selectedHandler"
      :label="label"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
      <template v-slot:append v-if="showReset">
        <q-icon
          name="close"
          class="cursor-pointer"
          @click.stop.prevent="onReset"
        />
      </template>
    </q-select>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'

export default {
  name: 'DropdownSearch',
  props: {
    loader: {
      type: Function,
      required: false,
    },
    labelAsOption: {
      type: [String, Boolean],
      default: '',
    },
    showReset: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
      default: () => [],
    },
    optionsValue: {
      type: Object,
    },
    flexGrid: {
      type: String,
      default: '',
    },
    param: {
      type: [String, Number, Object],
      default: null,
    },
    loadOnRoute: {
      type: Boolean,
      default: false,
    },
    default: Object,
    disable: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    },
    disableAutoSelect: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['selected', 'action:reset'],

  setup(props, { emit }) {
    const options = ref([])
    const model = ref({})
    const stringOptions = ref([])

    const selectedHandler = (v) => {
      emit('selected', v)
      model.value = v
    }

    const onReset = () => {
      model.value = null
      emit('action:reset')
    }

    let modelValue = null

    if (props.default !== undefined) {
      modelValue = {
        label: props.default.label,
        value: props.default.value,
      }
    } else {
      if (props.label === undefined) {
        modelValue = {
          label: props.labelAsOption,
          value: null,
        }
      }
    }

    model.value = modelValue
    stringOptions.value = [modelValue]

    const getList = async () => {
      if (props.loadOnRoute === undefined) {
        if (props.param !== undefined) {
          props.loader(props.param)
        } else {
          props.loader()
        }
      }

      return new Promise((resolve) => setTimeout(resolve, 500))
    }

    getList().then(async () => {
      const optionsList = computed(() => props.list)
      const pushOptions = async () => {
        stringOptions.value = []
        optionsList.value.forEach((item) => {
          stringOptions.value.push({
            label: item[props.optionsValue.label],
            value: item[props.optionsValue.value],
          })
        })

        if (props.default === undefined && !props.disableAutoSelect) {
          model.value = stringOptions.value[0]
        }
      }

      await pushOptions()
      watch(optionsList, () => {
        pushOptions()
        if (props.disableAutoSelect) {
          model.value = null
        }
      })

      // filter duplicate values, remove them if exist
      const filter = (item) => [item['value'], item]
      options.value = [...new Map(stringOptions.value.map(filter)).values()]
    })

    return {
      onReset,
      options,
      model,
      filterFn(val, update) {
        update(() => {
          const needle = val.toLowerCase()
          options.value = stringOptions.value.filter((v) => {
            if (v !== null) {
              return v.label.toLowerCase().indexOf(needle) > -1
            }
          })
        })
      },
      selectedHandler,
    }
  },
}
</script>
