import {sanitize} from './index'

const content = '<p>Monorepo? Yarn Workspace!</p><p>🌸 모노레포. Lerna? Yarn Worksapce!</p><h3>서론</h3>'
const h3 = '<h3>서론</h3>'
const h4 = '<h4>중론</h4>'
const p = '<p>🌸 모노레포. Lerna? Yarn Worksapce!</p>'
// const breath = '<p>숨쉬어  </p>'

describe('html', () => {
  describe('santitize', () => {
    it('length', () => {
      expect(sanitize(content).length).toEqual(3)
      expect(sanitize(h3).length).toEqual(1)
      expect(sanitize(p).length).toEqual(1)
    })
    it('content', () => {
      expect(sanitize(p)).toEqual(['🌸 모노레포. Lerna? Yarn Worksapce!'])
    })
    it('replace tag', () => {
      expect(sanitize(h3)).toEqual([`제목, 서론`])
      expect(sanitize(h4)).toEqual([`부제, 중론`])
      // expect(sanitize(breath)).toEqual([`숨쉬어.\n`])
    })
  })
})

