<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/store/user/user'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const userStore = useUserStore()

const onSignOut = async () => {
  await userStore.signOut()
  router.push('/')
}

onMounted(async () => {
  await userStore.getUser()
})
</script>

<template>
  <teleport defer to="#app-bar-action--right">
    <v-btn icon="mdi-cog-outline" to="/settings" color="gray" variant="text" rounded="xl" />
  </teleport>
  <v-card class="pa-4 text-center">
    <v-avatar size="120" class="mx-auto mb-4">
      <v-img v-if="userStore.user.avatar" :src="userStore.user.avatar" alt="User avatar" />
      <v-icon v-else size="120">mdi-account-circle</v-icon>
    </v-avatar>

    <h2 class="mb-2">{{ userStore.user.name }}</h2>

    <p class="text-medium-emphasis mb-4">{{ userStore.user.email }}</p>

    <v-btn color="error" prepend-icon="mdi-logout" @click="onSignOut">
      {{ t('buttons.sign_out') }}
    </v-btn>

    <v-divider class="my-4" />
    <p class="text-caption text-medium-emphasis">ID: {{ userStore.user.id }}</p>
  </v-card>
</template>

<style scoped></style>
