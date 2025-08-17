import { defineStore } from 'pinia'
import supabase from '@/plugins/supabase.ts'
import { reactive, type Ref, ref } from 'vue'
import type { CoffeeAndRoasterRead, CoffeeRead, CoffeesLoading } from '@/store/coffees/types.ts'
import type { PostgrestSingleResponse } from '@supabase/postgrest-js'

export default defineStore('coffees', () => {
  const coffees: Ref<CoffeeRead[]> = ref([])
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
      .order('name', { ascending: true })) as PostgrestSingleResponse<CoffeeAndRoasterRead[]>

    isLoading.getCoffees = false

    if (response.error) {
      throw new Error(`Error posting coffee: ${response.error.message}`)
    }

    return response.data || []
  }

  return { coffees, isLoading, getCoffees }
})
