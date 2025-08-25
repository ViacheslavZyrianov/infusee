<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import FullPageLayout from '@/layouts/full-page.vue'
import DefaultLayout from '@/layouts/default/default.vue'
import { useSettingsStore } from '@/store/settings'
import useAlertStore from '@/store/alert/alert.ts'

const route = useRoute()
const settingsStore = useSettingsStore()
const alertStore = useAlertStore()

const layout: ComputedRef<unknown> = computed(() => {
  switch (route.meta.layout) {
    case 'full-page':
      return FullPageLayout
    default:
      return DefaultLayout
  }
})

const layoutName: ComputedRef<string> = computed(() => (route.meta.layout as string) || 'default')
</script>

<template>
  <v-theme-provider :theme="settingsStore.getTheme" with-background>
    <component :is="layout" :class="`v-layout--${layoutName}`">
      <router-view />
    </component>

    <v-alert
      v-show="alertStore.isVisible"
      :type="alertStore.alertType"
      border="start"
      class="alert"
      :icon="false"
      closable
      @click:close="alertStore.hide"
    >
      {{ alertStore.message }}
    </v-alert>
  </v-theme-provider>
</template>

<style scoped lang="scss">
.alert {
  position: fixed;
  bottom: 86px;
  left: 20px;
  right: 20px;
  z-index: 1;
}
</style>
