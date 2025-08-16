<script setup lang="ts">
import type { BrewRead } from '@/store/brews/types.ts'
import { useRatings } from '@/composables/useRatings.ts'
import useBrewMethods from '@/composables/useBrewMethods.ts'
import useCoffeeStore from '@/store/coffees/coffee.ts'
import { computed, type ComputedRef, onMounted, ref, type Ref } from 'vue'
import type { CoffeeRead } from '@/store/coffees/types'
import dayjs from 'dayjs'

const { ratingAverage } = useRatings()
const { getBrewMethodTitleByValue } = useBrewMethods()

const props = defineProps({
  brew: {
    type: Object as () => BrewRead,
    required: true,
  },
})

const emit = defineEmits(['delete'])

const coffeeStore = useCoffeeStore()

const coffee: Ref<CoffeeRead | null> = ref(null)

const formattedDate: ComputedRef<string> = computed(() =>
  dayjs(props.brew.created_at).format('DD.MM.YYYY HH:mm'),
)

const onDelete = () => {
  if (confirm(`Are you sure you want to delete this brew?`)) {
    emit('delete')
  }
}

const getCoffee = async () => {
  if (!props.brew?.coffee_id) return

  coffee.value = await coffeeStore.getCoffee(props.brew.coffee_id)
}

onMounted(async () => {
  await getCoffee()
})
</script>

<template>
  <v-card class="pa-3" outlined>
    <div class="d-flex align-center mb-2">
      <v-card-title class="flex-grow-1 text-truncate" style="width: calc(100% - 20px)">
        {{ coffee?.name }}
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
          <v-list-item class="px-6 text-body-2 text-blue" :to="`/brews/edit/${brew.id}`">
            Edit
          </v-list-item>
          <v-divider />
          <v-list-item class="px-6 text-body-2 text-red" @click="onDelete">Delete</v-list-item>
        </v-list>
      </v-menu>
    </div>

    <div class="d-flex flex-wrap ga-2">
      <v-chip
        v-if="brew.brew_method"
        :text="getBrewMethodTitleByValue(brew.brew_method)"
        prepend-icon="mdi-flask-outline"
      />
      <v-chip v-if="brew.roaster" :text="brew.roaster" prepend-icon="mdi-fire" />
    </div>

    <v-divider class="my-2" />

    <v-card-text class="d-flex justify-space-between align-center">
      <span class="text-caption text-grey-darken-1">
        {{ formattedDate }}
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
