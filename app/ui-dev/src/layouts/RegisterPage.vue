<template>
  <q-layout view="hHh lpR fFf" class="login-layout">
    <q-page-container>
      <div class="q-pa-md q-mt-md row items-start q-gutter-md">
        <q-card class="login-card col-md-4 col-sm-8 offset-md-4 offset-sm-2">
          <q-card-section>
            <div class="text-h6 text-center">
              Registrasi <strong>SisaUang</strong>
            </div>
            <div class="q-gutter-lg q-mt-lg">
              <q-input outlined v-model="username" label="Username" />
              <q-input outlined v-model="email" label="Email" />
              <q-input outlined v-model="password" label="Password" />
              <q-input
                outlined
                v-model="confirmPassword"
                label="Konfirmasi Password"
              />
            </div>
            <q-btn
              color="blue"
              size="lg"
              icon="r_person_add"
              label="Sign Up"
              class="full-width q-mt-lg"
            />
          </q-card-section>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const rememberMe = ref(true)
</script>
