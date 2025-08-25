import { defineStore } from 'pinia'
import { reactive } from 'vue'
import supabase from '@/plugins/supabase.ts'
import type { RoasterRead, RoastersLoading } from '@/store/roasters/types'
import type { PostgrestSingleResponse } from '@supabase/postgrest-js'
import { AlertType } from '@/store/alert/types.ts'
import useAlertStore from '@/store/alert/alert.ts'

export default defineStore('roasters', () => {
  const alertStore = useAlertStore()

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
      alertStore.show(`Error fetching roasters: ${error.message}`, AlertType.Error)
    }

    return data ?? []
  }

  return { isLoading, getRoasters }
})
