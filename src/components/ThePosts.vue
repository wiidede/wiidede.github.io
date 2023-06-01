<script setup lang="ts">
interface Post {
  path: string
  title: string
  date: string
  id: string
  category: string
  tags: string
}

const router = useRouter()
const routes = router.getRoutes().filter(i => i.meta?.isPost)

const currentCategory = ref('')
const categoryMap = new Map<string, number>()
const categoryList = computed(() => Array.from(categoryMap.entries()).sort((a, b) => b[1] - a[1]).map(category => category[0]))

const posts = routes.map((route) => {
  const matter = route.meta?.frontmatter as any
  if (!matter?.date) {
    console.error(`Frontmatter error in ${route.path}: `, matter)
    matter.date = new Date(0).toISOString()
  }
  const category = matter?.categories?.[0]
  if (category) {
    categoryMap.set('', (categoryMap.get('') || 0) + 1)
    categoryMap.set(category, (categoryMap.get(category) || 0) + 1)
  }

  return {
    path: route.path,
    title: matter.title,
    date: matter.date,
    id: matter.id,
    category,
    tags: matter.tags,
  } as Post
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const postsDisplay = computed(() => posts.filter(post => currentCategory.value === '' ? true : currentCategory.value === post.category))

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

const inactiveStyle = 'opacity-20 hover:opacity-50 font-400'
const activeStyle = 'opacity-100 !font-600'
</script>

<template>
  <div class="m-auto mb-8 flex select-none gap4 prose animate-none! op100!">
    <div
      v-for="filter in categoryList"
      :key="filter"
      class="cursor-pointer"
      :class="currentCategory === filter ? activeStyle : inactiveStyle"
      @click="() => { currentCategory = filter }"
    >
      {{ filter || 'All' }}
    </div>
  </div>
  <ul>
    <template v-if="!posts.length">
      <div py2 op50>
        { nothing here yet }
      </div>
    </template>

    <template v-for="post, idx in postsDisplay" :key="`${post.path}_${currentCategory}`">
      <div
        v-if="currentCategory === '' && !isSameGroup(post, postsDisplay[idx - 1])"
        slide-enter pointer-events-none relative h20 select-none
        :style="{
          '--enter-stage': idx - 2,
          '--enter-step': '60ms',
        }"
      >
        <span absolute left--3rem top--2rem text-8em font-bold color-transparent text-stroke-2 text-stroke-hex-aaa op10>{{ getGroupName(post) }}</span>
      </div>
      <div
        class="slide-enter"
        :style="{
          '--enter-stage': idx,
          '--enter-step': '60ms',
        }"
      >
        <component
          :is="post.path.includes('://') ? 'a' : 'RouterLink'"
          v-bind="
            post.path.includes('://') ? {
              href: post.path,
              target: '_blank',
              rel: 'noopener noreferrer',
            } : {
              to: post.path,
            }
          "
          class="item mb-6 mt-2 block font-normal no-underline"
        >
          <li class="no-underline" flex="~ col gap-2">
            <div class="title text-lg leading-1.2em" flex="~ gap-2 wrap">
              <span align-middle>{{ post.title }}</span>
            </div>

            <div flex="~ gap-2 items-center wrap">
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
                {{ dayjs(post.date).format('YYYY-MM-DD') }}
              </span>
              <!-- <span v-if="route.duration" ws-nowrap text-sm op40>· {{ route.duration }}</span>
              <span v-if="route.platform" ws-nowrap text-sm op40>· {{ route.platform }}</span> -->
              <span v-if="currentCategory === ''" class="tag">{{ post.category }}</span>
              <span v-if="post.tags.length"> · </span>
              <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </li>
        </component>
      </div>
    </template>
  </ul>
</template>
