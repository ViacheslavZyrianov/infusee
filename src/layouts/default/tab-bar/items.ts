import type { TabBarItem } from '@/layouts/default/tab-bar/types'

const tabBarItems: TabBarItem[] = [
  { icon: 'mdi-view-dashboard-outline', path: '/dashboard' },
  { icon: 'mdi-list-box-outline', path: '/brews' },
  { icon: 'mdi-coffee-outline', path: '/coffees' },
  { icon: 'mdi-fire', path: '/roasters' },
]

export default tabBarItems
