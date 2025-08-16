import type { TabBarItem } from '@/components/tab-bar/types'

const tabBarItems: TabBarItem[] = [
  { icon: 'mdi-view-dashboard-outline', path: '/dashboard' },
  { icon: 'mdi-list-box-outline', path: '/brews' },
  { icon: 'mdi-coffee-outline', path: '/coffees' },
  { icon: 'mdi-account-outline', path: '/profile' },
  { icon: 'mdi-cog-outline', path: '/settings' },
]

export default tabBarItems
