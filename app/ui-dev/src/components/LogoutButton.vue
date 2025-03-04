<template>
  <q-btn
    color="negative"
    class="custom-round"
    style="width: 100%"
    icon="r_logout"
    label="Logout"
    @click="logout"
  />
</template>

<script setup>
import { useQuasar } from 'quasar'
import { api, conf } from '../router/http'
import { useLoginStore } from 'src/stores/login-store'

const $q = useQuasar()
const store = useLoginStore()
const logout = () => {
  api
    .get('logout-user', {
      headers: {
        Authorization: `Bearer ${$q.cookies.get(conf.cookieName)}`,
      },
    })
    .then(({ data }) => {
      if (data.status === 'success') {
        // remove current logged in account first
        store.removeAccount()
        $q.cookies.remove(conf.cookieName, { path: '/' })
        $q.cookies.remove('sisauang_api_session')
        localStorage.removeItem('username')

        // then we check if there is any saved account
        const accounts = store.getSavedAccounts()
        if (accounts.length > 0) {
          store.setCookieOptions()
          localStorage.setItem('username', accounts[0].name)
          $q.cookies.set(
            conf.cookieName,
            accounts[0].token,
            store.cookieOptions,
          )
        }

        window.location.reload()
      }
    })
}
</script>
