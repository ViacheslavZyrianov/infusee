import { ref, type Ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default () => {
  const { t } = useI18n()

  const hasChanges: Ref<boolean> = ref(false)

  const showConfirmDialog = (message: string): boolean => confirm(message)

  onBeforeRouteLeave(() => {
    if (hasChanges.value && !showConfirmDialog(t('general_messages.has_unsaved_changes.leave'))) {
      return false
    }
  })

  return {
    hasChanges,
    showConfirmDialog,
  }
}
