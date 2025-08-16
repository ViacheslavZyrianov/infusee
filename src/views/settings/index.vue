<script setup lang="ts">
import { useSettingsStore } from '@/store/settings'
import useCurrencies from '@/composables/useCurrencies.ts'

const settingsStore = useSettingsStore()
const currencies = useCurrencies()
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
    <v-list-item>
      <v-list-item-title>Currency</v-list-item-title>
      <template #append>
        <v-select
          v-model="settingsStore.currency"
          :items="currencies.currencyOptions"
          color="primary"
          hide-details
        />
      </template>
    </v-list-item>
  </v-list>
</template>

<style scoped></style>
