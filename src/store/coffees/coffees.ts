import { defineStore } from 'pinia'
import supabase from '@/plugins/supabase.ts'
import { reactive } from 'vue'
import type { CoffeeRead, CoffeesLoading } from '@/store/coffees/types.ts'
import type { PostgrestSingleResponse } from '@supabase/postgrest-js'
import useUserStore from '@/store/user/user.ts'

export default defineStore('coffees', () => {
  const isLoading: CoffeesLoading = reactive({
    getCoffees: true,
    getCoffeesTotalCount: true,
  })

  const userStore = useUserStore()

  const getCoffees = async (query?: string): Promise<CoffeeRead[]> => {
    isLoading.getCoffees = true

    await userStore.getUser()

    const response = (await supabase
      .from('coffees')
      .select(query || '*, roasters (title)')
      .eq('user_id', userStore.user.id)
      .order('name', { ascending: true })) as PostgrestSingleResponse<CoffeeRead[]>

    isLoading.getCoffees = false

    if (response.error) {
      throw new Error(`Error posting coffee: ${response.error.message}`)
    }

    return response.data || []
  }

  const getCoffeesTotalCount = async (): Promise<number> => {
    isLoading.getCoffeesTotalCount = true

    await userStore.getUser()

    const { count, error } = await supabase
      .from('coffees')
      .select('*', { count: 'exact', head: true }) // head: true → no rows returned, just count
      .eq('user_id', userStore.user.id)

    isLoading.getCoffeesTotalCount = false

    if (error) throw error

    return count || 0
  }

  return { isLoading, getCoffees, getCoffeesTotalCount }
})
