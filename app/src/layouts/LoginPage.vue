<template>
  <q-layout view="hHh lpR fFf" class="login-layout">
    <q-page-container>
      <div class="q-pa-md q-mt-md row items-start q-gutter-md">
        <q-card class="login-card col-md-4 col-sm-8 offset-md-4 offset-sm-2">
          <q-card-section>
            <div class="text-h6 text-center">Login SisaUang</div>
            <div class="q-gutter-lg q-mt-lg">
              <q-input outlined v-model="username" label="Username" />
              <q-input outlined v-model="password" label="Password" />
            </div>
            <q-checkbox
              color="primary"
              keep-color
              class="q-mb-lg q-mt-md"
              v-model="rememberMe"
              label="Ingatkan Saya"
            />
            <q-btn
              color="primary"
              size="lg"
              icon="r_login"
              label="Sign In"
              class="full-width q-mt-lg"
            />

            <q-btn
              color="blue"
              size="md"
              icon="r_person_add"
              label="Sign Up"
              class="full-width q-mt-md"
              to="/register"
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
const password = ref('')
const rememberMe = ref(true)
</script>
