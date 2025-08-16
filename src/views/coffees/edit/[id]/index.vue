<script setup lang="ts">
import { computed, type ComputedRef, onMounted, type Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CoffeeForm from '@/views/coffees/coffee-form.vue'
import type { Coffee } from '@/store/coffees/types.ts'
import useCoffeeStore from '@/store/coffees/coffee.ts'

const route = useRoute()
const router = useRouter()

const coffeeStore = useCoffeeStore()

const coffeeFormRef: Ref<{ form: Coffee }> = ref({
  form: {
    name: '',
    cupping_score: null,
    is_specialty: false,
    is_public: false,
    country: null,
    processing: null,
    roast_level: '',
    notes: '',
    brew_date: null,
  },
})

const id: ComputedRef<string> = computed(() => route.params.id as string)

const onCancel = () => {
  router.go(-1)
}

const getCoffee = async () => {
  const coffee = await coffeeStore.getCoffee(id.value)
  Object.assign(coffeeFormRef.value.form, {
    name: coffee.name,
    cupping_score: coffee.cupping_score,
    is_specialty: coffee.is_specialty,
    is_public: coffee.is_public,
    country: coffee.country,
    processing: coffee.processing,
    roast_level: coffee.roast_level,
    notes: coffee.notes,
    brew_date: coffee.brew_date,
  })
}

const onSave = async () => {
  await coffeeStore.updateCoffee(id.value, coffeeFormRef.value.form)
  router.push('/coffees')
}

onMounted(async () => {
  await getCoffee()
})
</script>

<template>
  <teleport defer to="#app-bar-action--left">
    <v-btn variant="outlined" @click="onCancel">Cancel</v-btn>
  </teleport>
  <teleport defer to="#app-bar-action--right">
    <v-btn @click="onSave">Save</v-btn>
  </teleport>
  <coffee-form ref="coffeeFormRef" />
</template>

<style scoped></style>
