<script setup lang="ts">
import { useRoute } from 'vue-router'
import useBrewStore from '@/store/brews/brew'
import useCoffeeStore from '@/store/coffees/coffee.ts'
import { onMounted, ref, type Ref } from 'vue'
import type { BrewRead } from '@/store/brews/types.ts'
import { useRatings } from '@/composables/useRatings.ts'
import type { CoffeeRead } from '@/store/coffees/types'

const route = useRoute()
const { ratingKeys, ratingLabel, ratingModel } = useRatings()

const brewStore = useBrewStore()
const coffeeStore = useCoffeeStore()

const brew: Ref<BrewRead | null> = ref(null)
const coffee: Ref<CoffeeRead | null> = ref(null)

const getBrew = async () => {
  brew.value = await brewStore.getBrew(route.params.id as string)
}

const getCoffee = async () => {
  if (!brew.value?.coffee_id) return

  coffee.value = await coffeeStore.getCoffee(brew.value.coffee_id)
}

onMounted(async () => {
  await getBrew()
  await getCoffee()
})
</script>

<template>
  <teleport defer to="#app-bar-action--left">
    <v-btn to="/brews" icon="mdi-arrow-left" variant="text" color="grey-darken-1" />
  </teleport>

  <teleport defer to="#app-bar-action--right">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-icon
          v-bind="props"
          icon="mdi-dots-vertical"
          size="small"
          variant="text"
          color="grey-darken-1"
          class="ml-auto"
        />
      </template>

      <v-list v-if="brew" class="pa-0" density="compact">
        <v-list-item class="px-6 text-body-2 text-blue" :to="`/brews/edit/${brew.id}`">
          Edit
        </v-list-item>
        <v-divider />
        <v-list-item class="px-6 text-body-2 text-red">Delete</v-list-item>
      </v-list>
    </v-menu>
  </teleport>

  <v-card v-if="brew" max-width="600">
    <v-card-title class="mb-4">{{ coffee?.name }}</v-card-title>

    <div class="d-flex flex-wrap ga-2">
      <v-chip v-if="brew.brew_method" :text="brew.brew_method" prepend-icon="mdi-flask-outline" />
      <v-chip v-if="brew.roaster" :text="brew.roaster" prepend-icon="mdi-fire" />
    </div>

    <v-divider class="my-3" />

    <v-card-text>
      <!-- Ratings Section -->
      <v-row dense>
        <v-col cols="6" md="4" v-for="ratingKey in ratingKeys" :key="ratingModel(ratingKey)">
          <div class="font-weight-bold">{{ ratingLabel(ratingKey) }}:</div>
          <v-rating
            :model-value="brew[ratingModel(ratingKey)]"
            length="5"
            density="compact"
            readonly
            size="18"
          />
        </v-col>
      </v-row>

      <v-divider class="my-3" />

      <!-- Other Details -->
      <v-row dense>
        <v-col cols="6" md="4" v-if="brew.grind"> <strong>Grind:</strong> {{ brew.grind }} </v-col>
        <v-col cols="6" md="4" v-if="brew.dose"> <strong>Dose:</strong> {{ brew.dose }}g </v-col>
        <v-col cols="6" md="4" v-if="brew.channeling">
          <strong>Channeling:</strong> {{ brew.channeling }}s
        </v-col>
        <v-col cols="6" md="4" v-if="brew.output">
          <strong>Output:</strong> {{ brew.output }}ml
        </v-col>
      </v-row>

      <v-divider class="my-3" />

      <!-- Notes -->
      <div v-if="brew.notes">
        <strong>Notes:</strong>
        <p>{{ brew.notes }}</p>
      </div>

      <!-- Created date -->
      <div class="grey--text text--darken-1 text-caption mt-2">
        Created at: {{ new Date(brew.created_at).toLocaleString() }}
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
