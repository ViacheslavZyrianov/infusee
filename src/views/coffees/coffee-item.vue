<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import type { CoffeeRead } from '@/store/coffees/types'
import useCountries from '@/composables/useCountries/index.ts'
import dayjs from 'dayjs'
import {
  getProcessingOptionTitleByValue,
  getRoastLevelOptionTitleByValue,
} from '@/views/coffees/data.ts'
import { useI18n } from 'vue-i18n'

const countries = useCountries()
const { t } = useI18n()

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

const isRoasterDetails: ComputedRef<boolean> = computed(
  () =>
    Boolean(props.coffee.roasters?.title) ||
    Boolean(props.coffee?.roast_level) ||
    Boolean(formattedDate.value),
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
          <v-icon v-if="!coffee.is_public" icon="mdi-incognito" size="18" class="mr-2" />
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
            {{ t('buttons.edit') }}
          </v-list-item>
          <v-divider />
          <v-list-item class="px-6 text-body-2 text-red" @click="onDelete">
            {{ t('buttons.delete') }}
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <template v-if="coffee.country || coffee.processing">
      <v-divider class="mt-2" />

      <div class="d-flex align-center mt-2">
        <div class="d-flex gc-2" v-if="coffee.country || coffee.processing">
          <v-chip v-if="coffee.country" size="small">
            {{ countries.getFlagAndName(coffee.country) }}
          </v-chip>
          <v-chip v-if="coffee.processing" prepend-icon="mdi-flask-outline" size="small">
            {{ getProcessingOptionTitleByValue(coffee.processing) }}
          </v-chip>
        </div>
      </div>

      <v-divider class="my-2" />
    </template>

    <div v-if="isRoasterDetails" class="d-flex align-center flex-wrap ga-2">
      <v-icon icon="mdi-fire" size="18" />
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
      <v-divider class="mt-2" />
      <p class="mb-0 mt-2 text-grey-darken-2 text-body-2">{{ coffee.notes }}</p>
    </template>
  </v-card>
</template>
