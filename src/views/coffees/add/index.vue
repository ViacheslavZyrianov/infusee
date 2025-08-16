<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import CoffeeForm from '@/views/coffees/coffee-form.vue'
import type { Coffee } from '@/store/coffees/types.ts'
import useCoffeeStore from '@/store/coffees/coffee.ts'

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

const onSave = async () => {
  await coffeeStore.postCoffee(coffeeFormRef.value.form)
  router.push('/coffees')
}
</script>

<template>
  <teleport defer to="#app-bar-action--left">
    <v-btn variant="outlined" to="/coffees">Cancel</v-btn>
  </teleport>
  <teleport defer to="#app-bar-action--right">
    <v-btn @click="onSave">Save</v-btn>
  </teleport>
  <coffee-form ref="coffeeFormRef" />
</template>

<style scoped></style>
