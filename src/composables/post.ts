import type { Post } from '~/types'

let posts: Post[]
const categoryMap = new Map<string, number>()
const tagMap = new Map<string, number>()

export function usePosts() {
  if (!posts) {
    const router = useRouter()
    const routes = router.getRoutes().filter(i => i.meta?.isPost)

    posts = routes.map((route) => {
      const matter = route.meta?.frontmatter as any
      if (!matter?.date) {
        console.error(`Frontmatter error in ${route.path}: `, matter)
        matter.date = new Date(0).toISOString()
      }
      const category = matter?.categories?.[0]
      const tags = matter?.tags
      if (category) {
        categoryMap.set('', (categoryMap.get('') || 0) + 1)
        categoryMap.set(category, (categoryMap.get(category) || 0) + 1)
      }
      if (Array.isArray(tags)) {
        tags.forEach((tag: string) => {
          tagMap.set('', (tagMap.get('') || 0) + 1)
          tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
        })
      }

      return {
        path: route.path,
        title: matter.title,
        date: matter.date,
        id: matter.id,
        category,
        tags,
        sticky: matter.sticky,
      } as Post
    }).sort((a, b) => {
      if (a.sticky && b.sticky)
        return a.sticky - b.sticky
      if (a.sticky)
        return -1
      if (b.sticky)
        return 1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }

  return {
    posts,
    categoryMap,
    tagMap,
  }
}
