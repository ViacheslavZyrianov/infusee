<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import FullPageLayout from '@/layouts/full-page.vue'
import DefaultLayout from '@/layouts/default.vue'
import { useUIStore } from '@/store/ui'

const route = useRoute()
const uiStore = useUIStore()

const layout: ComputedRef<unknown> = computed(() => {
  switch (route.meta.layout) {
    case 'full-page':
      return FullPageLayout
    default:
      return DefaultLayout
  }
})
</script>

<template>
  <v-theme-provider :theme="uiStore.getTheme" with-background>
    <component :is="layout">
      <router-view />
    </component>
  </v-theme-provider>
</template>
