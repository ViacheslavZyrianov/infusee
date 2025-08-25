<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import useBrewStore from '@/store/brews/brew'
import { computed, type ComputedRef, onMounted, ref, type Ref } from 'vue'
import type { BrewRead } from '@/store/brews/types.ts'
import { useRatings } from '@/composables/useRatings.ts'
import useBrewMethods from '@/composables/useBrewMethods.ts'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { ratingKeys, ratingLabel, ratingModel } = useRatings()
const { getBrewMethodTitleByValue } = useBrewMethods()
const { t } = useI18n()

const brewStore = useBrewStore()

const brew: Ref<BrewRead | null> = ref(null)

const formattedDate: ComputedRef<string> = computed(() =>
  dayjs(brew.value?.created_at).format('DD.MM.YYYY HH:mm'),
)

const isLoading: ComputedRef<boolean> = computed(
  () => brew.value === null || brewStore.isLoading.getBrew,
)

const isDetails: ComputedRef<boolean> = computed(
  () =>
    Boolean(brew.value?.grind) ||
    Boolean(brew.value?.dose) ||
    Boolean(brew.value?.channeling) ||
    Boolean(brew.value?.output),
)

const getBrew = async () => {
  brew.value = await brewStore.getBrew(route.params.id as string)
}

const getBrewLabelI18N = (key: string) => t(`brew_form.${key}.label`)

const onDelete = async () => {
  if (!brew.value?.id) return

  if (confirm(`Are you sure you want to delete this brew?`)) {
    await brewStore.deleteBrew(brew.value.id)
    router.push('/brews')
  }
}

onMounted(async () => {
  await getBrew()
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
          {{ t('buttons.edit') }}
        </v-list-item>
        <v-divider />
        <v-list-item class="px-6 text-body-2 text-red" @click="onDelete">
          {{ t('buttons.delete') }}
        </v-list-item>
      </v-list>
    </v-menu>
  </teleport>

  <v-card v-if="isLoading">
    <v-card-title class="d-flex flex-column mb-4">
      <v-skeleton-loader type="text" width="60%" class="mb-2" />
      <v-skeleton-loader type="text" width="40%" />
    </v-card-title>

    <v-card-text>
      <v-skeleton-loader type="chip" class="mb-3" />

      <v-skeleton-loader type="paragraph" width="100%" />
    </v-card-text>
  </v-card>

  <v-card v-else-if="brew && !isLoading">
    <v-card-title class="d-flex flex-column gr-1 mb-4">
      <span>{{ brew.coffees.name }}</span>
      <span class="text-caption text-grey">{{ formattedDate }}</span>
    </v-card-title>

    <v-chip
      v-if="brew.brew_method"
      :text="getBrewMethodTitleByValue(brew.brew_method)"
      prepend-icon="mdi-flask-outline"
    />

    <v-divider class="my-3" />

    <v-card-text>
      <v-row dense>
        <v-col cols="6" v-for="ratingKey in ratingKeys" :key="ratingModel(ratingKey)">
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

      <template v-if="isDetails">
        <v-divider class="my-3" />

        <v-row dense>
          <v-col cols="6" v-if="brew.grind">
            <strong>{{ getBrewLabelI18N('grind') }}:</strong> {{ brew.grind }}
          </v-col>
          <v-col cols="6" v-if="brew.dose">
            <strong>{{ getBrewLabelI18N('dose') }}:</strong> {{ brew.dose }}g
          </v-col>
          <v-col cols="6" v-if="brew.channeling">
            <strong>{{ getBrewLabelI18N('channeling') }}:</strong> {{ brew.channeling }}s
          </v-col>
          <v-col cols="6" v-if="brew.output">
            <strong>{{ getBrewLabelI18N('output') }}:</strong> {{ brew.output }}ml
          </v-col>
        </v-row>
      </template>

      <div v-if="brew.notes">
        <v-divider class="my-3" />
        <strong>{{ getBrewLabelI18N('notes') }}:</strong>
        <p>{{ brew.notes }}</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
