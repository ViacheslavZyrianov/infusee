<script setup lang="ts">
import { computed, type ComputedRef, reactive, ref, type Ref } from 'vue'
import type { Coffee } from '@/store/coffees/types'
import dayjs from 'dayjs'
import { processingOptions, roastLevelOptions } from '@/views/coffees/data.ts'
import { useCountries } from '@/composables/useCountries.ts'

const countries = useCountries()

const form: Coffee = reactive({
  name: '',
  cupping_score: null,
  is_specialty: false,
  is_public: false,
  country: null,
  variety: '',
  processing: null,
  roast_level: '',
  notes: '',
  brew_date: null,
})

const isDatepickerOpened: Ref<boolean> = ref(false)

type ValidationRule = (value: unknown) => true | string

const rules: Record<string, ValidationRule> = {
  required: (v) => (v !== null && v !== undefined && v !== '') || 'Required',
  score: (v) => (typeof v === 'number' ? (v >= 0 && v <= 100) || 'Score must be 0–100' : true),
}

const formattedDate: ComputedRef<string> = computed(() =>
  form.brew_date ? dayjs(form.brew_date).format('DD.MM.YYYY') : 'Select brew date',
)

const datepickerBrewDateAppendedInnerIcon: ComputedRef<string | undefined> = computed(() =>
  form.brew_date ? 'mdi-close-circle' : 'mdi-calendar-month-outline',
)

const onSelectBrewDate = () => {
  isDatepickerOpened.value = false
}

const onClearBrewDate = (event: MouseEvent) => {
  event.stopPropagation()
  form.brew_date = null
}

defineExpose({
  form,
})
</script>

<template>
  <v-card class="pa-4">
    <v-text-field v-model="form.name" label="Coffee Name" :rules="[rules.required]" />

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

    <v-text-field v-model="form.variety" label="Variety" />

    <v-select v-model="form.processing" :items="processingOptions" label="Processing" clearable />

    <div class="mb-6">
      <div class="text-caption opacity-70">Roast level</div>
      <v-btn-toggle
        v-model="form.roast_level"
        color="primary"
        variant="outlined"
        group
        divided
        rounded="xl"
        class="d-flex"
      >
        <v-btn
          v-for="roastLevelOption in roastLevelOptions"
          :key="roastLevelOption.value"
          :value="roastLevelOption.value"
          class="flex-grow-1"
        >
          {{ roastLevelOption.title }}
        </v-btn>
      </v-btn-toggle>
    </div>

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
          label="Brew Date"
          placeholder="kekw"
          readonly
          variant="outlined"
          :append-inner-icon="datepickerBrewDateAppendedInnerIcon"
          @click:appendInner="onClearBrewDate"
        />
      </template>

      <v-date-picker
        v-model="form.brew_date"
        no-title
        first-day-of-week="1"
        hide-header
        weekday-format="short"
        @update:model-value="onSelectBrewDate"
      />
    </v-menu>

    <v-textarea v-model="form.notes" label="Notes" rows="4" />
  </v-card>
</template>
