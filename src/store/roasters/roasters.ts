import { defineStore } from 'pinia'
import supabase from '@/plugins/supabase.ts'
import type { RoasterRead } from '@/store/roasters/types'
import type { PostgrestSingleResponse } from '@supabase/postgrest-js'

export default defineStore('roasters', () => {
  const getRoasters = async (query?: string): Promise<RoasterRead[]> => {
    const { data, error } = (await supabase
      .from('roasters')
      .select(query || '*')
      .order('title', { ascending: true })) as PostgrestSingleResponse<RoasterRead[]>

    if (error) {
      throw new Error(`Error fetching roasters: ${error.message}`)
    }

    return data ?? []
  }

  return { getRoasters }
})
