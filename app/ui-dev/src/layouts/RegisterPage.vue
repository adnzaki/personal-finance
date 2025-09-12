<template>
  <q-layout view="hHh lpR fFf" class="login-layout">
    <q-page-container>
      <div class="q-pa-md q-mt-md row items-start q-gutter-md">
        <q-card class="login-card col-md-4 col-sm-8 offset-md-4 offset-sm-2">
          <q-card-section>
            <div class="text-h6 text-center">
              Let's <strong>Get Started!</strong>
            </div>
            <div class="q-gutter-lg q-mt-lg">
              <q-input
                class="rounded-field"
                outlined
                v-model="username"
                label="Username"
                placeholder="Hanya boleh terdiri dari huruf, angka dan titik (tanpa spasi)"
                :rules="[(val) => !!val || 'Username wajib diisi']"
              />
              <q-input
                class="rounded-field"
                outlined
                v-model="email"
                label="Email"
                placeholder="(Contoh: myaccount@example.com)"
                :rules="[
                  (val) => !!val || 'Email wajib diisi',
                  (val) => isValidEmail(val) || 'Email tidak valid',
                ]"
              />
              <q-input
                class="rounded-field"
                outlined
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                :rules="[(val) => !!val || 'Password wajib diisi']"
                ><template v-slot:append>
                  <q-icon
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword"
                  /> </template
              ></q-input>
              <q-input
                outlined
                class="rounded-field"
                v-model="confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                label="Konfirmasi Password"
                :rules="[
                  (val) =>
                    !!val || 'Silakan konfirmasi password baru terlebih dahulu',
                  (val) => val === password || 'Password tidak sama',
                ]"
                ><template v-slot:append>
                  <q-icon
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword"
                  /> </template
              ></q-input>
            </div>
            <q-btn
              color="blue"
              size="lg"
              icon="r_person_add"
              label="Sign Up"
              class="full-width q-mt-lg custom-round"
              :disable="disableButton"
              @click="signup"
            />
            <q-btn
              color="primary"
              flat
              icon="r_arrow_back"
              label="Kembali ke Halaman Login"
              class="full-width q-mt-md custom-round"
              @click="backToLogin"
            />
          </q-card-section>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { conf, api, createFormData, timeout } from 'src/router/http'
import { useQuasar } from 'quasar'
import { useRouter, onBeforeRouteLeave } from 'vue-router'

const router = useRouter()
const $q = useQuasar()
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const registrationSuccess = ref(false)
const disableButton = computed(() => {
  return username.value === '' ||
    email.value === '' ||
    !isValidEmail(email.value) ||
    password.value === '' ||
    confirmPassword.value === '' ||
    password.value !== confirmPassword.value ||
    registrationSuccess.value
    ? true
    : false
})

onBeforeRouteLeave(() => {
  // localStorage.removeItem('canRegister')
})

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

const backToLogin = () => {
  localStorage.removeItem('canRegister')
  router.push('/login')
}

const signup = () => {
  const notify = $q.notify({
    group: false,
    spinner: true,
    message: 'Mendaftarkan akun...',
    color: 'info',
    position: 'top',
    timeout: 0,
  })

  const data = {
    username: username.value,
    email: email.value,
    password: password.value,
    password_confirm: confirmPassword.value,
  }

  api
    .post('signup', data, {
      transformRequest: [(data) => createFormData(data)],
    })
    .then(({ data }) => {
      notify({ timeout })
      if (data.code === 500) {
        notify({
          color: 'negative',
          message: `Gagal mendaftarkan akun: ${data.msgString}`,
          spinner: false,
          timeout: 0,
          actions: [
            {
              icon: 'close',
              color: 'white',
              round: true,
              handler: () => {
                /* ... */
              },
            },
          ],
        })
      } else {
        const successTimeout = 2500
        notify({
          color: 'positive',
          icon: 'done',
          spinner: false,
          message: 'Sukses! Akun berhasil didaftarkan',
          timeout: successTimeout,
        })

        registrationSuccess.value = true

        setTimeout(() => {
          notify({
            color: 'positive',
            spinner: true,
            message: 'Mengembalikan ke halaman login...',
            timeout: 0,
          })

          localStorage.removeItem('canRegister')

          setTimeout(() => {
            notify({ timeout: 1 })
            window.location.href = conf.loginUrl()
          }, successTimeout)
        }, successTimeout)
      }
    })
}
</script>
