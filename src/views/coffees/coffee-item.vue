<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import type { CoffeeRead } from '@/store/coffees/types'
import { useCountries } from '@/composables/useCountries.ts'
import dayjs from 'dayjs'
import {
  getProcessingOptionTitleByValue,
  getRoastLevelOptionTitleByValue,
} from '@/views/coffees/data.ts'

const countries = useCountries()

const props = defineProps({
  coffee: {
    type: Object as () => CoffeeRead,
    required: true,
  },
})

const emit = defineEmits(['delete'])

const formattedDate: ComputedRef<string | null> = computed(() =>
  props.coffee?.brew_date ? dayjs(props.coffee?.brew_date).format('DD.MM.YYYY') : null,
)

const chipCuppingScoreColor: ComputedRef<string> = computed(() =>
  props.coffee?.is_specialty ? 'amber-darken-3' : 'grey-darken-1',
)

const onDelete = () => {
  if (confirm(`Are you sure you want to delete "${props.coffee.name}"?`)) {
    emit('delete')
  }
}
</script>

<template>
  <v-card v-if="coffee" class="pa-4" outlined elevation="3">
    <div class="d-flex align-center justify-space-between">
      <v-chip
        v-if="coffee.cupping_score"
        :text="coffee.cupping_score"
        size="small"
        :color="chipCuppingScoreColor"
        class="mr-2 flex-shrink-0"
      />
      <v-card-title class="text-truncate" style="width: calc(100% - 62px)">
        {{ coffee.name }}
      </v-card-title>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-icon
            v-bind="props"
            icon="mdi-dots-vertical"
            size="small"
            variant="text"
            color="grey-darken-1"
            class="ml-auto flex-shrink-0"
          />
        </template>

        <v-list class="pa-0" density="compact">
          <v-list-item class="px-6 text-body-2 text-blue" :to="`/coffees/edit/${coffee.id}`">
            Edit
          </v-list-item>
          <v-divider />
          <v-list-item class="px-6 text-body-2 text-red" @click="onDelete">Delete</v-list-item>
        </v-list>
      </v-menu>
    </div>

    <v-divider class="my-4" />

    <!-- Attributes Section -->
    <v-card-text>
      <v-row dense>
        <v-col v-if="coffee.country" cols="12" sm="6">
          <strong>Origin: </strong>
          <span>{{ countries.getFlagAndName(coffee.country) }}</span>
        </v-col>
        <v-col cols="12" sm="6" v-if="coffee.variety">
          <strong>Variety:</strong> <span>{{ coffee.variety }}</span>
        </v-col>
        <v-col cols="12" sm="6" v-if="coffee.processing">
          <strong>Processing: </strong>
          <span>{{ getProcessingOptionTitleByValue(coffee.processing) }}</span>
        </v-col>
        <v-col cols="12" sm="6" v-if="coffee.roast_level">
          <strong>Roast level: </strong>
          <span>{{ getRoastLevelOptionTitleByValue(coffee.roast_level) }}</span>
        </v-col>
        <v-col cols="12" sm="6" v-if="formattedDate">
          <strong>Brew Date:</strong> <span>{{ formattedDate }}</span>
        </v-col>
      </v-row>

      <!-- Notes Section -->
      <template v-if="coffee.notes">
        <v-divider class="my-4" />
        <p class="mb-0 text-grey-darken-2">{{ coffee.notes }}</p>
      </template>
    </v-card-text>
  </v-card>
</template>
