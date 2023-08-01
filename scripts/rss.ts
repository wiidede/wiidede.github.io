import { dirname } from 'node:path'
import fg from 'fast-glob'
import fs from 'fs-extra'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import type { FeedOptions, Item } from 'feed'
import { Feed } from 'feed'

const DOMAIN = 'https://wiidede.space'
const AUTHOR = {
  name: 'wiidede',
  email: 'wiixdede@gmail.com',
  link: DOMAIN,
}
const markdown = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
})

async function run() {
  await buildBlogRSS()
}

async function buildBlogRSS() {
  const files = await fg('src/pages/posts/**/*.md')

  const options = {
    title: 'wiidede',
    description: 'wiidede\' Blog',
    id: 'https://wiidede.space',
    link: 'https://wiidede.space',
    copyright: 'CC BY-NC-SA 4.0 2020 © wiidede',
    feedLinks: {
      json: 'https://wiidede.space/feed.json',
      atom: 'https://wiidede.space/feed.atom',
      rss: 'https://wiidede.space/feed.xml',
    },
  }
  const posts: any[] = (
    await Promise.all(
      files.filter(i => !i.includes('index'))
        .map(async (i) => {
          const raw = await fs.readFile(i, 'utf-8')
          const { data, content } = matter(raw)

          const html = markdown.render(content)
            .replace('src="/', `src="${DOMAIN}/`)

          if (data.image?.startsWith('/'))
            data.image = DOMAIN + data.image

          return {
            ...data,
            date: new Date(data.date),
            content: html,
            author: [AUTHOR],
            link: DOMAIN + i.replace(/^pages(.+)\.md$/, '$1'),
          }
        }),
    ))
    .filter(Boolean)

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date))

  await writeFeed('feed', options, posts)
}

async function writeFeed(name: string, options: FeedOptions, items: Item[]) {
  options.author = AUTHOR
  options.image = 'https://wiidede.space/img-store-one/special/avatar.png'
  options.favicon = 'https://wiidede.space/img-store-one/special/blog-logo.png'

  const feed = new Feed(options)

  items.forEach(item => feed.addItem(item))
  // items.forEach(i=> console.log(i.title, i.date))

  await fs.ensureDir(dirname(`./public/${name}`))
  await fs.writeFile(`./public/${name}.xml`, feed.rss2(), 'utf-8')
  await fs.writeFile(`./public/${name}.atom`, feed.atom1(), 'utf-8')
  await fs.writeFile(`./public/${name}.json`, feed.json1(), 'utf-8')
}

run()
