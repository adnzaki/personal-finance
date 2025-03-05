<template>
  <div>
    <div class="q-px-md q-pb-md">
      <q-list bordered class="rounded-borders" separator>
        <!-- Desktop View -->
        <q-item
          clickable
          class="mobile-hide"
          v-for="(item, index) in data"
          :key="index"
          :disable="disable(item.is_default)"
        >
          <q-item-section avatar
            ><q-icon :name="icon(item.category_type)"
          /></q-item-section>
          <q-item-section>
            {{ item.category_name }}
            <q-item-label caption>{{ item.category_type }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn
              class="custom-round"
              flat
              color="primary"
              icon="r_edit"
              @click="getDetail(item.id)"
              :disable="disable(item.is_default)"
            />
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
        <!-- #END Desktop and Tablet View -->

        <!-- Mobile and Tablet View -->
        <q-expansion-item
          expand-separator
          :icon="icon(item.category_type)"
          :label="item.category_name"
          class="mobile-only"
          :caption="item.category_type"
          v-for="(item, index) in data"
          :key="index"
          header-class="bottom-border"
          group="kategori"
          :disable="disable(item.is_default)"
        >
          <q-card>
            <q-card-actions align="right">
              <q-btn flat color="primary" @click="getDetail(item.id, true)"
                >Edit</q-btn
              >
              <q-btn flat color="primary" @click="store.deleteCategory(item.id)"
                >Hapus</q-btn
              >
            </q-card-actions>
          </q-card>
        </q-expansion-item>
        <!-- #END Mobile and Tablet View -->
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

const paging = usePagingStore()
const current = ref(1)
const router = useRouter()

const store = useCategoryStore()
store.getCategories()

const getDetail = (id, mobile = false) => {
  store.getDetail(id, () => {
    if (mobile) {
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
