import { defineStore } from 'pinia'
import supabase from '@/plugins/supabase.ts'
import { type Ref, ref } from 'vue'
import type { CoffeeRead } from '@/store/coffees/types.ts'
import type { PostgrestSingleResponse } from '@supabase/postgrest-js'

export default defineStore('coffees', () => {
  const coffees: Ref<CoffeeRead[]> = ref([])

  const getCoffees = async (query?: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not logged in')

    const response = (await supabase
      .from('coffees')
      .select(query || '*')
      .eq('user_id', user.id)
      .order('name', { ascending: true })) as PostgrestSingleResponse<CoffeeRead[]>

    if (response.error) {
      throw new Error(`Error posting coffee: ${response.error.message}`)
    }

    coffees.value = response.data || []
  }

  return { coffees, getCoffees }
})
