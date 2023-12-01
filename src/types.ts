import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface Post {
  path: string
  title: string
  date: string
  id: string
  category: string
  tags: string
  sticky?: number
}
