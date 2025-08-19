<script setup lang="ts">
import type { WidgetData } from '@/views/dashboard/types'
import { onMounted, ref, type Ref } from 'vue'
import Widget from '@/views/dashboard/widget.vue'
import useBrewsStore from '@/store/brews/brews.ts'

const brewsStore = useBrewsStore()

const widgets: Ref<WidgetData[]> = ref([])

const emoji: Ref<string> = ref('')

const addWidgetBrewsTodayCount = async () => {
  const brewsTodayCount = await brewsStore.getBrewsTodayCount()
  widgets.value.push({
    title: brewsTodayCount,
    subtitle: `Brew${brewsTodayCount === 1 ? '' : 's'} today`,
    size: 'half',
    color: 'deep-orange-lighten-1',
    to: '/brews',
  })
}

const addWidtgetEmoji = () => {
  const generateEmoji = () => {
    const coffeeEmojis = [
      '☕', // Coffee / hot beverage
      '🫘', // Beans (coffee beans)
      '🫖', // Teapot (brewing vibes, also coffee pots)
      '🍵', // Cup without handle (small coffee cups, matcha, espresso)
      '🥤', // Cup with straw (iced coffee, cold brew, frappé)
      '🧋', // Bubble tea (iced coffee lookalike)
      '🥛', // Milk (latte, cappuccino, flat white base)
      '🍼', // Bottle (milk/cream for coffee)

      // Café sweets & pairings
      '🍩', // Donut (coffee + donuts classic)
      '🍪', // Cookie (coffee & cookie combo)
      '🥐', // Croissant (coffee & croissant breakfast)
      '🥯', // Bagel (common coffee shop food)
      '🥞', // Pancakes (brunch café vibes)
      '🧁', // Cupcake (coffee & cupcake pairing)
      '🍰', // Cake slice
      '🍫', // Chocolate bar (mocha / coffee + chocolate)
      '🍮', // Flan / custard (common café dessert)
      '🥧', // Pie (coffee & pie diner vibes)

      // Café / bar atmosphere
      '🍶', // Small sake set, can look like espresso cups
      '🍷', // Wine glass (some cafés also serve wine)
      '🍸', // Cocktail glass (espresso martini!)
      '🍹', // Tropical drink (iced coffee mocktails)
      '🥃', // Tumbler glass (Irish coffee / whiskey + coffee)
    ]

    emoji.value = coffeeEmojis[Math.floor(Math.random() * coffeeEmojis.length)]
  }

  if (!emoji.value) generateEmoji()

  widgets.value.push({
    title: emoji,
    size: 'half',
    color: 'deep-purple-lighten-1',
    onClick: generateEmoji,
  })
}

const addWidgets = async () => {
  await addWidgetBrewsTodayCount()
  addWidtgetEmoji()
}

onMounted(() => {
  addWidgets()
})
</script>

<template>
  <div class="d-flex flex-wrap ga-4">
    <widget
      v-for="(widget, index) in widgets"
      :key="index"
      :data="widget"
      @click="widget.onClick"
    />
  </div>
</template>

<style scoped></style>
