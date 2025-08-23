<script setup lang="ts">
import useBrewsStore from '@/store/brews/brews.ts'
import useBrewStore from '@/store/brews/brew.ts'
import useCoffeesStore from '@/store/coffees/coffees.ts'
import { computed, type ComputedRef, onMounted, ref, type Ref } from 'vue'
import type { BrewRead } from '@/store/brews/types.ts'
import BrewItem from './brew-item.vue'
import brewsEmptySVG from '@/assets/img/brews-empty.svg'
import coffeesEmptySVG from '@/assets/img/coffees-empty.svg'
import { useI18n } from 'vue-i18n'

const brewsStore = useBrewsStore()
const brewStore = useBrewStore()
const coffeesStore = useCoffeesStore()
const { t } = useI18n()

const brews: Ref<BrewRead[]> = ref([])
const emptyImageSize = 300
const coffeesTotalCount: Ref<number> = ref(0)
const isLoading: Ref<boolean> = ref(false)

const isCoffeesEmpty: ComputedRef<boolean> = computed(
  () => !coffeesStore.isLoading.getCoffees && coffeesTotalCount.value === 0,
)

const onDelete = async (id: string) => {
  await brewStore.deleteBrew(id)
  await getBrews()
}

const getBrews = async () => {
  brews.value = await brewsStore.getBrews()
}

const getCoffeesTotalCount = async () => {
  coffeesTotalCount.value = await coffeesStore.getCoffeesTotalCount()
}

onMounted(async () => {
  isLoading.value = true

  await getCoffeesTotalCount()

  if (!isCoffeesEmpty.value) await getBrews()

  isLoading.value = false
})
</script>

<template>
  <teleport defer to="#app-bar-action--right">
    <v-btn v-if="!isCoffeesEmpty" prepend-icon="mdi-plus" to="/brews/add">
      {{ t('brews.actions.add') }}
    </v-btn>
  </teleport>
  <template v-if="isLoading">
    <v-skeleton-loader v-for="i in 3" :key="i" type="article" height="136px" class="mb-4" />
  </template>
  <div v-else class="d-flex flex-column ga-4 h-100">
    <template v-if="!isCoffeesEmpty">
      <div
        v-if="!brews.length"
        class="d-flex flex-column justify-center align-center fill-height text-center"
      >
        <img
          :src="brewsEmptySVG"
          alt=""
          class="mt-n4 mb-4"
          :width="emptyImageSize"
          :height="emptyImageSize"
        />
        <div class="text-h4 font-weight-bold">{{ t('brews.empty_state.title') }}</div>
        <div class="text-subtitle-1 grey--text text-center whitespace-pre-line">
          {{ t('brews.empty_state.subtitle') }}
        </div>
        <v-btn
          prepend-icon="mdi-plus"
          to="/brews/add"
          size="large"
          variant="elevated"
          elevation="0"
          class="mt-4"
        >
          {{ t('brews.actions.add') }}
        </v-btn>
      </div>
      <brew-item v-for="brew in brews" :key="brew.id" :brew="brew" @delete="onDelete(brew.id)" />
    </template>
    <div v-else class="d-flex flex-column justify-center align-center fill-height">
      <img
        :src="coffeesEmptySVG"
        alt=""
        class="mt-n4 mb-4"
        :width="emptyImageSize"
        :height="emptyImageSize"
      />
      <div class="text-h4 font-weight-bold">No coffees added 😔</div>
      <div class="text-subtitle-1 grey--text text-center">
        Please add at least one,<br />to create your magnificent brews.
      </div>
      <v-btn
        prepend-icon="mdi-plus"
        to="/coffees/add"
        size="large"
        variant="elevated"
        elevation="0"
        class="mt-4"
      >
        Add coffee
      </v-btn>
    </div>
  </div>
</template>
