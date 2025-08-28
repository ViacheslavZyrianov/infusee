<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import BrewForm from '@/views/brews/brew-form.vue'
import useBrewStore from '@/store/brews/brew.ts'
import useBrewsStore from '@/store/brews/brews.ts'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const brewStore = useBrewStore()
const brewsStore = useBrewsStore()

const brewFormRef: Ref<InstanceType<typeof BrewForm> | null> = ref(null)
const isSubmitButtonLoading: Ref<boolean> = ref(false)

const onSave = async () => {
  const result = await brewFormRef.value?.validate()

  if (!result?.valid || !brewFormRef.value) return

  isSubmitButtonLoading.value = true

  await brewStore.postBrew(brewFormRef.value.form)

  brewFormRef.value.resetInitialForm()

  await brewsStore.getBrews()

  isSubmitButtonLoading.value = false

  router.push('/brews')
}
</script>

<template>
  <teleport defer to="#app-bar-action--left">
    <v-btn variant="outlined" to="/brews">{{ t('buttons.cancel') }}</v-btn>
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
  <brew-form ref="brewFormRef" />
</template>
