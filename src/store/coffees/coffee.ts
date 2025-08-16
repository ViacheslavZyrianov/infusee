import { defineStore } from 'pinia'
import type { Coffee, CoffeeRead } from '@/store/coffees/types.ts'
import supabase from '@/plugins/supabase.ts'
import { ref, type Ref } from 'vue'
import type { PostgrestSingleResponse } from '@supabase/postgrest-js'

export default defineStore('coffee', () => {
  const isLoading: Ref<boolean> = ref(false)

  const postCoffee = async (form: Coffee) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not logged in')

    const payload = {
      user_id: user.id,
      ...form,
    }

    const { error } = await supabase.from('coffees').insert([payload])

    if (error) {
      throw new Error(`Error posting coffee: ${error.message}`)
    }
  }

  const getCoffee = async (coffeeId: string): Promise<CoffeeRead> => {
    isLoading.value = true

    const response = (await supabase
      .from('coffees')
      .select('*')
      .eq('id', coffeeId)
      .single()) as PostgrestSingleResponse<CoffeeRead>

    isLoading.value = false

    if (response.error) {
      throw new Error(`Error fetching coffee: ${response.error.message}`)
    }

    return response.data
  }

  const updateCoffee = async (id: string, form: Coffee) => {
    const { data } = await supabase.auth.getSession()
    if (!data?.session?.user.id) throw new Error('Not logged in')

    const payload = {
      user_id: data.session.user.id,
      ...form,
    }

    const { error } = await supabase.from('coffees').update(payload).eq('id', id)

    if (error) {
      throw new Error(`Error updating coffee: ${error.message}`)
    }
  }

  const deleteCoffee = async (id: number) => {
    const { error } = await supabase.from('coffees').delete().eq('id', id)

    if (error) {
      throw new Error(`Error deleting coffee: ${error.message}`)
    }
  }

  return { isLoading, getCoffee, postCoffee, updateCoffee, deleteCoffee }
})
