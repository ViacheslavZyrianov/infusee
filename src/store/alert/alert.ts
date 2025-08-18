import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'
import { AlertType } from '@/store/alert/types'

export const useAlertStore = defineStore('alert', () => {
  const message = ref('')
  const type: Ref<AlertType> = ref(AlertType.Info)
  const isVisible: Ref<boolean> = ref(false)

  const show = (msg: string, alertType: AlertType = AlertType.Info, duration = 3000) => {
    message.value = msg
    type.value = alertType
    isVisible.value = true

    if (duration > 0) {
      setTimeout(() => (isVisible.value = false), duration)
    }
  }

  const hide = () => {
    isVisible.value = false
  }

  return { message, type, visible: isVisible, show, hide }
})
