<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import BrewForm from '@/views/brews/brew-form.vue'
import type { Brew } from '@/store/brews/types.ts'
import useBrewStore from '@/store/brews/brew.ts'

const router = useRouter()

const brewStore = useBrewStore()

const brewFormRef: Ref<{ form: Brew }> = ref({
  form: {
    coffee_id: null,
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
    notes: null,
  },
})

const onSave = async () => {
  await brewStore.postBrew(brewFormRef.value.form)
  router.push('/brews')
}
</script>

<template>
  <teleport defer to="#app-bar-action--left">
    <v-btn variant="outlined" to="/brews">Cancel</v-btn>
  </teleport>
  <teleport defer to="#app-bar-action--right">
    <v-btn color="success" @click="onSave">Save</v-btn>
  </teleport>
  <brew-form ref="brewFormRef" />
</template>

<style scoped></style>
