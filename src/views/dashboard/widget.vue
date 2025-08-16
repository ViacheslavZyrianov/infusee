<script setup lang="ts">
import type { WidgetData } from '@/views/dashboard/types'
import { computed, type ComputedRef, type PropType } from 'vue'

const props = defineProps({
  data: {
    type: Object as PropType<WidgetData>,
    default: () => ({}),
  },
})

const classList: ComputedRef<string> = computed(
  () => `text-center d-flex flex-column align-center justify-center widget-${props.data.size}`,
)
</script>

<template>
  <v-card rounded="xl" :class="classList" :color="data.color">
    <h1 class="text-h1 font-weight-black">{{ data.title }}</h1>
    <p class="text-body-2">{{ data.subtitle }}</p>
  </v-card>
</template>

<style scoped lang="scss">
.widget-half {
  width: calc(50vw - 24px);
  height: calc(50vw - 24px);
}
</style>
