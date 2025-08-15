<script setup lang="ts">
import type { BrewRead } from '@/store/brews/types.ts'
import { useCountries } from '@/composables/useCountries.ts'
import { useRatings } from '@/composables/useRatings.ts'

const props = defineProps({
  brew: {
    type: Object as () => BrewRead,
    required: true,
  },
})

const emit = defineEmits(['delete'])

const countries = useCountries()
const { ratingAverage } = useRatings()

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
      <template v-if="brew.country"> {{ countries.getFlagAndName(brew.country) }} · </template>
      <template v-if="brew.brew_method"> {{ brew.brew_method.toUpperCase() }} · </template>
      {{ brew.roaster }}
    </v-card-subtitle>

    <v-divider class="my-2" />

    <v-card-text class="d-flex justify-space-between align-center">
      <span class="text-caption text-grey-darken-1">
        {{ new Date(brew.created_at).toLocaleDateString() }}
      </span>
      <div class="d-flex align-center">
        <span class="mr-1">{{ ratingAverage(brew) }}</span>
        <v-rating
          :model-value="ratingAverage(brew)"
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
