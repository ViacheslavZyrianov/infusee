<script setup lang="ts">
import supabase from '@/plugins/supabase'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  })

  if (error) {
    throw new Error('OAuth failed')
  }
}
</script>

<template>
  <v-card class="pa-8">
    <v-card-title class="mb-2"> {{ t('index.guest.title') }} </v-card-title>

    <v-card-subtitle>{{ t('index.guest.subtitle') }}</v-card-subtitle>

    <v-card-actions class="d-flex flex-column">
      <v-btn variant="tonal" block class="mb-3" @click="signInWithGoogle">
        <div class="icon-google" />
        {{ t('index.guest.sign_in_with_google') }}
      </v-btn>
    </v-card-actions>

    <v-card-text class="text-center mt-6">
      <i18n-t keypath="index.guest.sign_in_agreement.title">
        <template #terms_of_service>
          <router-link
            :to="t('index.guest.sign_in_agreement.terms_of_service.link')"
            class="text-primary"
          >
            {{ t('index.guest.sign_in_agreement.terms_of_service.title') }}
          </router-link>
        </template>
        <template #privacy_policy>
          <router-link
            :to="t('index.guest.sign_in_agreement.privacy_policy.link')"
            class="text-primary"
          >
            {{ t('index.guest.sign_in_agreement.privacy_policy.title') }}
          </router-link>
        </template>
      </i18n-t>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.icon-google {
  background-image: url('@/assets/img/google.svg');
  width: 24px;
  height: 24px;
  display: inline-block;
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 8px;
}
</style>
