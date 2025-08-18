<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import CoffeeForm from '@/views/coffees/coffee-form.vue'
import useCoffeeStore from '@/store/coffees/coffee.ts'

const router = useRouter()

const coffeeStore = useCoffeeStore()

const coffeeFormRef: Ref<InstanceType<typeof CoffeeForm> | null> = ref(null)

const onSave = async () => {
  const result = await coffeeFormRef.value?.validate()

  if (!result?.valid || !coffeeFormRef.value) return

  await coffeeStore.postCoffee(coffeeFormRef.value.form)
  router.push('/coffees')
}
</script>

<template>
  <teleport defer to="#app-bar-action--left">
    <v-btn variant="outlined" to="/coffees">Cancel</v-btn>
  </teleport>
  <teleport defer to="#app-bar-action--right">
    <v-btn
      :loading="coffeeStore.isLoading.postCoffee"
      :disabled="coffeeStore.isLoading.postCoffee"
      color="success"
      @click="onSave"
    >
      Save
    </v-btn>
  </teleport>
  <coffee-form ref="coffeeFormRef" />
</template>

<style scoped></style>
