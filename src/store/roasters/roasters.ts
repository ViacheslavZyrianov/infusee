import { defineStore } from 'pinia'
import { reactive } from 'vue'
import supabase from '@/plugins/supabase.ts'
import type { RoasterRead, RoastersLoading } from '@/store/roasters/types'
import type { PostgrestSingleResponse } from '@supabase/postgrest-js'

export default defineStore('roasters', () => {
  const isLoading: RoastersLoading = reactive({
    getRoasters: true,
  })

  const getRoasters = async (query?: string): Promise<RoasterRead[]> => {
    isLoading.getRoasters = true

    const { data, error } = (await supabase
      .from('roasters')
      .select(query || '*')
      .order('title', { ascending: true })) as PostgrestSingleResponse<RoasterRead[]>

    isLoading.getRoasters = false

    if (error) {
      throw new Error(`Error fetching roasters: ${error.message}`)
    }

    return data ?? []
  }

  return { isLoading, getRoasters }
})
