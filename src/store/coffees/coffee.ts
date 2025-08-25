import { defineStore } from 'pinia'
import type { Coffee, CoffeeLoading, CoffeeRead } from '@/store/coffees/types.ts'
import supabase from '@/plugins/supabase.ts'
import { reactive } from 'vue'
import type { PostgrestSingleResponse } from '@supabase/postgrest-js'
import useUserStore from '@/store/user/user.ts'
import useAlertStore from '@/store/alert/alert.ts'
import { AlertType } from '@/store/alert/types.ts'

export default defineStore('coffee', () => {
  const alertStore = useAlertStore()

  const isLoading: CoffeeLoading = reactive({
    getCoffee: true,
    postCoffee: false,
    updateCoffee: false,
    deleteCoffee: false,
  })

  const userStore = useUserStore()

  const postCoffee = async (form: Coffee) => {
    await userStore.getUser()

    const payload = {
      user_id: userStore.user.id,
      ...form,
    }

    const { error } = await supabase.from('coffees').insert([payload])

    if (error) {
      alertStore.show(`Error posting coffee: ${error.message}`, AlertType.Error)
    }
  }

  const getCoffee = async (coffeeId: string): Promise<CoffeeRead | null> => {
    isLoading.getCoffee = true

    const { data, error } = (await supabase
      .from('coffees')
      .select('*')
      .eq('id', coffeeId)
      .single()) as PostgrestSingleResponse<CoffeeRead>

    isLoading.getCoffee = false

    if (error) {
      alertStore.show(`Error posting coffee: ${error.message}`, AlertType.Error)
    }

    return data
  }

  const updateCoffee = async (id: string, form: Coffee) => {
    isLoading.updateCoffee = true

    await userStore.getUser()

    const { error } = await supabase
      .from('coffees')
      .update({
        user_id: userStore.user.id,
        ...form,
      })
      .eq('id', id)

    isLoading.updateCoffee = false

    if (error) {
      alertStore.show(`Error updating coffee: ${error.message}`, AlertType.Error)
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
