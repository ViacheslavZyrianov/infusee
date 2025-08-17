<script setup lang="ts">
import { computed, type ComputedRef, onMounted, reactive, ref, type Ref } from 'vue'
import type { Coffee } from '@/store/coffees/types'
import dayjs from 'dayjs'
import { processingOptions, roastLevelOptions } from '@/views/coffees/data.ts'
import { useCountries } from '@/composables/useCountries.ts'
import useCurrencies from '@/composables/useCurrencies.ts'
import { useSettingsStore } from '@/store/settings'
import useRoastersStore from '@/store/roasters/roasters.ts'
import type { RoasterRead } from '@/store/roasters/types'

const roasters: Ref<RoasterRead[]> = ref([])

const countries = useCountries()
const currencies = useCurrencies()
const settingsStore = useSettingsStore()
const roastersStore = useRoastersStore()

const form: Coffee = reactive({
  name: '',
  roaster_id: null,
  roast_level: null,
  cupping_score: null,
  is_specialty: false,
  is_public: false,
  country: null,
  processing: null,
  price: null,
  notes: '',
  roast_date: new Date().toISOString(),
})

const isDatepickerOpened: Ref<boolean> = ref(false)

type ValidationRule = (value: unknown) => true | string

const rules: Record<string, ValidationRule> = {
  required: (v) => (v !== null && v !== undefined && v !== '') || 'Required',
  score: (v) => (typeof v === 'number' ? (v >= 0 && v <= 100) || 'Score must be 0–100' : true),
}

const formattedDate: ComputedRef<string> = computed(() => {
  const brewDate = dayjs(form.roast_date)
  return brewDate.isSame(dayjs(), 'day') ? 'Today' : brewDate.format('DD.MM.YYYY')
})

const onSelectBrewDate = () => {
  isDatepickerOpened.value = false
}

const getRoasters = async () => {
  roasters.value = await roastersStore.getRoasters()
}

onMounted(async () => {
  await getRoasters()
})

defineExpose({
  form,
})
</script>

<template>
  <v-card class="pa-4">
    <v-text-field v-model="form.name" label="Coffee Name" :rules="[rules.required]" />

    <v-autocomplete
      v-model="form.roaster_id"
      label="Roaster"
      placeholder="Select roaster"
      :items="roasters"
      item-value="id"
    />

    <div class="d-flex align-center ga-4">
      <v-text-field
        v-model.number="form.cupping_score"
        label="Cupping Score"
        type="number"
        :rules="[rules.score]"
        clearable
      />

      <v-switch v-model="form.is_specialty" label="Specialty" class="flex-shrink-0" />
    </div>

    <v-select v-model="form.roast_level" :items="roastLevelOptions" label="Roast level" clearable />

    <v-autocomplete
      v-model="form.country"
      label="Country of origin"
      placeholder="Select country of origin"
      item-title="name"
      item-value="code"
      :items="countries.countries"
    >
      <template v-slot:item="{ props }">
        <v-list-item v-bind="props" :title="countries.getFlagAndName(props.value as string)" />
      </template>
      <template v-slot:selection="{ item }">{{ item.raw.flag }} {{ item.title }} </template>
    </v-autocomplete>

    <v-select v-model="form.processing" :items="processingOptions" label="Processing" clearable />

    <v-menu
      v-model="isDatepickerOpened"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="290"
    >
      <template #activator="{ props }">
        <v-text-field
          v-bind="props"
          v-model="formattedDate"
          label="Roast date"
          readonly
          variant="outlined"
          append-inner-icon="mdi-calendar-month-outline"
        />
      </template>

      <v-date-picker
        v-model="form.roast_date"
        no-title
        first-day-of-week="1"
        hide-header
        weekday-format="short"
        @update:model-value="onSelectBrewDate"
      />
    </v-menu>

    <v-text-field
      v-model="form.price"
      type="number"
      label="Price"
      placeholder="Enter coffee price"
      clearable
    >
      <template #append-inner>
        <div style="width: 24px" class="text-center">
          {{ currencies.getCurrencySymbol(settingsStore.currency) }}
        </div>
      </template>
    </v-text-field>

    <v-textarea v-model="form.notes" label="Notes" rows="4" />
  </v-card>
</template>
