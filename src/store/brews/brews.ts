import { defineStore } from 'pinia'
import supabase from '@/plugins/supabase.ts'
import type { BrewRead, BrewsLoading } from '@/store/brews/types.ts'
import type { PostgrestSingleResponse } from '@supabase/postgrest-js'
import { reactive, ref, type Ref } from 'vue'
import useUserStore from '@/store/user/user.ts'
import useAlertStore from '@/store/alert/alert.ts'
import { AlertType } from '@/store/alert/types.ts'

export default defineStore('brews', () => {
  const alertStore = useAlertStore()
  const userStore = useUserStore()

  const isLoading: BrewsLoading = reactive({
    getBrews: true,
  })

  const brews: Ref<BrewRead[] | null> = ref(null)

  const getBrews = async () => {
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

    brews.value = data || []
  }

  return { isLoading, brews, getBrews }
})
