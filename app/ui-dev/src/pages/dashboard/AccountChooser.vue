<template>
  <div class="row q-col-gutter-sm">
    <div class="col-12">
      <div :class="[wrapperPadding, 'q-mb-md']">
        <q-card :class="['content-card', cardStyle]">
          <q-card-section class="q-mb-lg">
            <div
              class="text-subtitle1 text-uppercase q-mb-sm"
              v-if="$q.screen.lt.sm"
            >
              {{ title }}
            </div>
            <div class="text-h6 text-capitalize" v-else>{{ title }}</div>
          </q-card-section>
          <div class="q-px-md q-pb-md" v-if="accounts.length > 0">
            <q-list bordered class="rounded-borders" separator>
              <q-item clickable v-for="(item, index) in accounts" :key="index">
                <q-item-section
                  avatar
                  @click="switchAccount(item.name, item.token)"
                  ><q-icon color="primary" name="r_account_circle"
                /></q-item-section>
                <q-item-section @click="switchAccount(item.name, item.token)">
                  <q-item-label class="text-bold">{{ item.name }}</q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <div class="row">
                    <q-btn
                      class="custom-round"
                      flat
                      color="primary"
                      icon="r_login"
                      size="lg"
                      v-if="$route.path !== '/pengaturan'"
                      @click="switchAccount(item.name, item.token)"
                    />
                    <q-btn
                      class="custom-round"
                      flat
                      color="primary"
                      icon="r_delete_outline"
                      size="lg"
                      @click="removeAccount(item.name)"
                      v-else
                    />
                  </div>
                </q-item-section> </q-item
            ></q-list>
          </div>
          <div class="q-px-md q-pb-md text-center" v-else>
            <p>Belum ada akun lain yang tersimpan.</p>
          </div>
          <div class="q-px-md">
            <q-btn
              flat
              label="Tambahkan Akun"
              class="save-btn q-mb-md see-more"
              color="primary"
              @click="addAccount"
            />
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { dashboardWrapperPadding } from 'src/composables/screen'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { conf, api } from 'src/router/http'
import { useLoginStore } from 'src/stores/login-store'

const $q = useQuasar()
const router = useRouter()
const store = useLoginStore()
const title = ref('Akun Lainnya')
const accounts = ref([])

const props = defineProps({
  cardStyle: {
    default: '',
    type: String,
  },
})

const wrapperPadding = computed(() => {
  return props.cardStyle === 'custom-round' ? dashboardWrapperPadding() : ''
})

const setAccounts = () => {
  accounts.value = store.getSavedAccounts()
  accounts.value = accounts.value.filter(
    (account) => account.name !== localStorage.getItem('username'),
  )
}

onMounted(() => {
  setAccounts()
})

const addAccount = () => {
  $q.cookies.remove('sisauang_api_session')
  api.get('delete-default-cookie').then(() => {
    localStorage.setItem('addAccount', 1)
    router.push('/login')
  })
}

const removeAccount = (name) => {
  $q.dialog({
    title: 'Hapus Akun',
    message: 'Anda yakin ingin menghapus akun ini dari perangkat anda?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    store.removeAccount(name)
    setAccounts()
  })
}

const switchAccount = (name, token) => {
  $q.cookies.remove('sisauang_api_session')
  store.setCookieOptions()
  localStorage.setItem('username', name)
  $q.cookies.set(conf.cookieName, token, store.cookieOptions)

  window.location.reload()
}
</script>
