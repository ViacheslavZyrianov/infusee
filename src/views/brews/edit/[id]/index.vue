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
  form: {},
})

const id: ComputedRef<string> = computed(() => route.params.id as string)

const onCancel = () => {
  router.go(-1)
}

const getBrew = async () => {
  const brew = await brewStore.getBrew(id.value)

  Object.keys(brewFormRef.value.form).forEach((key) => {
    brewFormRef.value.form[key] = brew[key]
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
  <teleport to="#app-bar-action--left">
    <v-btn variant="outlined" @click="onCancel">Cancel</v-btn>
  </teleport>
  <teleport to="#app-bar-action--right">
    <v-btn @click="onSave">Save</v-btn>
  </teleport>
  <brew-form ref="brewFormRef" />
</template>

<style scoped></style>
