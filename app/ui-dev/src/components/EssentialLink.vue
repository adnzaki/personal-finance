<template>
  <q-item
    clickable
    v-ripple
    :to="props.link"
    active-class="bg-red-2"
    class="su-menu-item"
  >
    <q-item-section v-if="props.icon" avatar>
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
defineOptions({
  name: 'EssentialLink',
})

const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    default: '#',
  },

  icon: {
    type: String,
    default: '',
  },
})
</script>
