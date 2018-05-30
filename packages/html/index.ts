import {JSDOM} from 'jsdom'
import * as R from 'ramda'

const RR: any = R
const textNode = R.ifElse(
  R.isNil,
  R.F,
  R.converge(R.equals, [
    R.path(['firstChild', 'nodeType']),
    R.prop('TEXT_NODE')]))
const breathe = R.concat(RR.__, ', ') as any as (_: string) => string
const useless = R.compose(
  R.any(RR.__, ['html', 'head', 'body', 'figure', 'img', 'figcaption']) as any as (_: any) => boolean,
  R.equals)
const substitution = R.compose(
  breathe,
  R.cond([
    [R.equals('H3'), R.always('제목')],
    [R.equals('H4'), R.always('부제')]]))
const needReplace = R.compose(
  R.any(RR.__, ['H3', 'H4']) as any as (_: any) => boolean,
  R.equals,
  R.prop<keyof Node, Node>('nodeName'))
const replaceTag = R.cond([
  [needReplace, R.converge(R.concat, [
    R.compose(substitution, R.prop('nodeName')),
    R.prop('textContent')
  ])],
  [R.T, R.prop('textContent')]])

export const elements: (html: string) => Node[] = R.compose(
  Array.from,
  R.invoker(0, 'values'),
  R.invoker(1, 'querySelectorAll')('*'),
  RR.path(['window', 'document']),
  RR.construct(JSDOM)) as any
export const sanitize: (html: string) => string[] = R.compose(
  R.map(replaceTag),
  R.filter<string>(
    R.both(
      textNode,
      R.compose(
        R.not,
        useless,
        R.prop('nodeName')))) as any,
  elements)

