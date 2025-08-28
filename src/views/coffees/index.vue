<script setup lang="ts">
import useCoffeesStore from '@/store/coffees/coffees.ts'
import useCoffeeStore from '@/store/coffees/coffee.ts'
import { onMounted } from 'vue'
import CoffeeItem from './coffee-item.vue'
import coffeesEmptySVG from '@/assets/img/coffees-empty.svg'
import { useI18n } from 'vue-i18n'

const coffeesStore = useCoffeesStore()
const coffeeStore = useCoffeeStore()
const { t } = useI18n()

const emptyImageSize = 300

const onDelete = async (id: number) => {
  await coffeeStore.deleteCoffee(id)
  await coffeesStore.getCoffees()
}

onMounted(async () => {
  if (!coffeesStore.coffees) await coffeesStore.getCoffees()
})
</script>

<template>
  <teleport defer to="#app-bar-action--right">
    <v-btn prepend-icon="mdi-plus" to="/coffees/add"> {{ t('buttons.add') }}</v-btn>
  </teleport>
  <div class="d-flex flex-column ga-4 h-100">
    <template v-if="coffeesStore.isLoading.getCoffees">
      <v-skeleton-loader v-for="i in 3" :key="i" type="article" height="136px" />
    </template>
    <template v-else>
      <div
        v-if="!coffeesStore.coffees?.length"
        class="d-flex flex-column justify-center align-center fill-height"
      >
        <img
          :src="coffeesEmptySVG"
          alt=""
          class="mt-n4 mb-4"
          :width="emptyImageSize"
          :height="emptyImageSize"
        />
        <div class="text-h4 font-weight-bold">{{ t('coffees.empty_state.title') }}</div>
        <div class="text-subtitle-1 grey--text text-center">
          {{ t('coffees.empty_state.subtitle') }}
        </div>
        <v-btn
          prepend-icon="mdi-plus"
          to="/coffees/add"
          size="large"
          variant="elevated"
          elevation="0"
          class="mt-4"
        >
          {{ t('buttons.add') }}
        </v-btn>
      </div>
      <template v-else>
        <coffee-item
          v-for="coffee in coffeesStore.coffees"
          :key="coffee.id"
          :coffee="coffee"
          @delete="onDelete(coffee.id)"
        />
      </template>
    </template>
  </div>
</template>
