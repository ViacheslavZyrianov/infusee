import { defineStore } from 'pinia'
import supabase from '@/plugins/supabase.ts'
import { reactive } from 'vue'
import type { CoffeeRead, CoffeesLoading } from '@/store/coffees/types.ts'
import type { PostgrestSingleResponse } from '@supabase/postgrest-js'

export default defineStore('coffees', () => {
  const isLoading: CoffeesLoading = reactive({
    getCoffees: true,
  })

  const getCoffees = async (query?: string): Promise<CoffeeRead[]> => {
    isLoading.getCoffees = true

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not logged in')

    const response = (await supabase
      .from('coffees')
      .select(query || '*, roasters (title)')
      .eq('user_id', user.id)
      .order('name', { ascending: true })) as PostgrestSingleResponse<CoffeeRead[]>

    isLoading.getCoffees = false

    if (response.error) {
      throw new Error(`Error posting coffee: ${response.error.message}`)
    }

    return response.data || []
  }

  return { isLoading, getCoffees }
})
