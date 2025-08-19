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
  props.coffee?.roast_date ? dayjs(props.coffee?.roast_date).format('DD.MM.YYYY') : null,
)

const chipCuppingScoreColor: ComputedRef<string> = computed(() =>
  Number(props.coffee?.cupping_score) >= 80 ? 'amber-darken-3' : 'grey-darken-1',
)

const onDelete = () => {
  if (confirm(`Are you sure you want to delete "${props.coffee.name}"?`)) {
    emit('delete')
  }
}
</script>

<template>
  <v-card v-if="coffee" class="pa-4" outlined elevation="3">
    <div class="d-flex align-start justify-space-between">
      <v-card-title class="d-flex flex-column gr-1 text-truncate" style="width: calc(100% - 62px)">
        <div class="d-flex align-center">
          <v-chip
            v-if="coffee.cupping_score"
            :text="coffee.cupping_score"
            size="small"
            :color="chipCuppingScoreColor"
            class="mr-2 flex-shrink-0"
          />
          <span>{{ coffee?.name }}</span>
        </div>
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

    <v-card-text
      v-if="coffee.country || coffee.processing"
      class="d-flex flex-wrap justify-between ga-2 mt-4"
    >
      <v-chip v-if="coffee.country">
        {{ countries.getFlagAndName(coffee.country) }}
      </v-chip>
      <v-chip v-if="coffee.processing" prepend-icon="mdi-flask-outline">
        {{ getProcessingOptionTitleByValue(coffee.processing) }}
      </v-chip>
    </v-card-text>

    <v-divider class="my-4" />

    <div class="text-body-2 text-grey-darken-2 mb-2"><v-icon icon="mdi-fire" /> Roast details</div>
    <div class="d-flex flex-wrap ga-2">
      <v-chip v-if="coffee.roasters?.title" size="small">
        {{ coffee.roasters.title }}
      </v-chip>
      <v-chip v-if="coffee.roast_level" size="small">
        {{ getRoastLevelOptionTitleByValue(coffee.roast_level) }}
      </v-chip>
      <v-chip v-if="formattedDate" size="small">
        {{ formattedDate }}
      </v-chip>
    </div>

    <template v-if="coffee.notes">
      <v-divider class="mt-4" />
      <p class="mb-0 mt-4 text-grey-darken-2 text-body-2">{{ coffee.notes }}</p>
    </template>
  </v-card>
</template>
