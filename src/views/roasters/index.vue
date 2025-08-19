<script setup lang="ts">
import RoasterItem from '@/views/roasters/roaster-item.vue'
import { onMounted, ref, type Ref } from 'vue'
import type { RoasterRead } from '@/store/roasters/types'
import useRoastersStore from '@/store/roasters/roasters.ts'

const roastersStore = useRoastersStore()

const roasters: Ref<RoasterRead[]> = ref([])

const getRoasters = async () => {
  roasters.value = await roastersStore.getRoasters()
}

onMounted(async () => {
  await getRoasters()
})
</script>

<template>
  <div class="d-flex flex-column ga-4">
    <template v-if="roastersStore.isLoading.getRoasters">
      <v-skeleton-loader v-for="i in 3" :key="i" type="article" height="136px" />
    </template>
    <template v-else>
      <roaster-item v-for="roaster in roasters" :key="roaster.id" :data="roaster" />
    </template>
  </div>
</template>
