import {mp3} from 'speech'
import * as fs from 'fs'
import {getFeed} from '../feed'
import {sanitize} from '../html'
import * as filenamify from 'filenamify'
import {promisify} from 'util'
import * as R from 'ramda'

const writeFile = promisify(fs.writeFile)
const split1500 = (texts: string[]): string[] => {
  return texts.reduce((ret, curr, index, array) => {
    const lastIndex = R.length(ret) - 1
    const total = R.add(ret[lastIndex].length, curr.length)

    if (total > 1500) {
      ret.push(curr)
    } else {
      ret[lastIndex] += curr
    }
    return ret
  }, [''])
}

export default async function main(mediumId: string, index?: number) {
  const {items} = await getFeed(mediumId)
  const feeds = typeof index === 'number'
    ? items.slice(index, index + 1)
    : items

  await Promise.all(
    feeds.map(feed => {
      const {title, 'content:encoded': content} = feed
      const santitized = sanitize(content)
      const fileName = filenamify(title)

      console.log(santitized.length, 'chunks')

      return Promise.all(split1500(santitized).map(async (chunk, index) => {
        const mp3FileName = `${fileName}-${index}.mp3`
        const stream = await mp3(chunk)

        await writeFile(mp3FileName, stream)
        console.log('created:', mp3FileName)
      }))
    })
  )

  console.log('done!')
}
