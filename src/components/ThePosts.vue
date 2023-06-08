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

const bgStyle = reactive({
  top: '0',
  left: '0',
  height: '0',
  width: '0',
  opacity: '0 !important',
})
function handleBgIn(evt: Event) {
  const target = evt.target as HTMLElement
  const parent = target.parentElement
  if (!parent)
    return
  parent.style.position = 'relative'
  const rect = target.getBoundingClientRect()
  const parentRect = parent.getBoundingClientRect()
  bgStyle.left = `${rect.left - parentRect.left - 5}px`
  bgStyle.top = `${rect.top - parentRect.top}px`
  bgStyle.width = `${rect.width + 10}px`
  bgStyle.height = `${rect.height}px`
  bgStyle.opacity = '1 !important'
}

function handleBgOut() {
  bgStyle.opacity = '0 !important'
}
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
        '--enter-offset-step': '10ms',
        '--enter-offset-time': 9,
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
    <div
      class="i-carbon-chevron-down inline-block op60 transition-transform transition-duration-400"
      :class="{ 'scale-y--100': showTags }"
    />
  </div>
  <div v-show="showTags" class="m-auto mb-8 flex flex-wrap select-none gap4 prose animate-none! op100!">
    <div
      v-for="tag, idx in tagList"
      :key="tag"
      class="slide-enter"
      :style="{
        '--enter-stage': idx,
        '--enter-step': '20ms',
        '--enter-offset-step': '0.5ms',
        '--enter-offset-time': 40,
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

  <div class="absolute right-0 rd bg-zinc:10 transition-all transition-duration-200" :style="bgStyle" />

  <template v-for="post, idx in postsDisplay" :key="`${post.path}_${currentCategory}`">
    <div
      v-if="showYear && !isSameGroup(post, postsDisplay[idx - 1])"
      slide-enter pointer-events-none relative h12 select-none
      :style="{
        '--enter-stage': idx + 4,
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
      }"
      @mouseenter="handleBgIn"
      @mouseleave="handleBgOut"
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
        class="item block py-3 font-normal no-underline"
      >
        <div class="no-underline" flex="~ col gap-1">
          <div class="title items-center text-lg leading-1.2em" flex="~ gap-2 wrap">
            <span>{{ post.title }}</span>
            <div v-if="post.sticky" i-carbon-pin class="text-0.8em op67" />
          </div>

          <div flex="~ gap-2 items-center wrap">
            <span ws-nowrap text-sm op60>
              {{ dayjs(post.date).format(showYear ? 'MM-DD' : 'YYYY-MM-DD') }}
            </span>
            <span v-if="currentCategory === ''" class="tag">{{ post.category }}</span>
            <span v-if="currentCategory === '' && post.tags?.length"> · </span>
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </component>
    </div>
  </template>
</template>
