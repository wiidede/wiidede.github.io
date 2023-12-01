import { createRouterScroller } from 'vue-router-better-scroller'
import type { UserModule } from '~/types'

export const install: UserModule = ({ app, isClient }) => {
  if (isClient) {
    app.use(createRouterScroller({
      selectors: {
        window: true,
      },
    }))
  }
}
