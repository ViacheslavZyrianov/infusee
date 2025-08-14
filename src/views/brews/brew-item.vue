<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import type { Brew } from '@/store/brews/types.ts'
import { useCountries } from '@/composables/useCountries.ts'

const props = defineProps({
  brew: {
    type: Object as () => Brew,
    required: true,
  },
})

const emit = defineEmits(['delete'])

const countries = useCountries()

const averageRating: ComputedRef<number> = computed(() => {
  const ratingFields = [
    'rating_aroma',
    'rating_flavor',
    'rating_acidity',
    'rating_bitterness',
    'rating_sweetness',
    'rating_body',
    'rating_aftertaste',
  ] as const

  const ratings = ratingFields
    .map((field) => props.brew[field])
    .filter((v) => typeof v === 'number' && v > 0)

  if (ratings.length === 0) return 0

  return Number((ratings.reduce((sum, val) => sum + val, 0) / ratings.length).toFixed(1))
})

const onDelete = () => {
  if (confirm(`Are you sure you want to delete "${props.brew.name}"?`)) {
    emit('delete')
  }
}
</script>

<template>
  <v-card class="pa-3" max-width="350" outlined>
    <div class="d-flex align-center mb-2">
      <v-card-title class="flex-grow-1 text-truncate" style="width: calc(100% - 20px)">
        {{ brew.name }}
      </v-card-title>

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

        <v-list class="pa-0" density="compact">
          <v-list-item class="px-6 text-body-2" :to="`/brews/${brew.id}`">View</v-list-item>
          <v-divider />
          <v-list-item class="px-6 text-body-2" :to="`/brews/edit/${brew.id}`">Edit</v-list-item>
          <v-divider />
          <v-list-item class="px-6 text-body-2" @click="onDelete">Delete</v-list-item>
        </v-list>
      </v-menu>
    </div>

    <v-card-subtitle>
      {{ countries.getFlagAndName(brew.country) }} · {{ brew.brew_method.toUpperCase() }} ·
      {{ brew.roaster }}
    </v-card-subtitle>

    <v-divider class="my-2" />

    <v-card-text class="d-flex justify-space-between align-center">
      <span class="text-caption text-grey-darken-1">
        {{ new Date(brew.created_at).toLocaleDateString() }}
      </span>
      <div class="d-flex align-center">
        <span class="mr-1">{{ averageRating }}</span>
        <v-rating
          :model-value="averageRating"
          :length="5"
          :size="24"
          readonly
          half-increments
          active-color="primary"
        />
      </div>
    </v-card-text>
  </v-card>
</template>
