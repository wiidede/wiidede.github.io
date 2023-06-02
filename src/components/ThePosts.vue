<script setup lang="ts">
interface Post {
  path: string
  title: string
  date: string
  id: string
  category: string
  tags: string
  sticky?: number
}

const route = useRoute()
const router = useRouter()
const routes = router.getRoutes().filter(i => i.meta?.isPost)

const currentCategory = computed({
  get: () => route.query.category as string || '',
  set: (value: string) => {
    router.push({
      query: {
        ...route.query,
        category: value || undefined,
      },
    })
  },
})
const categoryMap = new Map<string, number>()
const categoryList = computed(() => Array.from(categoryMap.entries()).sort((a, b) => b[1] - a[1]).map(category => category[0]))

const showTags = ref(!!route.query.tag)
const toggleTags = useToggle(showTags)

const currentTag = computed({
  get: () => route.query.tag as string || '',
  set: (value: string) => {
    router.push({
      query: {
        ...route.query,
        tag: value || undefined,
      },
    })
  },
})
const tagMap = new Map<string, number>()
const tagList = computed(() => Array.from(tagMap.entries()).sort((a, b) => b[1] - a[1]).map(tag => tag[0]))

const posts = routes.map((route) => {
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

const postsDisplay = computed(
  () => posts.filter(
    post => (!currentCategory.value ? true : currentCategory.value === post.category)
     && (!currentTag.value ? true : (Array.isArray(post.tags) && post.tags.includes(currentTag.value))),
  ),
)
const showYear = computed(() => postsDisplay.value.length > 9)

const getYear = (a: Date | string | number) => new Date(a).getFullYear()
const isFuture = (a?: Date | string | number) => a && new Date(a) > new Date()
function isSameGroup(a: Post, b?: Post) {
  if (!b)
    return false
  let aTag, bTag
  if (a.sticky)
    aTag = 'sticky'
  else if (isFuture(a.date))
    aTag = 'upcoming'
  else
    aTag = getYear(a.date)
  if (b.sticky)
    bTag = 'sticky'
  else if (isFuture(b.date))
    bTag = 'upcoming'
  else
    bTag = getYear(b.date)
  return aTag === bTag
}

function getGroupName(p: Post) {
  if (isFuture(p.date))
    return 'Upcoming'
  return getYear(p.date)
}

const inactiveStyle = 'opacity-40 hover:opacity-70 font-400'
const activeStyle = 'opacity-100 !font-600'
</script>

<template>
  <div
    class="mb2"
  >
    <span class="op60">Categories</span>
  </div>
  <div class="m-auto mb-2 flex flex-wrap select-none gap4 prose animate-none! op100!">
    <div
      v-for="category, idx in categoryList"
      :key="category"
      class="slide-enter"
      :style="{
        '--enter-stage': idx,
        '--enter-step': '90ms',
      }"
    >
      <div
        class="cursor-pointer"
        :class="currentCategory === category ? activeStyle : inactiveStyle"
        @click="() => { currentCategory = category }"
      >
        {{ category || 'All' }}
      </div>
    </div>
  </div>
  <div
    class="mb2 flex cursor-pointer items-center gap-2 op80"
    @click="toggleTags()"
  >
    <span class="op60">Tags</span>
    <div class="inline-block op60" :class="showTags ? 'i-carbon-chevron-up' : 'i-carbon-chevron-down'" />
  </div>
  <div v-show="showTags" class="m-auto mb-8 flex flex-wrap select-none gap4 prose animate-none! op100!">
    <div
      v-for="tag, idx in tagList"
      :key="tag"
      class="slide-enter"
      :style="{
        '--enter-stage': idx,
        '--enter-step': '16ms',
      }"
    >
      <div
        class="cursor-pointer"
        :class="currentTag === tag ? activeStyle : inactiveStyle"

        @click="() => { currentTag = tag }"
      >
        {{ tag || 'All' }}
      </div>
    </div>
  </div>
  <template v-if="!posts.length">
    <div op50>
      { nothing here yet }
    </div>
  </template>

  <template v-for="post, idx in postsDisplay" :key="`${post.path}_${currentCategory}`">
    <div
      v-if="showYear && !isSameGroup(post, postsDisplay[idx - 1])"
      slide-enter pointer-events-none relative h12 select-none
      :style="{
        '--enter-stage': idx + 4,
        '--enter-step': '60ms',
        '--enter-offset-step': '3ms',
        '--enter-offset-time': 20,
      }"
    >
      <span
        class="absolute left--3 top-0 text-6em font-bold line-height-[1] color-transparent text-stroke-2 text-stroke-hex-aaa op15"
      >{{ post.sticky ? 'PINNED' : getGroupName(post) }}</span>
    </div>
    <div
      class="slide-enter"
      :style="{
        '--enter-stage': idx + 4,
        '--enter-step': '60ms',
        '--enter-offset-step': '4ms',
        '--enter-offset-time': 15,
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
        <div class="no-underline" flex="~ col gap-2">
          <div class="title items-center text-lg leading-1.2em" flex="~ gap-2 wrap">
            <span>{{ post.title }}</span>
            <div v-if="post.sticky" i-carbon-pin class="text-0.8em op67" />
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
            <span ws-nowrap text-sm op60>
              {{ dayjs(post.date).format(showYear ? 'MM-DD' : 'YYYY-MM-DD') }}
            </span>
            <!-- <span v-if="route.duration" ws-nowrap text-sm op40>· {{ route.duration }}</span>
              <span v-if="route.platform" ws-nowrap text-sm op40>· {{ route.platform }}</span> -->
            <span v-if="currentCategory === ''" class="tag">{{ post.category }}</span>
            <span v-if="currentCategory === '' && post.tags?.length"> · </span>
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </component>
    </div>
  </template>
</template>
