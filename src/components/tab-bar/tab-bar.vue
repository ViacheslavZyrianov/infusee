<script setup lang="ts">
import { ref, type Ref } from 'vue'
import tabBarItems from './items'
import { useRoute } from 'vue-router'

const route = useRoute()

const currentRoute: Ref<string> = ref(String(route.name))

const generateIconColor = (path: string): string =>
  currentRoute.value === path ? 'primary' : 'grey'
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
  </v-bottom-navigation>
</template>
