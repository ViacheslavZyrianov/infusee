<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import BrewForm from '@/views/brews/brew-form.vue'
import type { Brew } from '@/store/brews/types.ts'
import useBrewStore from '@/store/brews/brew.ts'

const router = useRouter()

const brewStore = useBrewStore()

const brewFormRef: Ref<{ form: Brew }> = ref({
  form: {},
})

const onSave = async () => {
  await brewStore.postBrew(brewFormRef.value.form)
  router.push('/brews')
}
</script>

<template>
  <teleport to="#app-bar-action--left">
    <v-btn variant="outlined" to="/brews">Cancel</v-btn>
  </teleport>
  <teleport to="#app-bar-action--right">
    <v-btn @click="onSave">Save</v-btn>
  </teleport>
  <brew-form ref="brewFormRef" />
</template>

<style scoped></style>
