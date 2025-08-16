import { defineStore } from 'pinia'
import supabase from '@/plugins/supabase.ts'
import { type Ref, ref } from 'vue'
import type { BrewRead } from '@/store/brews/types.ts'
import type { PostgrestSingleResponse } from '@supabase/postgrest-js'
import dayjs from 'dayjs'

export default defineStore('brews', () => {
  const brews: Ref<BrewRead[]> = ref([])

  const getBrews = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not logged in')

    const response = (await supabase
      .from('brews')
      .select(
        'id, user_id, coffee_id, brew_method, roaster, rating_aroma, rating_flavor, rating_acidity, rating_bitterness, rating_sweetness, rating_body, rating_aftertaste, created_at',
      )
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })) as PostgrestSingleResponse<BrewRead[]>

    if (response.error) {
      throw new Error(`Error posting brew: ${response.error.message}`)
    }

    brews.value = response.data || []
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

  return { brews, getBrews, getBrewsTodayCount }
})
