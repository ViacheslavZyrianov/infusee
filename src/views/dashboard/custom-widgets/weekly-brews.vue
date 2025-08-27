<script setup lang="ts">
import useBrewsStore from '@/store/brews/brews.ts'
import { computed, type ComputedRef, onMounted, ref, type Ref } from 'vue'
import BarChart from '@/components/bar-chart/bar-chart.vue'
import type { BarChartItem } from '@/components/bar-chart/types.ts'
import { useI18n } from 'vue-i18n'

const brewsStore = useBrewsStore()
const { tm } = useI18n()

const brewsWeeklyCount: Ref<number[]> = ref([])
const isLoading: Ref<boolean> = ref(false)

const barChartData: ComputedRef<BarChartItem[]> = computed(() =>
  tm('days_of_the_week').map((label: string, index: number) => ({
    label,
    value: brewsWeeklyCount.value[index],
  })),
)

onMounted(async () => {
  isLoading.value = true
  brewsWeeklyCount.value = await brewsStore.getBrewsWeeklyCount()
  isLoading.value = false
})

defineExpose({
  isLoading,
})
</script>

<template>
  <bar-chart :data="barChartData" />
</template>
