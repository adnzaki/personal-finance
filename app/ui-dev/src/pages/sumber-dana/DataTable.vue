<template>
  <div>
    <div class="q-px-md q-pb-md">
      <q-list bordered class="rounded-borders" separator>
        <q-item clickable v-for="(item, index) in data" :key="index">
          <q-item-section avatar @click="getDetail(item.id)"
            ><q-icon name="r_dns"
          /></q-item-section>
          <q-item-section @click="getDetail(item.id)">
            {{ item.nama }}
            <q-item-label caption>{{ item.total_dana }}</q-item-label>
            <q-item-label caption
              >Kepemilikan:
              <q-badge
                color="primary"
                :label="row.kepemilikan"
                class="q-mr-xs"
                v-for="(row, index) in item.pemilik"
                :key="index"
              />
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn
              class="custom-round"
              flat
              color="primary"
              icon="r_delete_outline"
              @click="store.deleteFund(item.id)"
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
import { useFundStore } from 'stores/fund-store'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const paging = usePagingStore()
const current = ref(1)
const router = useRouter()

const store = useFundStore()
store.getFund()

const getDetail = (id) => {
  store.getDetail(id, () => {
    if ($q.screen.lt.sm) {
      router.push('/sumber-dana/edit')
    } else {
      store.showEditForm = true
    }
  })
}

const data = computed(() => paging.state.data)
</script>
