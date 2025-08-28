<script setup lang="ts">
import { computed, type ComputedRef, onMounted, ref, type Ref } from 'vue'
import BarChart from '@/components/bar-chart/bar-chart.vue'
import type { BarChartItem } from '@/components/bar-chart/types.ts'
import { useI18n } from 'vue-i18n'
import useDashboardStore from '@/store/dashboard/dashboard.ts'

const dashboardStore = useDashboardStore()

const { tm } = useI18n()

const isLoading: Ref<boolean> = ref(false)

const barChartData: ComputedRef<BarChartItem[]> = computed(() =>
  tm('days_of_the_week').map((label: string, index: number) => ({
    label,
    value: dashboardStore.brewsWeeklyCount ? dashboardStore.brewsWeeklyCount[index] : 0,
  })),
)

onMounted(async () => {
  isLoading.value = true
  await dashboardStore.getBrewsWeeklyCount()
  isLoading.value = false
})

defineExpose({
  isLoading,
})
</script>

<template>
  <bar-chart v-if="!isLoading" :data="barChartData" />
</template>
