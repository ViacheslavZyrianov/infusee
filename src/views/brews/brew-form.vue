<script setup lang="ts">
import { onMounted, reactive, ref, type Ref } from 'vue'
import type { Brew } from '@/store/brews/types.ts'
import useCoffeesStore from '@/store/coffees/coffees.ts'
import { useRatings } from '@/composables/useRatings.ts'
import useBrewMethods from '@/composables/useBrewMethods.ts'
import type { CoffeeRead } from '@/store/coffees/types'

const { ratingKeys, ratingLabel, ratingModel } = useRatings()
const coffeesStore = useCoffeesStore()
const { brewMethodsOptions } = useBrewMethods()

const form: Brew = reactive({
  coffee_id: null,
  brew_method: null,
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
  notes: null,
})

const coffees: Ref<Pick<CoffeeRead, 'id' | 'name'>[]> = ref([])

const getCoffees = async () => {
  coffees.value = await coffeesStore.getCoffees('id, name')
}

onMounted(async () => {
  await getCoffees()
})

defineExpose({
  form,
})
</script>

<template>
  <v-card>
    <v-autocomplete
      v-model="form.coffee_id"
      label="Coffee"
      placeholder="Select coffee"
      item-title="name"
      item-value="id"
      :items="coffeesStore.coffees"
    />
    <v-select
      v-model="form.brew_method"
      label="Brew method"
      placeholder="Choose brewing method"
      :items="brewMethodsOptions"
    >
      <template #subheader="{ props: { title, icon } }">
        <div class="d-flex align-center pa-4 opacity-50">
          <v-icon :icon="icon as string" size="18" class="mr-2" />
          <span class="text-body-2">{{ title }}</span>
        </div>
      </template>
    </v-select>

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
    <v-textarea v-model="form.notes" label="Notes" placeholder="Add some notes" />
  </v-card>
</template>

<style scoped></style>
