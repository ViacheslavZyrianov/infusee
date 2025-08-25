import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'
import { AlertType } from '@/store/alert/types.ts'

export default defineStore('alert', () => {
  const message = ref('')
  const type: Ref<AlertType> = ref(AlertType.Info)
  const isVisible: Ref<boolean> = ref(false)

  const showAlert = (msg: string, alertType: AlertType = AlertType.Info, duration = 3000) => {
    message.value = msg
    type.value = alertType
    isVisible.value = true

    if (duration > 0) {
      setTimeout(() => (isVisible.value = false), duration)
    }
  }

  const hideAlert = () => {
    isVisible.value = false
  }

  return { message, type, visible: isVisible, showAlert, hideAlert }
})
