import * as fetch from 'isomorphic-fetch'
import {Subscription} from '../abstract'

namespace Feedly {
  const endpoint = 'http://cloud.feedly.com/v3/subscriptions'

  export async function subscriptions(token: string): Promise<FeedlySubscription[]> {
    try {
      const response = await fetch(endpoint, {headers: {Authorization: `OAuth ${token}`}})
      const subscriptions: FeedlySubscription[] = await response.json()
      return subscriptions.map(subscription => ({
        ...subscription,
        id: subscription.id.replace('feed/', '')
      }))
    } catch (ex) {
      console.error(ex)
      return []
    }
  }

  interface FeedlySubscription extends Subscription {
    id: string // 'feed/https://medium.com/feed/@deptno',
    title: string
    website: string
    categories: Category[]
    updated: number
    subscribers: number
    velocity: number
    topics?: string[]
    contentType?: string
    iconUrl?: string
    partial?: false,
    visualUrl?: string
    coverColor?: string
  }
  interface Category {
    id: string
    label: string
  }
}

export = Feedly
