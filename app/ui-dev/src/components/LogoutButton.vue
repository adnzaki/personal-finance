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

const $q = useQuasar()
const logout = () => {
  api
    .get('logout-user', {
      headers: {
        Authorization: `Bearer ${$q.cookies.get(conf.cookieName)}`,
      },
    })
    .then(({ data }) => {
      if (data.status === 'success') {
        $q.cookies.remove(conf.cookieName, { path: '/' })
        $q.cookies.remove('sisauang_api_session')
        localStorage.removeItem('username')
        window.location.reload()
      }
    })
}
</script>
