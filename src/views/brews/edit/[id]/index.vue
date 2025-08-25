<script setup lang="ts">
import { computed, type ComputedRef, onMounted, type Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BrewForm from '@/views/brews/brew-form.vue'
import useBrewStore from '@/store/brews/brew.ts'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const brewStore = useBrewStore()

const brewFormRef: Ref<InstanceType<typeof BrewForm> | null> = ref(null)

const id: ComputedRef<string> = computed(() => route.params.id as string)

const onCancel = () => {
  router.go(-1)
}

const getBrew = async () => {
  if (!brewFormRef.value?.form) return

  const brew = await brewStore.getBrew(id.value)
  Object.assign(brewFormRef.value.form, {
    coffee_id: brew.coffee_id,
    brew_method: brew.brew_method,
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
    notes: brew.notes,
  })
}

const onSave = async () => {
  const result = await brewFormRef.value?.validate()

  if (!result?.valid || !brewFormRef.value) return

  await brewStore.updateBrew(id.value, brewFormRef.value.form)
  router.push(`/brews/${id.value}`)
}

onMounted(async () => {
  await getBrew()
})
</script>

<template>
  <teleport defer to="#app-bar-action--left">
    <v-btn variant="outlined" @click="onCancel">{{ t('buttons.cancel') }}</v-btn>
  </teleport>
  <teleport defer to="#app-bar-action--right">
    <v-btn
      :loading="brewStore.isLoading.updateBrew"
      :disabled="brewStore.isLoading.updateBrew"
      color="success"
      @click="onSave"
    >
      {{ t('buttons.save') }}
    </v-btn>
  </teleport>
  <brew-form v-if="!brewStore.isLoading.getBrew" ref="brewFormRef" />
</template>

<style scoped></style>
