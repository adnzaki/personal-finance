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
        >
          <q-item-section avatar><q-icon name="r_dns" /></q-item-section>
          <q-item-section>
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
            <q-btn class="custom-round" flat color="primary" icon="r_edit" />
          </q-item-section>
          <q-item-section side>
            <q-btn
              class="custom-round"
              flat
              color="primary"
              icon="r_delete_outline"
            />
          </q-item-section>
        </q-item>
        <!-- #END Desktop and Tablet View -->

        <!-- Mobile and Tablet View -->
        <q-expansion-item
          expand-separator
          icon="r_dns"
          :label="item.nama"
          class="mobile-only"
          v-for="(item, index) in data"
          :key="index"
          :caption="item.total_dana"
          header-class="bottom-border"
          group="sumber-dana"
        >
          <q-card>
            <q-card-actions align="right">
              <q-btn flat color="primary">Edit</q-btn>
              <q-btn flat color="primary">Hapus</q-btn>
            </q-card-actions>
          </q-card>
        </q-expansion-item>
        <!-- #END Mobile and Tablet View -->
      </q-list>
      <data-nav v-model="current" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePagingStore } from 'ss-paging-vue'
import { useFundStore } from 'stores/fund-store'
import { useRouter } from 'vue-router'

const paging = usePagingStore()
const current = ref(1)
const router = useRouter()

const store = useFundStore()
store.getFund()

const getDetail = (id, mobile = false) => {
  store.getDetail(id, () => {
    if (mobile) {
      router.push('/sumber-dana/edit')
    } else {
      store.showEditForm = true
    }
  })
}

const data = computed(() => paging.state.data)
</script>
