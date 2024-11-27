<template>
  <q-card-section class="scroll card-section">
    <q-form class="q-gutter-xs">
      <q-input
        filled
        v-model="store.data.oldPassword"
        class="rounded-field q-mb-md"
        label="Password Saat Ini"
        :type="showPassword ? 'text' : 'password'"
        lazy-rules
        :rules="[(val) => !!val || 'Password saat ini harus diisi']"
        ><template v-slot:append>
          <q-icon
            :name="showPassword ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="showPassword = !showPassword"
          /> </template
      ></q-input>
      <q-input
        filled
        v-model="store.data.newPassword"
        class="rounded-field q-mb-md"
        label="Password Baru"
        lazy-rules
        :type="showNewPassword ? 'text' : 'password'"
        :rules="[(val) => !!val || 'Password baru harus diisi']"
        ><template v-slot:append>
          <q-icon
            :name="showNewPassword ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="showNewPassword = !showNewPassword"
          /> </template
      ></q-input>
      <q-input
        filled
        v-model="store.data.confirmNewPassword"
        class="rounded-field"
        label="Konfirmasi Password Baru"
        lazy-rules
        :type="showConfirmPassword ? 'text' : 'password'"
        :rules="[
          (val) => !!val || 'Silakan konfirmasi password baru terlebih dahulu',
          (val) => val === store.data.newPassword || 'Password tidak sama',
        ]"
        ><template v-slot:append>
          <q-icon
            :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="showConfirmPassword = !showConfirmPassword"
          /> </template
      ></q-input>
    </q-form>
  </q-card-section>

  <q-card-actions align="center">
    <q-btn
      color="primary"
      class="btn-w95 save-btn q-mb-md mobile-only"
      :label="btnLabel"
    />
  </q-card-actions>
  <q-card-actions align="left" class="q-ml-sm">
    <q-btn
      color="primary"
      class="save-btn q-mb-md mobile-hide"
      :label="btnLabel"
      @click="store.updatePassword()"
    />
  </q-card-actions>
</template>

<script setup>
import { useSettingStore } from 'src/stores/setting-store'
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { rules } from 'eslint-config-prettier'

const store = useSettingStore()
const $q = useQuasar()
const showPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const btnLabel = ref('Ganti Password')
</script>
