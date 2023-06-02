import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import type { UserModule } from './types'
import routes from '~pages'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

routes.forEach((route) => {
  const match = route.path.match(/^\/posts\/.*\/(.*)$/)
  if (match) {
    route.path = `/${match[1]}`
    if (route.meta)
      route.meta.isPost = true
    else
      console.error(`Route ${route.path} has no meta`)
  }
})

const topMap = new Map<string, number>()

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        document.documentElement.scrollTo({ top: 0 })
        return { top: topMap.get(to.path) || 0, behavior: 'smooth' }
      }
      else {
        return { top: 0 }
      }
    },
  },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    ctx.router.beforeEach((to, from) => {
      topMap.set(from.path, document.documentElement.scrollTop)
    })
    // ctx.app.use(Previewer)
  },
)
