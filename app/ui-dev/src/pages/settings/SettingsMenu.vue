<template>
  <div>
    <q-list style="margin-top: -16px" bordered separator>
      <q-item class="q-py-md" clickable v-ripple to="/kategori">
        <q-item-section avatar>
          <q-icon name="r_category" />
        </q-item-section>

        <q-item-section>Kategori</q-item-section>
      </q-item>
      <q-item class="q-py-md" clickable v-ripple to="/kepemilikan">
        <q-item-section avatar>
          <q-icon name="r_groups" />
        </q-item-section>

        <q-item-section>Kepemilikan</q-item-section>
      </q-item>

      <q-item
        class="q-py-md"
        clickable
        v-ripple
        to="/pengaturan/reset-password"
      >
        <q-item-section avatar>
          <q-icon name="r_key" />
        </q-item-section>

        <q-item-section>Ubah Password</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup></script>
