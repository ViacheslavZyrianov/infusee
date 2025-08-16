<script setup lang="ts">
import { computed, type ComputedRef, onMounted, type Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BrewForm from '@/views/brews/brew-form.vue'
import type { Brew } from '@/store/brews/types.ts'
import useBrewStore from '@/store/brews/brew.ts'

const route = useRoute()
const router = useRouter()

const brewStore = useBrewStore()

const brewFormRef: Ref<{ form: Brew }> = ref({
  form: {
    name: '',
    brew_method: null,
    country: null,
    roaster: null,
    rating_aroma: 0,
    rating_flavor: 0,
    rating_acidity: 0,
    rating_bitterness: 0,
    rating_sweetness: 0,
    rating_body: 0,
    rating_aftertaste: 0,
    grind: null,
    dose: null,
    channeling: null,
    output: null,
    price: null,
    notes: null,
  },
})

const id: ComputedRef<string> = computed(() => route.params.id as string)

const onCancel = () => {
  router.go(-1)
}

const getBrew = async () => {
  const brew = await brewStore.getBrew(id.value)
  Object.assign(brewFormRef.value.form, {
    name: brew.name,
    brew_method: brew.brew_method,
    country: brew.country,
    roaster: brew.roaster,
    rating_aroma: brew.rating_aroma,
    rating_flavor: brew.rating_flavor,
    rating_acidity: brew.rating_acidity,
    rating_bitterness: brew.rating_bitterness,
    rating_sweetness: brew.rating_sweetness,
    rating_body: brew.rating_body,
    rating_aftertaste: brew.rating_aftertaste,
    grind: brew.grind,
    dose: brew.dose,
    channeling: brew.channeling,
    output: brew.output,
    price: brew.price,
    notes: brew.notes,
  })
}

const onSave = async () => {
  await brewStore.updateBrew(id.value, brewFormRef.value.form)
  router.push(`/brews/${id.value}`)
}

onMounted(async () => {
  await getBrew()
})
</script>

<template>
  <teleport defer to="#app-bar-action--left">
    <v-btn variant="outlined" @click="onCancel">Cancel</v-btn>
  </teleport>
  <teleport defer to="#app-bar-action--right">
    <v-btn @click="onSave">Save</v-btn>
  </teleport>
  <brew-form v-if="!brewStore.isLoading" ref="brewFormRef" />
</template>

<style scoped></style>
