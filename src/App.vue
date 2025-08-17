<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import FullPageLayout from '@/layouts/full-page.vue'
import DefaultLayout from '@/layouts/default/default.vue'
import { useSettingsStore } from '@/store/settings'
import { useAlertStore } from '@/store/alert/alert.ts'

const route = useRoute()
const settingsStore = useSettingsStore()
const alert = useAlertStore()

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
  <v-theme-provider :theme="settingsStore.getTheme" with-background>
    <component :is="layout">
      <router-view />
    </component>

    <v-alert
      v-if="alert.visible"
      :type="alert.type"
      border="start"
      colored-border
      elevation="2"
      class="global-alert"
      dismissible
      @click:close="alert.hide"
    >
      {{ alert.message }}
    </v-alert>
  </v-theme-provider>
</template>
