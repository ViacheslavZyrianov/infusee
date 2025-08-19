import { defineStore } from 'pinia'
import type { Coffee, CoffeeRead, CoffeeLoading } from '@/store/coffees/types.ts'
import supabase from '@/plugins/supabase.ts'
import { reactive } from 'vue'
import type { PostgrestSingleResponse } from '@supabase/postgrest-js'

export default defineStore('coffee', () => {
  const isLoading: CoffeeLoading = reactive({
    getCoffee: true,
    postCoffee: false,
    updateCoffee: false,
    deleteCoffee: false,
  })

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
    isLoading.getCoffee = true

    const response = (await supabase
      .from('coffees')
      .select('*')
      .eq('id', coffeeId)
      .single()) as PostgrestSingleResponse<CoffeeRead>

    isLoading.getCoffee = false

    if (response.error) {
      throw new Error(`Error fetching coffee: ${response.error.message}`)
    }

    return response.data
  }

  const updateCoffee = async (id: string, form: Coffee) => {
    isLoading.updateCoffee = true

    const { data } = await supabase.auth.getSession()
    if (!data?.session?.user.id) throw new Error('Not logged in')

    const payload = {
      user_id: data.session.user.id,
      ...form,
    }

    const { error } = await supabase.from('coffees').update(payload).eq('id', id)

    isLoading.updateCoffee = false

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
