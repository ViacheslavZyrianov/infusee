<script setup lang="ts">
import useCoffeesStore from '@/store/coffees/coffees.ts'
import useCoffeeStore from '@/store/coffees/coffee.ts'
import { onMounted, ref, type Ref } from 'vue'
import CoffeeItem from './coffee-item.vue'
import type { CoffeeRead } from '@/store/coffees/types'

const coffeesStore = useCoffeesStore()
const coffeeStore = useCoffeeStore()

const coffees: Ref<CoffeeRead[]> = ref([])

const getCoffees = async () => {
  coffees.value = await coffeesStore.getCoffees()
}

const onDelete = async (id: number) => {
  await coffeeStore.deleteCoffee(id)
  await getCoffees()
}

onMounted(async () => {
  await getCoffees()
})
</script>

<template>
  <teleport defer to="#app-bar-action--right">
    <v-btn prepend-icon="mdi-plus" to="/coffees/add">Add coffee</v-btn>
  </teleport>
  <div class="d-flex flex-column ga-4">
    <template v-if="coffeesStore.isLoading.getCoffees">
      <v-skeleton-loader v-for="i in 3" :key="i" type="article" height="136px" />
    </template>
    <template v-else>
      <coffee-item
        v-for="coffee in coffees"
        :key="coffee.id"
        :coffee="coffee"
        @delete="onDelete(coffee.id)"
      />
    </template>
  </div>
</template>

<style scoped></style>
