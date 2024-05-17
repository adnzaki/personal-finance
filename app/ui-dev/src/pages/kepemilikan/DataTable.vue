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
          <q-item-section avatar><q-icon name="r_person" /></q-item-section>
          <q-item-section>
            {{ item.kepemilikan }}
            <q-item-label caption>{{ item.total_dana }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn
              class="custom-round"
              flat
              color="primary"
              icon="r_edit"
              @click="getDetail(item.id)"
            />
          </q-item-section>
          <q-item-section side>
            <q-btn
              class="custom-round"
              flat
              color="primary"
              icon="r_delete_outline"
              @click="store.deleteOwnership(item.id)"
            />
          </q-item-section>
        </q-item>
        <!-- #END Desktop and Tablet View -->

        <!-- Mobile and Tablet View -->
        <q-expansion-item
          expand-separator
          icon="r_person"
          :label="item.kepemilikan"
          class="mobile-only"
          :caption="item.total_dana"
          v-for="(item, index) in data"
          :key="index"
        >
          <q-card>
            <q-card-actions align="right">
              <q-btn-group class="custom-round">
                <q-btn
                  color="primary"
                  icon="r_edit"
                  @click="getDetail(item.id, true)"
                />
                <q-btn
                  color="primary"
                  icon="r_delete_outline"
                  @click="store.deleteOwnership(item.id)"
                />
              </q-btn-group>
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
import { useOwnershipStore } from 'stores/ownership-store'
import { useRouter } from 'vue-router'

const paging = usePagingStore()
const current = ref(1)
const router = useRouter()

const store = useOwnershipStore()
store.getOwnership()

const getDetail = (id, mobile = false) => {
  store.getDetail(id, () => {
    if (mobile) {
      router.push('/kepemilikan/edit')
    } else {
      store.showEditForm = true
    }
  })
}

const data = computed(() => paging.state.data)
</script>
