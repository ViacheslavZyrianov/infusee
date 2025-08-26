<script setup lang="ts">
import type { WidgetData } from '@/views/dashboard/types'
import { computed, type ComputedRef, type PropType } from 'vue'

const emit = defineEmits(['click'])

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
  <v-card
    rounded="xl"
    :class="classList"
    :color="data.color"
    :to="data.to"
    :ripple="false"
    style="overflow: visible"
    @click="emit('click')"
  >
    <slot v-if="data.component" />
    <template v-else>
      <h1 class="text-h1 font-weight-black">{{ data.title }}</h1>
      <p class="text-body-2">{{ data.subtitle }}</p>
    </template>
    <div v-if="data.label" class="label text-body-2">
      {{ data.label }}
    </div>
  </v-card>
</template>

<style scoped lang="scss">
.widget-half {
  width: calc(50vw - 24px);
  height: calc(50vw - 24px);
}

.widget-full {
  width: 100%;
  height: calc(50vw - 24px);
}

.label {
  position: absolute;
  bottom: -28px;
  left: auto;
  right: auto;
  z-index: 1;
  background-color: #00897b !important;
  padding: 4px 16px;
  border-radius: 0 0 14px 14px;
}
</style>
