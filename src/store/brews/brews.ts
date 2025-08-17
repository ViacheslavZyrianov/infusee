import { defineStore } from 'pinia'
import supabase from '@/plugins/supabase.ts'
import type { BrewRead, BrewsLoading } from '@/store/brews/types.ts'
import type { PostgrestSingleResponse } from '@supabase/postgrest-js'
import dayjs from 'dayjs'
import { reactive } from 'vue'

export default defineStore('brews', () => {
  const isLoading: BrewsLoading = reactive({
    getBrews: true,
    getBrewsTodayCount: true,
  })

  const getBrews = async (): Promise<BrewRead[]> => {
    isLoading.getBrews = true

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not logged in')

    const response = (await supabase
      .from('brews')
      .select(
        'id, user_id, coffees (name), brew_method, rating_aroma, rating_flavor, rating_acidity, rating_bitterness, rating_sweetness, rating_body, rating_aftertaste, created_at',
      )
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })) as PostgrestSingleResponse<BrewRead[]>

    isLoading.getBrews = false

    if (response.error) {
      throw new Error(`Error fetching brews: ${response.error.message}`)
    }

    return response.data || []
  }

  const getBrewsTodayCount = async (): Promise<number> => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not logged in')

    const { count, error } = await supabase
      .from('brews')
      .select('*', { count: 'exact', head: true }) // head: true → no rows returned, just count
      .eq('user_id', user.id)
      .gte('created_at', dayjs().startOf('day').toISOString())
      .lte('created_at', dayjs().endOf('day').toISOString())

    if (error) throw error

    return count || 0
  }

  return { isLoading, getBrews, getBrewsTodayCount }
})
