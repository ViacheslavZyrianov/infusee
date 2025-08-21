<script setup lang="ts">
import useBrewsStore from '@/store/brews/brews.ts'
import useBrewStore from '@/store/brews/brew.ts'
import useCoffeesStore from '@/store/coffees/coffees.ts'
import { computed, type ComputedRef, onMounted, ref, type Ref } from 'vue'
import type { BrewRead } from '@/store/brews/types.ts'
import BrewItem from './brew-item.vue'
import brewsEmptySVG from '@/assets/img/brews-empty.svg'
import coffeesEmptySVG from '@/assets/img/coffees-empty.svg'

const brewsStore = useBrewsStore()
const brewStore = useBrewStore()
const coffeesStore = useCoffeesStore()

const brews: Ref<BrewRead[]> = ref([])
const emptyImageSize = 300
const coffeesTotalCount: Ref<number> = ref(0)

const isCoffeesEmpty: ComputedRef<boolean> = computed(() => coffeesTotalCount.value === 0)

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
  await getCoffeesTotalCount()

  if (!isCoffeesEmpty.value) await getBrews()
})
</script>

<template>
  <teleport defer to="#app-bar-action--right">
    <v-btn v-if="!isCoffeesEmpty" prepend-icon="mdi-plus" to="/brews/add">Add brew</v-btn>
  </teleport>
  <div class="d-flex flex-column ga-4 h-100">
    <template v-if="!isCoffeesEmpty">
      <template v-if="brewsStore.isLoading.getBrews">
        <v-skeleton-loader v-for="i in 3" :key="i" type="article" height="136px" />
      </template>
      <template v-else>
        <div
          v-if="!brews.length"
          class="d-flex flex-column justify-center align-center fill-height"
        >
          <img
            :src="brewsEmptySVG"
            alt=""
            class="mt-n4 mb-4"
            :width="emptyImageSize"
            :height="emptyImageSize"
          />
          <div class="text-h4 font-weight-bold">Still no brews?</div>
          <div class="text-subtitle-1 grey--text text-center">Add your first one right now!</div>
          <v-btn
            prepend-icon="mdi-plus"
            to="/brews/add"
            size="large"
            variant="elevated"
            elevation="0"
            class="mt-4"
          >
            Add brew
          </v-btn>
        </div>
        <brew-item v-for="brew in brews" :key="brew.id" :brew="brew" @delete="onDelete(brew.id)" />
      </template>
    </template>
    <div v-if="isCoffeesEmpty" class="d-flex flex-column justify-center align-center fill-height">
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
