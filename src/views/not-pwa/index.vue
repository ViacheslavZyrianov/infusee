<script setup lang="ts">
import { ref, onMounted, type ComputedRef, computed } from 'vue'
import ios from './ios.vue'
import android from './android.vue'
import other from './other.vue'
import footerInfo from './footer-info.vue'

const platform = ref<'ios' | 'android' | 'other'>('other')

const definePlatform = () => {
  if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    platform.value = 'ios'
  } else if (navigator.userAgent.match(/Android/i)) {
    platform.value = 'android'
  } else {
    platform.value = 'other'
  }
}

const isiOS: ComputedRef<boolean> = computed(() => platform.value === 'ios')
const isAndroid: ComputedRef<boolean> = computed(() => platform.value === 'android')
const isOther: ComputedRef<boolean> = computed(() => platform.value === 'other')

onMounted(() => {
  definePlatform()
})
</script>

<template>
  <v-card class="pa-6 text-center">
    <v-card-title class="text-h5 font-weight-bold mb-4"> Install Infusee </v-card-title>

    <p class="mb-4">
      You’re currently using the web version. <br />
      It's required to install <b>infusee</b> on your device.
    </p>

    <ios v-if="isiOS" />
    <android v-if="isAndroid" />
    <other v-if="isOther" />
  </v-card>

  <footer-info />
</template>
