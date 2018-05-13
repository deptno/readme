import * as fetch from 'jest-fetch-mock'
import {subscriptions} from './index'

describe('feeder', () => {
  describe('provider', () => {
    beforeEach(() => fetch.resetMocks())

    it('subscriptions', async done => {
      fetch.mockResponseOnce(JSON.stringify(d))
      const feeds = await subscriptions([{
        provider: 'feedly',
        token   : ''
      }])
      expect(feeds).toHaveProperty('length')
      done()
    })
  })
})

const d = [
  {
    id         : 'https://medium.com/feed/@deptno',
    title      : 'Stories by 이봉 on Medium',
    website    : 'https://medium.com/@deptno?source=rss-14055950d15b------2',
    categories : [[Object]],
    updated    : 1525952681433,
    subscribers: 6,
    velocity   : 2
  },
  {
    id         : 'http://blogs.msdn.com/b/typescript/rss.aspx',
    title      : 'TypeScript',
    website    : 'https://blogs.msdn.microsoft.com/typescript',
    categories : [[Object]],
    updated    : 1522169477139,
    subscribers: 3506,
    velocity   : 0.2,
    topics     : ['programming', 'javascript', 'development', 'tech'],
    contentType: 'longform',
    iconUrl    : 'https://storage.googleapis.com/site-assets/tGh6YiMbE-H30yfRptqlt7VHw9icPd9FgARWZR-41ww_sicon-1614b416ec6',
    partial    : false,
    visualUrl  : 'https://storage.googleapis.com/site-assets/tGh6YiMbE-H30yfRptqlt7VHw9icPd9FgARWZR-41ww_svisual-1614b416ec6'
  },
]