import { defineStore } from 'pinia'
import supabase from '@/plugins/supabase'
import type { User } from '@/store/user/types.ts'
import { computed, type ComputedRef, ref, type Ref } from 'vue'
import useAlertStore from '@/store/alert/alert.ts'
import { AlertType } from '@/store/alert/types.ts'

export default defineStore('user', () => {
  const alertStore = useAlertStore()

  const user: Ref<User> = ref({
    id: '',
    email: '',
    name: '',
    avatar: '',
  })

  const isAuthenticated: ComputedRef<boolean> = computed(() =>
    Object.values(user).some((value) => value !== ''),
  )

  const checkSession = async () => {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      alertStore.show(`Error in user session: ${error.message}`, AlertType.Error)
    }

    if (data.session) {
      user.value = {
        id: data.session.user.id,
        email: data.session.user.email || '',
        name: data.session.user.user_metadata?.full_name || '',
        avatar: data.session.user.user_metadata?.avatar_url || '',
      }
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      alertStore.show(`Error signing out: ${error.message}`, AlertType.Error)
    }

    user.value = {
      id: '',
      email: '',
      name: '',
      avatar: '',
    }
  }

  const getUser = async () => {
    await checkSession()

    if (isAuthenticated.value) return

    const { data, error } = await supabase.auth.getUser()

    if (error) {
      alertStore.show(`Error signing in: ${error.message}`, AlertType.Error)
    }

    if (data.user) {
      user.value = {
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.user_metadata?.full_name || '',
        avatar: data.user.user_metadata?.avatar_url || '',
      }
    }
  }

  return {
    user,
    getUser,
    signOut,
  }
})
