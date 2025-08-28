import { defineStore } from 'pinia'
import supabase from '@/plugins/supabase.ts'
import dayjs from 'dayjs'
import useUserStore from '@/store/user/user.ts'
import useAlertStore from '@/store/alert/alert.ts'
import { AlertType } from '@/store/alert/types.ts'
import { ref, type Ref } from 'vue'

export default defineStore('dashboard', () => {
  const alertStore = useAlertStore()
  const userStore = useUserStore()

  const brewsWeeklyCount: Ref<number[] | null> = ref(null)

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

  const getBrewsWeeklyCount = async () => {
    await userStore.getUser()

    const getWeekBounds = () => {
      const now = new Date()
      const day = now.getDay() // 0 = Sunday, 1 = Monday ...
      const diffToMonday = (day + 6) % 7 // how many days to go back to Monday
      const monday = new Date(now)
      monday.setDate(now.getDate() - diffToMonday)
      monday.setHours(0, 0, 0, 0)

      const sunday = new Date(monday)
      sunday.setDate(monday.getDate() + 6)
      sunday.setHours(23, 59, 59, 999)

      return { monday, sunday }
    }

    const { monday, sunday } = getWeekBounds()

    const { data, error } = await supabase
      .from('brews')
      .select('created_at')
      .eq('user_id', userStore.user.id)
      .gte('created_at', monday.toISOString())
      .lte('created_at', sunday.toISOString())

    if (error) {
      alertStore.show(`Error fetching brews today count: ${error.message}`, AlertType.Error)
    }

    const counts = Array(7).fill(0)

    if (!error && data) {
      data.forEach((row: { created_at: string }) => {
        const date = new Date(row.created_at)
        const day = date.getDay() // 0 = Sunday
        const index = (day + 6) % 7 // shift so Monday = 0
        counts[index]++
      })
    }

    brewsWeeklyCount.value = counts
  }

  return {
    brewsWeeklyCount,
    getBrewsTodayCount,
    getBrewsWeeklyCount,
  }
})
