<script setup lang="ts">
import { useSettingsStore } from '@/store/settings'

const settingsStore = useSettingsStore()
</script>

<template>
  <v-list>
    <v-list-item>
      <v-list-item-title>Theme</v-list-item-title>
      <template #append>
        <div class="d-flex align-center">
          <v-switch
            v-model="settingsStore.isThemeDark"
            color="primary"
            hide-details
            density="compact"
            inset
            true-icon="mdi-brightness-2"
            false-icon="mdi-brightness-5"
          />
        </div>
      </template>
    </v-list-item>
  </v-list>
</template>

<style scoped></style>
