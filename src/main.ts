import { ViteSSG } from 'vite-ssg'
import { setupRouterScroller } from 'vue-router-better-scroller'
import NProgress from 'nprogress'
import App from './App.vue'
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

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
  },
  ({ router, isClient }) => {
    if (isClient) {
      setupRouterScroller(router, {
        selectors: {
          window: true,
        },
        behavior: 'auto',
      })

      router.beforeEach(() => {
        NProgress.start()
      })
      router.afterEach(() => {
        NProgress.done()
      })
    }
  },
)
