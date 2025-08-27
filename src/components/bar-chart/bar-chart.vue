<script setup lang="ts">
import { computed, type ComputedRef, type PropType, ref, type Ref } from 'vue'
import type { BarChartItem } from '@/components/bar-chart/types.ts'

const props = defineProps({
  data: {
    type: Array as PropType<BarChartItem[]>,
    default: () => [],
  },
})

const barChartRef: Ref<HTMLElement | null> = ref(null)

const highestValue: ComputedRef<number> = computed(() =>
  Math.max(...props.data.map((item) => item.value)),
)

const generateBarHeightStyle = (value: number) => {
  if (!barChartRef.value) return { height: '0px' }

  const containerHeight = barChartRef.value.offsetHeight - 20
  const heightPx = highestValue.value ? (value / highestValue.value) * containerHeight : 0

  return { height: `${heightPx}px` }
}
</script>

<template>
  <div
    class="d-flex gc-2 w-100 h-100 bar-chart"
    ref="barChartRef"
    :style="{ '--total-columns': data.length }"
  >
    <div v-for="(item, index) in data" :key="index" class="item">
      <div class="text-caption mb-auto">{{ item.value }}</div>
      <div class="bar" :style="generateBarHeightStyle(item.value)" />
      <div class="text-caption">{{ item.label }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$column-gap: 4px;

.bar-chart {
  display: flex;
  width: 100%;
  height: 100%;

  .item {
    display: flex;
    flex-direction: column;
    flex: 0 0
      calc((100% - (#{$column-gap} * (var(--total-columns) - 1))) / var(--total-columns) - 4px);
    height: 100%;

    .bar {
      background-color: #fff;
      border-radius: 8px;
    }
  }
}
</style>
