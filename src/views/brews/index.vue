<script setup lang="ts">
import useBrewsStore from '@/store/brews/brews.ts'
import useBrewStore from '@/store/brews/brew.ts'
import { onMounted, ref, type Ref } from 'vue'
import type { BrewRead } from '@/store/brews/types.ts'
import BrewItem from './brew-item.vue'

const brewsStore = useBrewsStore()
const brewStore = useBrewStore()

const brews: Ref<BrewRead[]> = ref([])

const onDelete = async (id: string) => {
  await brewStore.deleteBrew(id)
  await getBrews()
}

const getBrews = async () => {
  brews.value = await brewsStore.getBrews()
}

onMounted(async () => {
  await getBrews()
})
</script>

<template>
  <teleport defer to="#app-bar-action--right">
    <v-btn prepend-icon="mdi-plus" to="/brews/add">Add brew</v-btn>
  </teleport>
  <div class="d-flex flex-column ga-4">
    <v-skeleton-loader v-if="brewsStore.isLoading.getBrews" type="article" height="136px" />
    <template v-else>
      <brew-item v-for="brew in brews" :key="brew.id" :brew="brew" @delete="onDelete(brew.id)" />
    </template>
  </div>
</template>

<style scoped></style>
