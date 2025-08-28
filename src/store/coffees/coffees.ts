import { defineStore } from 'pinia'
import supabase from '@/plugins/supabase.ts'
import { reactive, ref, type Ref } from 'vue'
import type { CoffeeRead, CoffeesLoading } from '@/store/coffees/types.ts'
import type { PostgrestSingleResponse } from '@supabase/postgrest-js'
import useUserStore from '@/store/user/user.ts'
import useAlertStore from '@/store/alert/alert.ts'
import { AlertType } from '@/store/alert/types.ts'

export default defineStore('coffees', () => {
  const alertStore = useAlertStore()

  const coffees: Ref<CoffeeRead[] | null> = ref(null)
  const coffeesTotalCount: Ref<number | null> = ref(null)

  const isLoading: CoffeesLoading = reactive({
    getCoffees: true,
    getCoffeesTotalCount: true,
  })

  const userStore = useUserStore()

  const getCoffees = async (query?: string) => {
    isLoading.getCoffees = true

    await userStore.getUser()

    const { data, error } = (await supabase
      .from('coffees')
      .select(query || '*, roasters (title)')
      .eq('user_id', userStore.user.id)
      .order('name', { ascending: true })) as PostgrestSingleResponse<CoffeeRead[]>

    isLoading.getCoffees = false

    if (error) {
      alertStore.show(`Error fetching coffees: ${error.message}`, AlertType.Error)
    }

    coffees.value = data || []
  }

  const getCoffeesTotalCount = async () => {
    isLoading.getCoffeesTotalCount = true

    await userStore.getUser()

    const { count, error } = await supabase
      .from('coffees')
      .select('*', { count: 'exact', head: true }) // head: true → no rows returned, just count
      .eq('user_id', userStore.user.id)

    isLoading.getCoffeesTotalCount = false

    if (error) {
      alertStore.show(`Error fetching coffees total count: ${error.message}`, AlertType.Error)
    }

    coffeesTotalCount.value = count || 0
  }

  return { isLoading, coffees, coffeesTotalCount, getCoffees, getCoffeesTotalCount }
})
