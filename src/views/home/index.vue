<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import supabase from '@/plugins/supabase'
import GuestView from './guest.vue'
import UserView from './user.vue'
import type { UserMetadata } from '@supabase/supabase-js'

const isReady: Ref<boolean> = ref(false)
const userData: Ref<UserMetadata | null> = ref(null)

const checkIsLoggedIn = async () => {
  const { data, error } = await supabase.auth.getSession()
  if (error) {
    throw new Error(`Failed to get session: ${error.message}`)
  }
  userData.value = data.session?.user.user_metadata || null
  isReady.value = true
}

const onSignOut = () => {
  userData.value = null
}

onMounted(async () => {
  await checkIsLoggedIn()
})
</script>

<template>
  <v-chip text="0.5" />
  <user-view v-if="userData" :user="userData" @sign-out="onSignOut" />
  <guest-view v-else />
</template>

<style scoped></style>
