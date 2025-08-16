<script setup lang="ts">
import useCoffeesStore from '@/store/coffees/coffees.ts'
import useCoffeeStore from '@/store/coffees/coffee.ts'
import { onMounted } from 'vue'
import CoffeeItem from './coffee-item.vue'

const coffeesStore = useCoffeesStore()
const coffeeStore = useCoffeeStore()

const onDelete = async (id: number) => {
  await coffeeStore.deleteCoffee(id)
  await coffeesStore.getCoffees()
}

onMounted(async () => {
  await coffeesStore.getCoffees()
})
</script>

<template>
  <teleport defer to="#app-bar-action--right">
    <v-btn prepend-icon="mdi-plus" to="/coffees/add">Add coffee</v-btn>
  </teleport>
  <div class="d-flex flex-column ga-4">
    <coffee-item
      v-for="coffee in coffeesStore.coffees"
      :key="coffee.id"
      :coffee="coffee"
      @delete="onDelete(coffee.id)"
    />
  </div>
</template>

<style scoped></style>
