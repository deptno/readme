import {JSDOM} from 'jsdom'
import * as R from 'ramda'

export function sanitize(html: string): string[] {
  const textNode = R.ifElse(
    R.isNil,
    R.F,
    R.converge(R.equals, [
      R.path(['firstChild', 'nodeType']),
      R.prop('TEXT_NODE')]))
  const breathe = R.concat(R.__, ', ') as any as (_: string) => string
  // const useless = (tag: string) => R.any(R.equals(tag), ['html', 'head', 'body', 'figure', 'img', 'figcaption'])
  const useless = R.compose(
    R.any(R.__, ['html', 'head', 'body', 'figure', 'img', 'figcaption']) as any as (_: any) => boolean,
    R.equals
  )
  const substitution = R.compose(
    breathe,
    R.cond([
      [R.equals('H3'), R.always('제목')],
      [R.equals('H4'), R.always('부제')]]))
  const needReplace = R.compose(
    R.any(R.__, ['H3', 'H4']) as any as (_: any) => boolean,
    R.equals,
    R.prop<keyof Node, Node>('nodeName'))
  const replaceTag = R.cond([
    [needReplace, (node: Node) => substitution(node.nodeName) + node.textContent],
    [R.T, (node: Node) => node.textContent]])

  return elements(html)
    .filter(textNode)
    .filter(R.compose(R.not, useless, R.prop('nodeName')))
    .map(replaceTag)
}

function elements(html: string): Node[] {
  const dom = new JSDOM(html)
  const elements = dom.window.document.querySelectorAll('*')

  return Array.from(elements.values())
}

