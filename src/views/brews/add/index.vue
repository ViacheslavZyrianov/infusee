<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import BrewForm from '@/views/brews/brew-form.vue'
import useBrewStore from '@/store/brews/brew.ts'

const router = useRouter()

const brewStore = useBrewStore()

const brewFormRef:Ref<InstanceType<typeof BrewForm> | null> = ref(null)

const onSave = async () => {
  const result = await brewFormRef.value?.validate()  

  if (!result?.valid || !brewFormRef.value) return

  await brewStore.postBrew(brewFormRef.value.form)
  router.push('/brews')
}
</script>

<template>
  <teleport defer to="#app-bar-action--left">
    <v-btn variant="outlined" to="/brews">Cancel</v-btn>
  </teleport>
  <teleport defer to="#app-bar-action--right">
    <v-btn :loading="brewStore.isLoading.postBrew" :disabled="brewStore.isLoading.postBrew" color="success" @click="onSave">Save</v-btn>
  </teleport>
  <brew-form ref="brewFormRef" />
</template>

<style scoped></style>
