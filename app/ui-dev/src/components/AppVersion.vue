<template>
  <div class="row q-mt-md">
    <div class="col-12">
      <p class="text-center version">
        {{ appVersion }}
      </p>
      <p class="text-center version mobile-only">
        Made with ❤️ by <strong>Adnan Zaki</strong>
      </p>
    </div>
  </div>
</template>

<script setup>
import { appVersion } from 'boot/app'
</script>
