<script setup lang="ts">
import type { Post } from '~/types'

const props = defineProps<{
  pinned?: boolean
}>()

const route = useRoute()
const router = useRouter()

const {
  posts,
  categoryMap,
  tagMap,
} = usePosts()

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
const tagList = computed(() => Array.from(tagMap.entries()).sort((a, b) => b[1] - a[1]).map(tag => tag[0]))

const postsPinnedLength = computed(() => posts.filter(post => post.sticky).length)
const postsDisplay = computed(
  () => posts.filter(
    (post, index) => (!currentCategory.value ? true : currentCategory.value === post.category)
     && (!currentTag.value ? true : (Array.isArray(post.tags) && post.tags.includes(currentTag.value)))
     && (props.pinned ? (index < postsPinnedLength.value + 3) : true),
  ),
)
const showYear = computed(() => props.pinned || postsDisplay.value.length > 9)

const getYear = (a: Date | string | number) => new Date(a).getFullYear()
const isFuture = (a?: Date | string | number) => a && new Date(a) > new Date()
function isSameGroup(a: Post, b?: Post) {
  if (!b)
    return false
  return getGroupName(a) === getGroupName(b)
}

function getGroupName(p: Post) {
  let tag
  if (p.sticky)
    tag = 'PINNED'
  else if (props.pinned && !p.sticky)
    tag = 'RECENT'
  else if (isFuture(p.date))
    tag = 'UPCOMING'
  else
    tag = getYear(p.date)
  return tag
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
  <template v-if="!pinned">
    <div
      class="mb2"
    >
      <span>分类</span>
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
      <span>标签</span>
      <div
        class="i-carbon-chevron-down inline-block op60 transition-transform duration-400"
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
  </template>
  <template v-if="!posts.length">
    <div op50>
      { nothing here yet }
    </div>
  </template>

  <div class="absolute right-0 z--1 rd bg-zinc:10 transition-all duration-200" :style="bgStyle" />

  <template v-for="post, idx in postsDisplay" :key="`${post.path}_${currentCategory}`">
    <div
      v-if="showYear && !isSameGroup(post, postsDisplay[idx - 1])"
      class="slide-enter pointer-events-none relative h10 select-none md:h12"
      :style="{
        '--enter-stage': idx + 4,
      }"
    >
      <span
        class="absolute left--3 top-0 text-5em font-bold line-height-[1] color-transparent text-stroke-2 text-stroke-zinc-5 op20 md:text-6em"
      >{{ getGroupName(post) }}</span>
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
        class="group block py-3 font-normal no-underline transition after:hidden before:hidden !b-b-0"
      >
        <div class="no-underline" flex="~ col gap-1">
          <div flex="~ gap-2 wrap" class="w-fit items-center text-lg leading-1.2em">
            <span class="under-anime group-hover:under-anime-hover">{{ post.title }}</span>
            <div v-if="post.sticky" i-carbon-pin class="text-0.8em op67" />
          </div>

          <div flex="~ gap-2 items-center wrap" class="op67 transition-all duration-200 group-hover:op80">
            <span ws-nowrap text-sm>
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

  <a
    v-if="pinned"
    href="/posts"
    class="group w-fit w-fit flex cursor-pointer items-center gap2 font-mono under-anime under-base hover:under-anime-hover !op67"
  >
    更多
    <div i-carbon-chevron-right class="back-icon text-0.8em transition-all duration-250 group-hover:(mr2 translate-x-2)" />
  </a>
</template>
