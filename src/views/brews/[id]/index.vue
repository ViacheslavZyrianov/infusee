<script setup lang="ts">
import { useRoute } from 'vue-router'
import useBrewStore from '@/store/brews/brew'
import { onMounted, ref, type Ref } from 'vue'
import type { BrewRead } from '@/store/brews/types.ts'

const route = useRoute()

const brewStore = useBrewStore()

const brew: Ref<BrewRead | null> = ref(null)

const ratingFields = {
  Aroma: 'rating_aroma',
  Flavor: 'rating_flavor',
  Acidity: 'rating_acidity',
  Bitterness: 'rating_bitterness',
  Body: 'rating_body',
  Aftertaste: 'rating_aftertaste',
  Sweetness: 'rating_sweetness',
} as const

type RatingKey = (typeof ratingFields)[keyof typeof ratingFields]

onMounted(async () => {
  brew.value = await brewStore.getBrew(route.params.id as string)
})
</script>

<template>
  <teleport defer to="#app-bar-action--left">
    <v-btn to="/brews" icon="mdi-arrow-left" variant="text" color="grey-darken-4" />
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
        <v-list-item class="px-6 text-body-2" :to="`/brews/edit/${brew.id}`">Edit</v-list-item>
        <v-divider />
        <v-list-item class="px-6 text-body-2">Delete</v-list-item>
      </v-list>
    </v-menu>
  </teleport>

  <v-card v-if="brew" class="mx-auto my-4" max-width="600">
    <v-card-title class="text-h6">{{ brew.name }}</v-card-title>

    <v-card-subtitle class="grey--text text--darken-1">
      {{ brew.brew_method }} - {{ brew.roaster }} - {{ brew.country }}
    </v-card-subtitle>

    <v-divider class="my-3" />

    <v-card-text>
      <!-- Ratings Section -->
      <v-row dense>
        <v-col cols="6" md="4" v-for="(key, label) in ratingFields" :key="key">
          <div class="font-weight-bold">{{ label }}:</div>
          <v-rating
            :model-value="brew[key as RatingKey]"
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
        <v-col cols="6" md="4" v-if="brew.price"> <strong>Price:</strong> {{ brew.price }} </v-col>
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
