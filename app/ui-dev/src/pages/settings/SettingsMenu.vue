<template>
  <div>
    <q-list bordered class="q-mt-md" separator>
      <q-item clickable v-ripple to="/kategori">
        <q-item-section avatar>
          <q-icon name="r_category" />
        </q-item-section>

        <q-item-section>Kategori</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/pengaturan/reset-password">
        <q-item-section avatar>
          <q-icon name="r_key" />
        </q-item-section>

        <q-item-section>Ubah Password</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup></script>
