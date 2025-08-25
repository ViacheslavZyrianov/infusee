import { defineStore } from 'pinia'
import supabase from '@/plugins/supabase.ts'
import type { BrewRead, BrewsLoading } from '@/store/brews/types.ts'
import type { PostgrestSingleResponse } from '@supabase/postgrest-js'
import dayjs from 'dayjs'
import { reactive } from 'vue'
import useUserStore from '@/store/user/user.ts'
import useAlertStore from '@/store/alert/alert.ts'
import { AlertType } from '@/store/alert/types.ts'

export default defineStore('brews', () => {
  const alertStore = useAlertStore()

  const isLoading: BrewsLoading = reactive({
    getBrews: true,
    getBrewsTodayCount: true,
  })

  const userStore = useUserStore()

  const getBrews = async (): Promise<BrewRead[]> => {
    isLoading.getBrews = true

    await userStore.getUser()

    const { data, error } = (await supabase
      .from('brews')
      .select(
        'id, user_id, coffees (name), brew_method, rating_aroma, rating_flavor, rating_acidity, rating_bitterness, rating_sweetness, rating_body, rating_aftertaste, created_at',
      )
      .eq('user_id', userStore.user.id)
      .order('created_at', { ascending: false })) as PostgrestSingleResponse<BrewRead[]>

    isLoading.getBrews = false

    if (error) {
      alertStore.show(`Error fetching brews: ${error.message}`, AlertType.Error)
    }

    return data || []
  }

  const getBrewsTodayCount = async (): Promise<number> => {
    await userStore.getUser()

    const { count, error } = await supabase
      .from('brews')
      .select('*', { count: 'exact', head: true }) // head: true → no rows returned, just count
      .eq('user_id', userStore.user.id)
      .gte('created_at', dayjs().startOf('day').toISOString())
      .lte('created_at', dayjs().endOf('day').toISOString())

    if (error) {
      alertStore.show(`Error fetching brews today count: ${error.message}`, AlertType.Error)
    }

    return count || 0
  }

  return { isLoading, getBrews, getBrewsTodayCount }
})
