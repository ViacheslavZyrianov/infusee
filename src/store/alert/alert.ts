import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'
import { AlertType } from '@/store/alert/types.ts'

export default defineStore('alert', () => {
  const message = ref('')
  const alertType: Ref<AlertType> = ref(AlertType.Info)
  const isVisible: Ref<boolean> = ref(false)
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const show = (newMessage: string, newType: AlertType = AlertType.Info, duration = 3000) => {
    if (newType === AlertType.Error) throw new Error(newMessage)

    message.value = newMessage
    alertType.value = newType
    isVisible.value = true

    if (timeoutId) clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      isVisible.value = false
    }, duration)
  }

  const hide = () => {
    isVisible.value = false
    if (timeoutId) clearTimeout(timeoutId)
  }

  return {
    message,
    alertType,
    isVisible,
    show,
    hide,
  }
})
