<template>
  <!-- <q-card class="custom-round greetings-card q-pa-sm q-mb-md text-white">
    <p class="text-h6 q-pt-sm">{{ greetUser() }}</p>
  </q-card> -->
  <p class="text-h6">{{ greetUser() }}</p>
</template>

<style lang="sass" scoped>
.greetings-card
  background-color: $primary
</style>

<script setup>
const greetUser = () => {
  const userName = localStorage.getItem('username')
  const currentHour = new Date().getHours()
  let greeting

  // if (currentHour >= 4 && currentHour < 10) {
  //   greeting = '⛅ Selamat Pagi'
  // } else if (currentHour >= 10 && currentHour < 14) {
  //   greeting = '☀️ Selamat Siang'
  // } else if (currentHour >= 14 && currentHour < 17) {
  //   greeting = '⛱️ Selamat Sore'
  // } else if (currentHour >= 17 && currentHour < 18) {
  //   greeting = '🌇 Selamat Menikmati Senja'
  // } else {
  //   greeting = '🌛 Selamat Malam'
  // }
  if (currentHour >= 4 && currentHour < 10) {
    greeting = 'Selamat Pagi'
  } else if (currentHour >= 10 && currentHour < 14) {
    greeting = 'Selamat Siang'
  } else if (currentHour >= 14 && currentHour < 17) {
    greeting = 'Selamat Sore'
  } else if (currentHour >= 17 && currentHour < 18) {
    greeting = 'Selamat Menikmati Senja'
  } else {
    greeting = 'Selamat Malam'
  }

  return `${greeting}, ${userName}!`
}
</script>
