import {mp3} from 'speech'
import {writeFileSync} from 'fs'
import {getFeed} from '../feed'
import {sanitize} from '../html'

export default async function main(mediumId: string) {
  const {items} = await getFeed(mediumId)

  items.forEach(async feed => {
    const {title, 'content:encoded': content} = feed
    const santitized = sanitize(content)

    console.log('result')
    console.log(santitized)

    const stream = await mp3(santitized)
    writeFileSync(`${title}.mp3`, stream)
  })
}
