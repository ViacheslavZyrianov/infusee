import { defineStore } from 'pinia'
import type { Brew, BrewLoading, BrewRead } from '@/store/brews/types.ts'
import supabase from '@/plugins/supabase.ts'
import string2number from '@/utilities/string2number.ts'
import { reactive } from 'vue'
import useUserStore from '@/store/user/user.ts'
import useAlertStore from '@/store/alert/alert.ts'
import { AlertType } from '@/store/alert/types.ts'

export default defineStore('brew', () => {
  const alertStore = useAlertStore()

  const isLoading: BrewLoading = reactive({
    getBrew: true,
    postBrew: false,
    updateBrew: false,
    deleteBrew: false,
  })

  const userStore = useUserStore()

  const getBrew = async (brewId: string): Promise<BrewRead> => {
    isLoading.getBrew = true

    const { data, error } = await supabase
      .from('brews')
      .select('*, coffees (name)')
      .eq('id', brewId)
      .single()

    isLoading.getBrew = false

    if (error) {
      alertStore.show(`Error fetching brew: ${error.message}`, AlertType.Error)
    }

    return data
  }

  const postBrew = async (form: Brew) => {
    isLoading.postBrew = true

    await userStore.getUser()

    const numericFields: (keyof Brew)[] = ['channeling', 'dose', 'grind', 'output']

    const payload = {
      user_id: userStore.user.id,
      ...form,
      ...numericFields.reduce(
        (acc, key) => {
          const value = form[key]
          if (value !== null && typeof value === 'string') acc[key] = string2number(value)
          return acc
        },
        {} as Record<string, number>,
      ),
    }

    const { error } = await supabase.from('brews').insert([payload])

    isLoading.postBrew = false

    if (error) {
      alertStore.show(`Error posting brew: ${error.message}`, AlertType.Error)
    }
  }

  const updateBrew = async (id: string, form: Brew) => {
    isLoading.updateBrew = true

    await userStore.getUser()

    const numericFields: (keyof Brew)[] = ['channeling', 'dose', 'grind', 'output']

    const payload = {
      user_id: userStore.user.id,
      ...form,
      ...numericFields.reduce(
        (acc, key) => {
          const value = form[key]
          if (value !== null && typeof value === 'string') acc[key] = string2number(value)
          return acc
        },
        {} as Record<string, number>,
      ),
    }

    const { error } = await supabase.from('brews').update(payload).eq('id', id)

    isLoading.updateBrew = false

    if (error) {
      alertStore.show(`Error updating brew: ${error.message}`, AlertType.Error)
    }
  }

  const deleteBrew = async (id: string) => {
    isLoading.deleteBrew = true

    const { error } = await supabase.from('brews').delete().eq('id', id)

    isLoading.deleteBrew = false

    if (error) {
      alertStore.show(`Error deleting brew: ${error.message}`, AlertType.Error)
    }
  }

  return { isLoading, getBrew, postBrew, updateBrew, deleteBrew }
})
