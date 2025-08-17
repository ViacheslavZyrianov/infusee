import { defineStore } from 'pinia'
import type { Brew, BrewRead } from '@/store/brews/types.ts'
import supabase from '@/plugins/supabase.ts'
import string2number from '@/utilities/string2number.ts'
import { ref, type Ref } from 'vue'

export default defineStore('brew', () => {
  const isLoading: Ref<boolean> = ref(false)

  const postBrew = async (form: Brew) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not logged in')

    const numericFields: (keyof Brew)[] = ['channeling', 'dose', 'grind', 'output']

    const payload = {
      user_id: user.id,
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

    if (error) {
      throw new Error(`Error posting brew: ${error.message}`)
    }
  }

  const getBrew = async (brewId: string): Promise<BrewRead> => {
    isLoading.value = true

    const { data, error } = await supabase
      .from('brews')
      .select('*, coffees (name)')
      .eq('id', brewId)
      .single()

    isLoading.value = false

    if (error) {
      throw new Error(`Error fetching brew: ${error.message}`)
    }

    return data
  }

  const updateBrew = async (id: string, form: Brew) => {
    const { data } = await supabase.auth.getSession()
    if (!data?.session?.user.id) throw new Error('Not logged in')

    const numericFields: (keyof Brew)[] = ['channeling', 'dose', 'grind', 'output']

    const payload = {
      user_id: data.session.user.id,
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

    if (error) {
      throw new Error(`Error updating brew: ${error.message}`)
    }
  }

  const deleteBrew = async (id: string) => {
    const { error } = await supabase.from('brews').delete().eq('id', id)

    if (error) {
      throw new Error(`Error deleting brew: ${error.message}`)
    }
  }

  return { isLoading, getBrew, postBrew, updateBrew, deleteBrew }
})
