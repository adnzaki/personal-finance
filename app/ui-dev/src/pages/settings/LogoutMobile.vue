<template>
  <!-- <q-card class="content-card q-mt-lg">
    <q-card-section>
      <div class="text-subtitle1 text-uppercase q-mb-sm" v-if="$q.screen.lt.sm">
        {{ cardTitle }}
      </div>
      <div class="text-h6 text-capitalize" v-else>
        {{ cardTitle }}
      </div>
    </q-card-section>
    <q-card-section>
      <div :class="['row', titleSpacing()]">
        <logout-btn class="mobile-only" />
      </div>
    </q-card-section>
  </q-card> -->
  <q-page-container>
    <div class="q-px-md row items-start logout-mobile">
      <logout-btn />
    </div>
    <app-version />
  </q-page-container>
</template>

<style lang="sass" scoped>
@media (max-width: $breakpoint-xs-max)
  .logout-mobile
    .q-btn
      padding-top: 12px !important
      padding-bottom: 12px !important
      border-radius: 1.5rem !important
</style>

<script setup></script>
