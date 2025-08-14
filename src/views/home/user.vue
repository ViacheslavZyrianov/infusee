<script setup lang="ts">
import { computed } from 'vue'
import type { UserMetadata } from '@supabase/supabase-js'
import useUserStore from '@/store/user/user.ts'

const userStore = useUserStore()

const emit = defineEmits(['signOut'])

const props = defineProps({
  user: {
    type: Object as () => UserMetadata | null,
    required: true,
  },
})

const displayName = computed(() => {
  return props.user?.full_name || props.user?.name || props.user?.email?.split('@')[0] || 'there'
})

const initials = computed(() => {
  const base = props.user?.full_name || props.user?.name || 'User'
  return base
    .split(/\s+/)
    .slice(0, 2)
    .map((w: string) => w.charAt(0).toUpperCase())
    .join('')
})

const onSignOut = async () => {
  await userStore.signOut()
  emit('signOut')
}
</script>

<template>
  <v-card class="pa-6 pa-md-10" elevation="8">
    <v-row class="align-center" no-gutters>
      <v-col cols="12" md="auto" class="d-flex justify-center mb-6 mb-md-0 pr-md-8">
        <v-avatar size="112" class="bg-grey-lighten-3">
          <v-img
            v-if="user?.picture || user?.avatar_url"
            :src="user?.picture || user?.avatar_url"
            :alt="displayName"
            cover
          />
          <span v-else class="text-h4">{{ initials }}</span>
        </v-avatar>
      </v-col>

      <v-col cols="12" md>
        <div class="">
          <h1 class="text-h6 text-md-h3 font-weight-bold mr-2">Hey, {{ displayName }} 👋</h1>
          <h4 class="text-subtitle-2 text-md-h3 font-weight-normal">
            Great to see you again! Ready to brew?
          </h4>
        </div>

        <v-divider class="my-6" />

        <div class="d-flex ga-4">
          <v-btn class="flex-grow-1" prepend-icon="mdi-coffee" to="/brews"> Start brewing </v-btn>
          <v-btn class="flex-grow-1" color="error" prepend-icon="mdi-logout" @click="onSignOut">
            Sign out
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
