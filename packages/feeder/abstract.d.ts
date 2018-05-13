export interface Subscription {
  id: string // 'feed/https://medium.com/feed/@deptno',
  title: string
  website: string
  categories: any
  updated: number
  subscribers: number
  velocity: number
}
