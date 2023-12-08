<script setup lang='ts'>
const { frontmatter } = defineProps({
  frontmatter: {
    type: Object,
    required: true,
  },
})

const route = useRoute()
const router = useRouter()
const content = ref<HTMLDivElement>()

const isLargeScreen = useMediaQuery('(min-width: 1024px)')

onMounted(() => {
  const handleAnchors = (
    event: MouseEvent & { target: HTMLElement },
  ) => {
    const link = event.target.closest('a')

    if (
      !event.defaultPrevented
      && link
      && event.button === 0
      && link.target !== '_blank'
      && link.rel !== 'external'
      && !link.download
      && !event.metaKey
      && !event.ctrlKey
      && !event.shiftKey
      && !event.altKey
    ) {
      const url = new URL(link.href)
      if (url.origin !== window.location.origin)
        return

      event.preventDefault()
      const { pathname, hash } = url
      if (hash && (!pathname || pathname === location.pathname)) {
        window.history.replaceState({}, '', hash)
        hashNavigate()
      }
      else {
        router.push({ path: pathname, hash })
      }
    }
  }

  useEventListener(window, 'hashchange', hashNavigate)
  useEventListener(content.value!, 'click', handleAnchors, { passive: false })

  hashNavigate()

  const tocEl = document.querySelector<HTMLDivElement>('.table-of-contents')
  const tocAnchorEl = document.querySelector<HTMLDivElement>('.table-of-contents-anchor')
  const tocUlEl = document.querySelector<HTMLUListElement>('.table-of-contents>ul')

  if (tocEl && tocAnchorEl && tocUlEl) {
    const showToc = () => {
      tocEl.classList.remove('ul-hidden')
      tocEl.classList.add('ul-show')
    }

    const hideToc = () => {
      tocEl.classList.remove('ul-show')
      tocEl.classList.add('ul-hidden')
    }

    tocAnchorEl.addEventListener('click', () => {
      if (tocEl.classList.contains('ul-show'))
        hideToc()
      else if (tocEl.classList.contains('ul-hidden'))
        showToc()
      else
        isLargeScreen.value ? hideToc() : showToc()
    })

    tocUlEl.addEventListener('click', (e) => {
      if (isLargeScreen.value)
        return
      if (e.target === tocUlEl)
        return
      hideToc()
    })

    watch(isLargeScreen, (val) => {
      if (tocEl.classList.contains('ul-show') || tocEl.classList.contains('ul-hidden'))
        val ? showToc() : hideToc()
    })
  }
})
</script>

<template>
  <div v-if="frontmatter.display ?? frontmatter.title" class="m-auto mb-8 text-left prose" :class="frontmatter.wrapperClass">
    <p
      v-if="frontmatter.date"
      class="slide-enter flex flex-wrap items-baseline gap2 opacity-50 !-mt-2"
    >
      {{ dayjs(frontmatter.date).format('YYYY-MM-DD') }}
      <template v-if="frontmatter.duration">
        <span>·</span>
        <span>{{ frontmatter.duration }}</span>
      </template>
      <template v-if="frontmatter.categories?.length">
        <span>·</span>
        <span>{{ frontmatter.categories.join(' ') }}</span>
      </template>
      <template v-if="frontmatter.tags?.length">
        <span>·</span>
        <span v-for="tag, idx in frontmatter.tags" :key="idx" class="mr2 tag">
          {{ tag }}
        </span>
      </template>
    </p>
    <p
      v-if="frontmatter.subtitle"
      class="slide-enter italic opacity-50 !-mt-6"
    >
      {{ frontmatter.subtitle }}
    </p>
  </div>
  <article ref="content">
    <!-- unocss compile: i-carbon-list -->
    <slot />
  </article>
  <TheGoBack />
  <TheFooter />
  <div class="article-progress" />
  <client-only>
    <div class="slide-enter mx-auto pt-4 prose animate-delay-800">
      <TheValine v-if="route.meta.isPost" />
    </div>
  </client-only>
</template>
