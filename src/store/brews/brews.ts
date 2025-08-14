import { defineStore } from 'pinia'
import supabase from '@/plugins/supabase.ts'
import { ref } from 'vue'

export default defineStore('brews', () => {
  const brews = ref([])

  const getBrews = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not logged in')

    const { data, error } = await supabase
      .from('brews')
      .select(
        'id, user_id, name, brew_method, country, roaster, rating_aroma, rating_flavor, rating_acidity, rating_bitterness, rating_sweetness, rating_body, rating_aftertaste, created_at',
      )
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Error posting brew: ${error.message}`)
    }

    brews.value = data || []
  }

  return { brews, getBrews }
})
