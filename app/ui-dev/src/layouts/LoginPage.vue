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
                v-model="store.username"
                label="Username"
                @keyup.enter="store.validate()"
                class="rounded-field"
              />
              <q-input
                outlined
                v-model="store.password"
                label="Password"
                @keyup.enter="store.validate()"
                class="rounded-field"
                :type="store.showPassword ? 'text' : 'password'"
                ><template v-slot:append>
                  <q-icon
                    :name="store.showPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="store.showPassword = !store.showPassword"
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
              v-if="store.showMsg"
              :class="[`text-bold text-${store.msgClass}`, 'q-mt-md']"
            >
              {{ store.msg }}
            </p>

            <q-btn
              color="primary"
              size="lg"
              icon="r_login"
              label="Sign In"
              class="full-width q-mt-xl custom-round"
              @click="store.validate()"
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
import { computed } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { conf } from 'src/router/http'
import { useQuasar } from 'quasar'
import { useLoginStore } from 'src/stores/login-store'

const $q = useQuasar()
const store = useLoginStore()

onBeforeRouteLeave((to) => {
  if (to.path !== '/register') {
    localStorage.removeItem('addAccount')
  }
})

localStorage.setItem('force_reload', 1)

const cardMobileSize = computed(() => ($q.screen.lt.sm ? 'col-12 q-ml-sm' : ''))
</script>
