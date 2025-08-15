<script setup lang="ts">
import { reactive } from 'vue'
import brewMethods from './brewMethods.ts'
import type { Brew } from '@/store/brews/types.ts'
import { useCountries } from '@/composables/useCountries.ts'
import { useRatings } from '@/composables/useRatings.ts'

const countries = useCountries()
const { ratingKeys, ratingLabel, ratingModel } = useRatings()

const form: Brew = reactive({
  name: '',
  brew_method: null,
  country: null,
  roaster: null,
  rating_aroma: 0,
  rating_flavor: 0,
  rating_acidity: 0,
  rating_bitterness: 0,
  rating_sweetness: 0,
  rating_body: 0,
  rating_aftertaste: 0,
  grind: null,
  dose: null,
  channeling: null,
  output: null,
  price: null,
  notes: null,
})

defineExpose({
  form,
})
</script>

<template>
  <v-card>
    <v-text-field v-model="form.name" label="Name" placeholder="Enter coffee name" required />
    <v-select
      v-model="form.brew_method"
      label="Brew method"
      placeholder="Choose brewing method"
      :items="brewMethods"
    />
    <v-autocomplete
      v-model="form.country"
      label="Country of origin"
      placeholder="Choose country of origin"
      item-title="name"
      item-value="code"
      eager
      :items="countries.countries"
    >
      <template v-slot:item="{ props }">
        <v-list-item v-bind="props" :title="countries.getFlagAndName(props.value as string)" />
      </template>
      <template v-slot:selection="{ item }">{{ item.raw.flag }} {{ item.title }} </template>
    </v-autocomplete>
    <v-text-field v-model="form.roaster" label="Roaster" placeholder="Enter roaster name" />
    <div class="mb-4">
      <v-label class="mb-2">Rating</v-label>
      <div class="d-flex flex-column">
        <div
          v-for="ratingKey in ratingKeys"
          :key="ratingModel(ratingKey)"
          class="d-flex align-center"
        >
          <div class="text-body-2 mr-auto">{{ ratingLabel(ratingKey) }}</div>
          <v-rating
            v-model="form[ratingModel(ratingKey)]"
            :length="5"
            :size="24"
            clearable
            active-color="primary"
          />
        </div>
      </div>
    </div>
    <div class="d-flex gc-4">
      <v-text-field v-model="form.grind" label="Grind" placeholder="Enter grinding" type="number" />
      <v-text-field
        v-model="form.dose"
        label="Dose"
        placeholder="Enter dose (g)"
        suffix="g"
        type="number"
      />
    </div>
    <div class="d-flex gc-4">
      <v-text-field
        v-model="form.channeling"
        label="Channeling"
        placeholder="Enter channeling duration (s)"
        suffix="s"
        type="number"
      />
      <v-text-field
        v-model="form.output"
        label="Output"
        placeholder="Enter output (ml)"
        suffix="ml"
        type="number"
      />
    </div>
    <v-text-field v-model="form.price" label="Price" placeholder="Enter price" type="number" />
    <v-textarea v-model="form.notes" label="Notes" placeholder="Add some notes" />
  </v-card>
</template>

<style scoped></style>
