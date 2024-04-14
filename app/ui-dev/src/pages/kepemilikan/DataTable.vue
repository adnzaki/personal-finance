<template>
  <div>
    <div class="q-px-md q-pb-md">
      <q-list bordered class="rounded-borders">
        <!-- Desktop View -->
        <q-item clickable class="mobile-hide">
          <q-item-section avatar><q-icon name="r_person" /></q-item-section>
          <q-item-section>
            Pribadi
            <q-item-label caption>Rp. 4.100.000</q-item-label>
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
          icon="r_person"
          label="Pribadi"
          class="mobile-only"
          caption="Rp. 4.100.000"
        >
          <q-card>
            <q-card-actions align="right">
              <q-btn-group class="custom-round">
                <q-btn color="primary" icon="r_edit" />
                <q-btn color="primary" icon="r_delete_outline" />
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
import { ref } from 'vue'
import { usePagingStore } from 'ss-paging-vue'

const paging = usePagingStore()
const current = ref(1)
</script>
