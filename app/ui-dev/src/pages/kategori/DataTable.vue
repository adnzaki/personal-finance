<template>
  <div>
    <div class="q-px-md q-pb-md">
      <q-list bordered class="rounded-borders" separator>
        <q-item
          clickable
          v-for="(item, index) in data"
          :key="index"
          :disable="disable(item.is_default)"
        >
          <q-item-section avatar @click="getDetail(item.id)"
            ><q-icon :name="icon(item.category_type)"
          /></q-item-section>
          <q-item-section @click="getDetail(item.id)">
            {{ item.category_name }}
            <q-item-label caption>{{ item.category_type }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn
              class="custom-round"
              flat
              color="primary"
              icon="r_delete_outline"
              @click="store.deleteCategory(item.id)"
              :disable="disable(item.is_default)"
            />
          </q-item-section>
        </q-item>
      </q-list>
      <data-nav v-model="current" v-if="$q.screen.gt.sm" />
      <data-nav-mobile v-model="current" v-else />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePagingStore } from 'ss-paging-vue'
import { useCategoryStore } from 'src/stores/category-store'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const paging = usePagingStore()
const current = ref(1)
const router = useRouter()

const $q = useQuasar()
const store = useCategoryStore()
store.getCategories()

const getDetail = (id) => {
  store.getDetail(id, () => {
    if ($q.screen.lt.sm) {
      router.push('/kategori/edit')
    } else {
      store.showEditForm = true
    }
  })
}

const icon = (item) => {
  return item === 'Income' ? 'o_monetization_on' : 'o_payment'
}

const disable = (item) => {
  return item === 1 ? true : false
}

const data = computed(() => paging.state.data)
</script>
