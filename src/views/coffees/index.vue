<script setup lang="ts">
import useCoffeesStore from '@/store/coffees/coffees.ts'
import useCoffeeStore from '@/store/coffees/coffee.ts'
import { onMounted, ref, type Ref } from 'vue'
import CoffeeItem from './coffee-item.vue'
import type { CoffeeRead } from '@/store/coffees/types'
import coffeesEmptySVG from '@/assets/img/coffees-empty.svg'

const coffeesStore = useCoffeesStore()
const coffeeStore = useCoffeeStore()

const coffees: Ref<CoffeeRead[]> = ref([])
const emptyImageSize = 300

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
  <div class="d-flex flex-column ga-4 h-100">
    <template v-if="coffeesStore.isLoading.getCoffees">
      <v-skeleton-loader v-for="i in 3" :key="i" type="article" height="136px" />
    </template>
    <template v-else>
      <div
        v-if="!coffees.length"
        class="d-flex flex-column justify-center align-center fill-height"
      >
        <img
          :src="coffeesEmptySVG"
          alt=""
          class="mt-n4 mb-4"
          :width="emptyImageSize"
          :height="emptyImageSize"
        />
        <div class="text-h4 font-weight-bold">Still no coffees?</div>
        <div class="text-h6 grey--text">Add your first one now!</div>
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
      <template v-else>
        <coffee-item
          v-for="coffee in coffees"
          :key="coffee.id"
          :coffee="coffee"
          @delete="onDelete(coffee.id)"
        />
      </template>
    </template>
  </div>
</template>

<style scoped></style>
