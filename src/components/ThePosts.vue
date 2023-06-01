<script setup lang="ts">
interface Post {
  path: string
  title: string
  date: string
  id: string
  categories: string
  tags: string
}

const router = useRouter()
const routes = router.getRoutes().filter(i => i.meta?.isPost)
const posts = routes.map((route) => {
  const matter = route.meta?.frontmatter as Omit<Post, 'path'>
  if (!matter?.date) {
    console.error(`Frontmatter error in ${route.path}: `, matter)
    matter.date = new Date(0).toISOString()
  }
  return {
    path: route.path,
    title: matter.title,
    date: matter.date,
    id: matter.id,
    categories: matter.categories,
    tags: matter.tags,
  } as Post
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const getYear = (a: Date | string | number) => new Date(a).getFullYear()
const isFuture = (a?: Date | string | number) => a && new Date(a) > new Date()
const isSameYear = (a?: Date | string | number, b?: Date | string | number) => a && b && getYear(a) === getYear(b)
function isSameGroup(a: Post, b?: Post) {
  return (isFuture(a.date) === isFuture(b?.date)) && isSameYear(a.date, b?.date)
}

function getGroupName(p: Post) {
  if (isFuture(p.date))
    return 'Upcoming'
  return getYear(p.date)
}
</script>

<template>
  <ul>
    <template v-if="!posts.length">
      <div py2 op50>
        { nothing here yet }
      </div>
    </template>

    <template v-for="route, idx in posts" :key="route.path">
      <div
        v-if="!isSameGroup(route, posts[idx - 1])"
        slide-enter pointer-events-none relative h20 select-none
        :style="{
          '--enter-stage': idx - 2,
          '--enter-step': '60ms',
        }"
      >
        <span absolute left--3rem top--2rem text-8em font-bold color-transparent text-stroke-2 text-stroke-hex-aaa op10>{{ getGroupName(route) }}</span>
      </div>
      <div
        class="slide-enter"
        :style="{
          '--enter-stage': idx,
          '--enter-step': '60ms',
        }"
      >
        <component
          :is="route.path.includes('://') ? 'a' : 'RouterLink'"
          v-bind="
            route.path.includes('://') ? {
              href: route.path,
              target: '_blank',
              rel: 'noopener noreferrer',
            } : {
              to: route.path,
            }
          "
          class="item mb-6 mt-2 block font-normal no-underline"
        >
          <li class="no-underline" flex="~ col md:row gap-2 md:items-center">
            <div class="title text-lg leading-1.2em" flex="~ gap-2 wrap">
              <span
                flex-none align-middle
                class="my-auto ml--12 mr2 hidden rounded bg-zinc:15 px-1 py-0.5 text-xs text-zinc5 md:block"
              >中文</span>
              <span align-middle>{{ route.title }}</span>
            </div>

            <div flex="~ gap-2 items-center">
              <!-- <span
                v-if="route.inperson"

                i-ri:group-2-line flex-none align-middle op50
                title="In person"
              />
              <span
                v-if="route.recording || route.video"

                i-ri:film-line flex-none align-middle op50
                title="Provided in video"
              />
              <span
                v-if="route.radio"

                i-ri:radio-line flex-none align-middle op50
                title="Provided in radio"
              /> -->
              <span ws-nowrap text-sm op50>
                {{ dayjs(route.date).format('YYYY-MM-DD') }}
              </span>
              <!-- <span v-if="route.duration" ws-nowrap text-sm op40>· {{ route.duration }}</span>
              <span v-if="route.platform" ws-nowrap text-sm op40>· {{ route.platform }}</span> -->
              <span
                flex-none align-middle
                class="my-auto rounded bg-zinc:15 px-1 py-0.5 text-xs text-zinc5 md:hidden"
              >中文</span>
            </div>
          </li>
        </component>
      </div>
    </template>
  </ul>
</template>
