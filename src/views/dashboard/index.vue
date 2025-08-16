<script setup lang="ts">
import type { WidgetData } from '@/views/dashboard/types'
import { onMounted, ref, type Ref } from 'vue'
import Widget from '@/views/dashboard/widget.vue'
import useBrewsStore from '@/store/brews/brews.ts'

const brewsStore = useBrewsStore()

const widgets: Ref<WidgetData[]> = ref([])

const getBrewsTodayCount = async () => {
  const brewsTodayCount = await brewsStore.getBrewsTodayCount()
  widgets.value.push({
    title: brewsTodayCount,
    subtitle: `Brew${brewsTodayCount === 1 ? '' : 's'} today`,
    size: 'half',
    color: 'deep-orange-lighten-1',
  })
}

onMounted(async () => {
  await getBrewsTodayCount()
})
</script>

<template>
  <div class="d-flex flex-wrap ga-4">
    <widget v-for="(widget, index) in widgets" :key="index" :data="widget" />
  </div>
</template>

<style scoped></style>
