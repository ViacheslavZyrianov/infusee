<script setup lang="ts">
import useBrewsStore from '@/store/brews/brews.ts'
import useBrewStore from '@/store/brews/brew.ts'
import { onMounted } from 'vue'
import BrewItem from './brew-item.vue'

const brewsStore = useBrewsStore()
const brewStore = useBrewStore()

const onDelete = async (id: string) => {
  await brewStore.deleteBrew(id)
  await brewsStore.getBrews()
}

onMounted(async () => {
  await brewsStore.getBrews()
})
</script>

<template>
  <teleport to="#app-bar-action--right">
    <v-btn prepend-icon="mdi-plus" to="/brews/add">Add brew</v-btn>
  </teleport>
  <brew-item
    v-for="brew in brewsStore.brews"
    :key="brew.id"
    :brew="brew"
    @delete="onDelete(brew.id)"
  />
</template>

<style scoped></style>
