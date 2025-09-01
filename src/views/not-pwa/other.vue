<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
</script>

<template>
  <v-card class="text-body-1 text-left" variant="tonal" rounded="xl">
    <div class="d-flex align-center justify-center mb-2">
      <v-icon icon="mdi-information-outline" size="48" />
    </div>
    <p v-html="t('not_pwa.other.p_1')" />
    <p class="mt-2">
      {{ t('not_pwa.other.list.title') }}
    </p>
    <ul>
      <li v-for="step in tm('not_pwa.other.list.items')" :key="step" v-html="step" />
    </ul>
  </v-card>
</template>
