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

const classList: ComputedRef<string> = computed((): string => {
  const base = [
    'text-center',
    'd-flex',
    'flex-column',
    'align-center',
    'justify-center',
    `widget-${props.data.size}`,
    'overflow-visible',
  ]

  base.push(props.data.label ? 'mb-11' : 'mb-4')

  return base.join(' ')
})
</script>

<template>
  <v-card
    elevation="0"
    rounded="xl"
    :class="classList"
    :color="data.color"
    :to="data.to"
    :ripple="false"
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
  bottom: 0;
  left: auto;
  right: auto;
  z-index: 1;
  padding: 4px 16px;
  border-radius: 0 0 14px 14px;
  transform: translateY(100%);
}
</style>
