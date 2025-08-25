<script setup lang="ts">
import { computed, type ComputedRef, onMounted, type Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CoffeeForm from '@/views/coffees/coffee-form.vue'
import useCoffeeStore from '@/store/coffees/coffee.ts'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const coffeeStore = useCoffeeStore()

const coffeeFormRef: Ref<InstanceType<typeof CoffeeForm> | null> = ref(null)

const id: ComputedRef<string> = computed(() => route.params.id as string)

const onCancel = () => {
  router.go(-1)
}

const getCoffee = async () => {
  if (!coffeeFormRef.value) return

  const coffee = await coffeeStore.getCoffee(id.value)
  Object.assign(coffeeFormRef.value.form, {
    name: coffee.name,
    cupping_score: coffee.cupping_score,
    is_public: coffee.is_public,
    country: coffee.country,
    processing: coffee.processing,
    roast_level: coffee.roast_level,
    notes: coffee.notes,
    roaster_id: coffee.roaster_id,
  })
}

const onSave = async () => {
  const result = await coffeeFormRef.value?.validate()

  if (!result?.valid || !coffeeFormRef.value) return

  await coffeeStore.updateCoffee(id.value, coffeeFormRef.value.form)
  router.push('/coffees')
}

onMounted(async () => {
  await getCoffee()
})
</script>

<template>
  <teleport defer to="#app-bar-action--left">
    <v-btn variant="outlined" @click="onCancel">{{ t('buttons.cancel') }}</v-btn>
  </teleport>
  <teleport defer to="#app-bar-action--right">
    <v-btn
      :loading="coffeeStore.isLoading.updateCoffee"
      :disabled="coffeeStore.isLoading.updateCoffee"
      color="success"
      @click="onSave"
    >
      {{ t('buttons.save') }}
    </v-btn>
  </teleport>
  <coffee-form ref="coffeeFormRef" />
</template>

<style scoped></style>
