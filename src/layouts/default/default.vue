<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import TabBar from './tab-bar/tab-bar.vue'

const route = useRoute()
const { t } = useI18n()
</script>

<template>
  <v-app>
    <v-app-bar app class="d-flex justify-space-between px-2">
      <div
        v-if="route.name"
        class="position-absolute left-0 right-0 my-auto px-16 text-center text-truncate text-body-2"
      >
        {{ t(`${route.name as string}.title`) }}
      </div>
      <template v-slot:prepend>
        <div id="app-bar-action--left" />
      </template>
      <template v-slot:append>
        <div id="app-bar-action--right" />
      </template>
    </v-app-bar>
    <v-main class="fill-height">
      <slot />
    </v-main>
    <tab-bar />
  </v-app>
</template>
