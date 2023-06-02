<script setup lang='ts'>
const { frontmatter } = defineProps({
  frontmatter: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const content = ref<HTMLDivElement>()

onMounted(() => {
  const navigate = () => {
    if (location.hash) {
      document.querySelector(decodeURIComponent(location.hash))
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
        navigate()
      }
      else {
        router.push({ path: pathname, hash })
      }
    }
  }

  useEventListener(window, 'hashchange', navigate)
  useEventListener(content.value!, 'click', handleAnchors, { passive: false })

  navigate()
  setTimeout(navigate, 500)
})
</script>

<template>
  <div v-if="frontmatter.display ?? frontmatter.title" class="m-auto mb-8 text-left prose" :class="frontmatter.wrapperClass">
    <p
      v-if="frontmatter.date"
      class="slide-enter opacity-50 !-mt-2"
    >
      {{ dayjs(frontmatter.date).format('YYYY-MM-DD') }}
      <span v-if="frontmatter.duration"> · {{ frontmatter.duration }}</span>
      <span v-if="frontmatter.categories?.length"> · {{ frontmatter.categories.join(' ') }}</span>
      <span v-if="frontmatter.tags?.length"> · {{ frontmatter.tags.join(' ') }}</span>
    </p>
    <p
      v-if="frontmatter.subtitle"
      class="slide-enter italic opacity-50 !-mt-6"
    >
      {{ frontmatter.subtitle }}
    </p>
  </div>
  <article ref="content">
    <slot />
  </article>
  <TheGoBack level />
</template>
