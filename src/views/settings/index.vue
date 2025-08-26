<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import { useSettingsStore } from '@/store/settings'
import useCurrencies from '@/composables/useCurrencies.ts'
import i18n from '@/plugins/i18n'
import type { SelectItem } from '@/types/types.ts'
import { useI18n } from 'vue-i18n'

const settingsStore = useSettingsStore()
const currencies = useCurrencies()
const { t } = useI18n()

const localesForSelect: ComputedRef<SelectItem[]> = computed(() =>
  Object.entries(i18n.global.messages.value[i18n.global.locale.value].locales).map(
    ([value, title]) => ({ title, value }),
  ),
)
</script>

<template>
  <v-list rounded>
    <v-list-item>
      <v-list-item-title>{{ t('settings.theme.title') }}</v-list-item-title>
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
          >
            <template #prepend> {{ t('settings.theme.light') }} </template>
            <template #append> {{ t('settings.theme.dark') }} </template>
          </v-switch>
        </div>
      </template>
    </v-list-item>
    <v-list-item>
      <v-list-item-title>{{ t('settings.currency.title') }}</v-list-item-title>
      <template #append>
        <v-select
          v-model="settingsStore.currency"
          :items="currencies.currencyOptions.value"
          color="primary"
          hide-details
          density="compact"
        />
      </template>
    </v-list-item>
    <v-list-item>
      <v-list-item-title>{{ t('settings.locales.title') }}</v-list-item-title>
      <template #append>
        <v-select
          :model-value="settingsStore.locale"
          :items="localesForSelect"
          density="compact"
          hide-details
          @update:model-value="settingsStore.setLocale"
        />
      </template>
    </v-list-item>
  </v-list>
</template>
