<script setup lang="ts">
import type { PropType } from 'vue'
import type { RoasterRead } from '@/store/roasters/types'
import useCountries from '@/composables/useCountries/index.ts'

defineProps({
  data: {
    type: Object as PropType<RoasterRead>,
    required: true,
  },
})

const countries = useCountries()
</script>

<template>
  <v-card>
    <v-card-title class="mb-2">
      {{ data.title }}
    </v-card-title>

    <div class="d-flex flex-wrap ga-2 mb-2">
      <v-chip v-for="country in data.countries" :key="country">
        {{ countries.getFlagAndName(country) }}
      </v-chip>
    </div>

    <a :href="data.url" target="_blank" class="d-flex align-center text-decoration-none">
      <v-icon class="mr-2" size="small">mdi-open-in-new</v-icon> {{ data.url }}
    </a>

    <v-card-text v-if="data.notes">
      {{ data.notes }}
    </v-card-text>
  </v-card>
</template>
