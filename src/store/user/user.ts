import { defineStore } from 'pinia'
import supabase from '@/plugins/supabase'
import type { User } from '@/store/user/types.ts'
import { computed, type ComputedRef, ref, type Ref } from 'vue'

export default defineStore('user', () => {
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
      throw new Error(`Error in session: ${error.message}`)
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
      throw new Error(`Error logging out: ${error.message}`)
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
      throw new Error(`Error logging user: ${error.message}`)
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
