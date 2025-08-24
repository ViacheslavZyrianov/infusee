<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { VIcon } from 'vuetify/components'

const { tm } = useI18n()
</script>

<template>
  <v-card class="text-body-1 text-left" variant="tonal" rounded="xl">
    <div class="d-flex align-center justify-center mb-2">
      <v-icon icon="mdi-apple" size="48" />
    </div>

    <ol>
      <li v-for="step in tm('not_pwa.ios.steps')" :key="step" v-html="step" />
    </ol>
  </v-card>
</template>
