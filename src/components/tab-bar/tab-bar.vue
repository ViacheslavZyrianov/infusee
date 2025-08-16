<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import tabBarItems from './items'
import { useRoute } from 'vue-router'
import supabase from '@/plugins/supabase.ts'

const avatar: Ref<string> = ref('')

const route = useRoute()

const currentRoute: Ref<string> = ref(String(route.name))

const generateIconColor = (path: string): string =>
  currentRoute.value === path ? 'primary' : 'grey'

const getUser = async () => {
  const { data } = await supabase.auth.getSession()

  avatar.value = data.session?.user.user_metadata.avatar_url
}

onMounted(async () => {
  await getUser()
})
</script>

<template>
  <v-bottom-navigation v-model="currentRoute" app>
    <v-btn
      v-for="item in tabBarItems"
      :key="item.icon"
      :to="item.path"
      :value="item.path"
      :icon="item.icon"
      :color="generateIconColor(item.path)"
      block
    />
    <v-btn :to="'/profile'" value="profile" :color="generateIconColor('profile')" block>
      <v-avatar size="24">
        <v-img :src="avatar" alt="Profile" />
      </v-avatar>
    </v-btn>
  </v-bottom-navigation>
</template>
