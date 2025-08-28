<script setup lang="ts">
import RoasterItem from '@/views/roasters/roaster-item.vue'
import { onMounted } from 'vue'
import useRoastersStore from '@/store/roasters/roasters.ts'

const roastersStore = useRoastersStore()

onMounted(async () => {
  if (!roastersStore.roasters) await roastersStore.getRoasters()
})
</script>

<template>
  <div class="d-flex flex-column ga-4">
    <template v-if="roastersStore.isLoading.getRoasters">
      <v-skeleton-loader v-for="i in 3" :key="i" type="article" height="136px" />
    </template>
    <template v-else>
      <roaster-item v-for="roaster in roastersStore.roasters" :key="roaster.id" :data="roaster" />
    </template>
  </div>
</template>
