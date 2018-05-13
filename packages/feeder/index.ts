import * as R from 'ramda'
import * as Feedly from './provider/feedly'
import {Subscription} from './abstract'

export async function subscriptions(providers: FeedServiceProvider[]): Promise<Subscription[]> {
  const get = R.compose(
    R.bind(Promise.all, Promise),
    R.map(
    R.compose<FeedServiceProvider, string, Promise<Subscription[]>>(
      Feedly.subscriptions,
      R.prop('token')
    )))
  const feeds = await get(providers)
  return R.flatten<Subscription>(feeds)
}

type Provider = 'feedly'

interface FeedServiceProvider {
  provider: Provider
  token: string
}
