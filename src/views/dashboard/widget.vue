<script setup lang="ts">
import type { WidgetData } from '@/views/dashboard/types'
import { computed, type ComputedRef, type PropType, ref, type Ref } from 'vue'

const emit = defineEmits(['click'])

const props = defineProps({
  data: {
    type: Object as PropType<WidgetData>,
    default: () => ({}),
  },
})

const customComponentRef: Ref<{ isLoading: boolean }> = ref({ isLoading: false })

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

  return base.join(' ')
})

const isLoading: ComputedRef<boolean> = computed(
  () => props.data.isLoading || Boolean(customComponentRef.value?.isLoading),
)

const wrapperClassList: ComputedRef<Record<'display', string>> = computed(() => ({
  display: isLoading.value ? 'none !important' : 'flex',
}))
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
    <v-progress-circular v-show="isLoading" indeterminate />
    <div
      :style="wrapperClassList"
      class="w-100 h-100 d-flex flex-column align-center justify-center"
    >
      <component v-if="data.component" :is="data.component" ref="customComponentRef" />
      <template v-else>
        <h1 class="text-h1 font-weight-black">{{ data.title }}</h1>
        <p class="text-body-2">{{ data.subtitle }}</p>
      </template>
      <div v-if="data.label" class="label text-body-2">
        {{ data.label }}
      </div>
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
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  z-index: 1;
  padding: 4px 0;
  border-radius: 0 0 14px 14px;
  transform: translateY(100%);
  color: rgb(var(--v-theme-on-background));
  white-space: nowrap;
}
</style>
