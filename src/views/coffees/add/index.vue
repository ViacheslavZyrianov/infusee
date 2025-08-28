<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import CoffeeForm from '@/views/coffees/coffee-form.vue'
import useCoffeeStore from '@/store/coffees/coffee.ts'
import useCoffeesStore from '@/store/coffees/coffees.ts'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()
const coffeeStore = useCoffeeStore()
const coffeesStore = useCoffeesStore()

const coffeeFormRef: Ref<InstanceType<typeof CoffeeForm> | null> = ref(null)
const isSubmitButtonLoading: Ref<boolean> = ref(false)

const onSave = async () => {
  const result = await coffeeFormRef.value?.validate()

  if (!result?.valid || !coffeeFormRef.value) return

  isSubmitButtonLoading.value = true

  await coffeeStore.postCoffee(coffeeFormRef.value.form)

  coffeeFormRef.value.resetInitialForm()

  await coffeesStore.getCoffees()

  isSubmitButtonLoading.value = false

  router.push('/coffees')
}
</script>

<template>
  <teleport defer to="#app-bar-action--left">
    <v-btn variant="outlined" to="/coffees">{{ t('buttons.cancel') }}</v-btn>
  </teleport>
  <teleport defer to="#app-bar-action--right">
    <v-btn
      :loading="isSubmitButtonLoading"
      :disabled="isSubmitButtonLoading"
      color="success"
      @click="onSave"
    >
      {{ t('buttons.save') }}
    </v-btn>
  </teleport>
  <coffee-form ref="coffeeFormRef" />
</template>
