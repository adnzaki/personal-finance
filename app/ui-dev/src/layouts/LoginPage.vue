<template>
  <q-layout view="hHh lpR fFf" class="login-layout">
    <q-page-container>
      <div class="q-pa-md q-mt-lg row items-start q-gutter-md">
        <q-card
          :class="[
            'login-card col-md-4 col-sm-8 offset-md-4 offset-sm-2',
            cardMobileSize,
          ]"
        >
          <q-card-section>
            <div class="text-center q-mb-md">
              <q-img
                src="main-logo.png"
                alt="SisaUang Logo"
                style="max-width: 100px; max-height: 100px; margin: auto"
              />
            </div>
            <div class="text-h6 text-center">
              Login ke <strong>SisaUang</strong>
            </div>
            <div class="q-gutter-lg q-mt-lg">
              <q-input
                outlined
                v-model="username"
                label="Username"
                @keyup.enter="validate"
                class="rounded-field"
              />
              <q-input
                outlined
                v-model="password"
                label="Password"
                @keyup.enter="validate"
                class="rounded-field"
                :type="showPassword ? 'text' : 'password'"
                ><template v-slot:append>
                  <q-icon
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword"
                  /> </template
              ></q-input>
            </div>
            <!-- <q-checkbox
              color="primary"
              keep-color
              class="q-mb-lg q-mt-md"
              v-model="rememberMe"
              label="Ingatkan Saya"
            /> -->

            <p
              v-if="showMsg"
              :class="[`text-bold text-${msgClass}`, 'q-mt-md']"
            >
              {{ msg }}
            </p>

            <q-btn
              color="primary"
              size="lg"
              icon="r_login"
              label="Sign In"
              class="full-width q-mt-xl custom-round"
              @click="validate"
            />
            <p class="q-mt-xl">
              Belum punya akun? Daftar
              <strong
                ><a class="link-style" :href="conf.registerUrl()"
                  >di sini</a
                ></strong
              >
            </p>

            <!-- <q-btn
              color="blue"
              size="md"
              icon="r_person_add"
              label="Sign Up"
              class="full-width q-mt-md"
              to="/register"
            /> -->
          </q-card-section>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>

<style lang="sass" scoped>
.link-style
  text-decoration: none
  color: $primary
</style>

<script setup>
import { ref, computed } from 'vue'
import { conf, api, createFormData } from 'src/router/http'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const username = ref('')
const password = ref('')
const rememberMe = ref(true)
const showMsg = ref(false)
const msg = ref('')
const msgClass = ref('black')
const cardMobileSize = computed(() => ($q.screen.lt.sm ? 'col-12 q-ml-sm' : ''))

const showPassword = ref(false)

const validate = () => {
  msg.value = ''
  showMsg.value = true
  const hideMsg = () => (showMsg.value = false)

  if (username.value === '' || password.value === '') {
    msg.value = 'Username dan password wajib diisi'
    msgClass.value = 'negative'
    setTimeout(hideMsg, 6000)
  } else {
    const postData = {
      username: username.value,
      password: password.value,
    }

    msgClass.value = 'black'
    msg.value = 'Memroses autentikasi...'
    api
      .post('validate-login', postData, {
        transformRequest: [(data) => createFormData(data)],
      })
      .then(({ data }) => {
        if (data.status === 'failed') {
          msg.value = data.message
          msgClass.value = 'negative'
        } else {
          msg.value = 'Login berhasil. Mengalihkan ke halaman utama...'
          msgClass.value = 'positive'

          // if (rememberMe.value) {
          // }
          conf.cookieExp *= 12 * 360 // keep cookie valid for 360 days

          const dt = new Date(),
            now = dt.getTime(),
            expMs = now + conf.cookieExp,
            exp = new Date(expMs),
            cookieOptions = {
              expires: exp.toUTCString(),
              path: '/',
              sameSite: 'None',
              secure: true,
            }

          $q.cookies.set(conf.cookieName, data.token, cookieOptions)
          localStorage.setItem('username', data.user.username)

          // redirect to dashboard
          window.location.href = conf.homeUrl()
        }
      })
      .catch((err) => {
        msg.value = err
        msgClass.value = 'negative'
        setTimeout(hideMsg, 6000)
      })
  }
}
</script>
