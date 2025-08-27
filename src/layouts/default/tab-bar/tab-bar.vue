<script setup lang="ts">
import { onMounted, ref, type Ref, computed, type ComputedRef } from 'vue'
import tabBarItems from './items.ts'
import { useRoute } from 'vue-router'
import supabase from '@/plugins/supabase.ts'

const avatar: Ref<string> = ref('')
const route = useRoute()

const currentRoutePath: ComputedRef<string> = computed(() => route.path)

const generateIconColor = (path: string): 'primary' | 'grey' =>
  currentRoutePath.value.startsWith(path) ? 'primary' : 'grey'

const getUser = async () => {
  const { data } = await supabase.auth.getSession()
  avatar.value = data.session?.user.user_metadata.avatar_url
}

onMounted(async () => {
  await getUser()
})
</script>

<template>
  <v-bottom-navigation app>
    <v-btn
      v-for="item in tabBarItems"
      :key="item.icon"
      :to="item.path"
      :icon="item.icon"
      :color="generateIconColor(item.path)"
      variant="plain"
      :ripple="false"
      block
    />
    <v-btn
      :to="'/profile'"
      :color="generateIconColor('/profile')"
      block
      variant="plain"
      :ripple="false"
    >
      <v-avatar size="24">
        <img v-if="avatar" :src="avatar" alt="Profile" class="w-100 h-100" />
        <v-icon v-else size="24">mdi-account-circle</v-icon>
      </v-avatar>
    </v-btn>
  </v-bottom-navigation>
</template>
