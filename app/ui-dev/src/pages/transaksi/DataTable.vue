<template>
  <div>
    <div class="q-px-md q-pb-md">
      <q-list bordered class="rounded-borders" separator>
        <!-- Desktop View -->
        <q-item clickable v-for="(item, index) in data" :key="index">
          <q-item-section avatar
            ><p
              class="text-subtitle1 text-weight-bold text-center"
              style="font-size: 1.4rem; margin-bottom: 0 !important"
            >
              {{ item.tgl_transaksi_dayOnly }}
              <br /><small
                class="text-subtitle2 text-weight-regular"
                style="font-size: 0.8rem"
                >{{ item.tgl_transaksi_monthYear }}</small
              >
            </p>
          </q-item-section>
          <q-item-section>
            {{ item.deskripsi }}
            <q-item-label
              caption
              :class="['text-' + amountColor(item.jenis_transaksi)]"
              >{{ item.nominal }}</q-item-label
            >
            <q-item-label caption>
              <q-badge
                color="primary"
                :label="item.sumber_dana"
                class="q-mr-xs"
              />
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn
              class="custom-round mobile-hide"
              flat
              color="primary"
              icon="r_edit"
              @click="getDetail(item.id)"
            />
            <q-btn
              class="custom-round mobile-only"
              flat
              color="primary"
              icon="r_edit"
            >
              <q-menu>
                <q-list style="min-width: 150px">
                  <q-item clickable v-close-popup @click="getDetail(item.id)">
                    <q-item-section avatar
                      ><q-icon name="r_edit"
                    /></q-item-section>
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item
                    clickable
                    v-close-popup
                    @click="store.deleteTransaction(item.id)"
                    ><q-item-section avatar
                      ><q-icon name="r_delete_outline"
                    /></q-item-section>
                    <q-item-section>Hapus</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-item-section>
          <q-item-section side class="mobile-hide">
            <q-btn
              class="custom-round"
              flat
              color="primary"
              icon="r_delete_outline"
              @click="store.deleteTransaction(item.id)"
            />
          </q-item-section>
        </q-item>
        <!-- #END Desktop and Tablet View -->
      </q-list>
      <data-nav v-model="current" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePagingStore } from 'ss-paging-vue'
import { useTransactionStore } from 'stores/transaction-store'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const paging = usePagingStore()
const current = ref(1)
const router = useRouter()

const store = useTransactionStore()
store.getTransactions()

const getDetail = (id) => {
  store.getDetail(id, () => {
    if ($q.screen.lt.sm) {
      router.push('/transaksi/edit')
    } else {
      store.showForm = true
    }
  })
}

const amountColor = (transactionType) => {
  const colors = {
    income: 'green-7',
    expense: 'black',
    transfer: 'black',
  }

  return colors[transactionType]
}

const data = computed(() => paging.state.data)
</script>
