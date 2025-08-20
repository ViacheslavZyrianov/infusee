<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import TabBar from './tab-bar/tab-bar.vue'

const route = useRoute()

const title: ComputedRef<string> = computed(() => (route.name as string) || '')
</script>

<template>
  <v-app>
    <v-app-bar app class="d-flex justify-space-between px-2">
      <div class="position-absolute left-0 right-0 my-auto px-16 text-center text-truncate">
        {{ title }}
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
