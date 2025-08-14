<script setup lang="ts">
import supabase from '@/plugins/supabase'

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
    <v-card-title class="mb-2"> Welcome to Kavoznay! </v-card-title>

    <v-card-subtitle>Ready to brew some magic? ✨</v-card-subtitle>

    <v-card-actions class="d-flex flex-column">
      <v-btn variant="outlined" block class="mb-3" @click="signInWithGoogle">
        <div class="icon-google" />
        Sign in with Google
      </v-btn>
    </v-card-actions>

    <v-card-text class="text-center mt-6 grey--text text--darken-1">
      By signing in, you agree to our <a href="/terms-of-service">Terms of Service</a> and
      <a href="/privacy-policy">Privacy Policy</a>.
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
