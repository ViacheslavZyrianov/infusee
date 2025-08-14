import type { TabBarItem } from '@/components/tab-bar/types'

const tabBarItems: TabBarItem[] = [
  { icon: 'mdi-view-dashboard-outline', path: '/dashboard' },
  { icon: 'mdi-coffee-outline', path: '/brews' },
  { icon: 'mdi-account-outline', path: '/profile' },
  { icon: 'mdi-cog-outline', path: '/settings' },
]

export default tabBarItems
