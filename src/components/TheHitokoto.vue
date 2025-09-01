<script lang="ts" setup>
import type { TypedOptions } from 'typed.js'
import { promiseTimeout } from '@vueuse/core'
import Typed from 'typed.js'

const props = withDefaults(defineProps<{
  delay?: number
}>(), {
  delay: 0,
})

interface Hitokoto {
  id: number
  uuid: string
  hitokoto: string
  type: string
  from: string
  from_who?: string
  creator: string
  creator_uid: number
  reviewer: number
  commit_from: string
  created_at: string
  length: number
}

const lightBg = [
  'linear-gradient(36deg, rgba(176,98,234,1) 0%, rgba(243,146,242,1) 40%, rgba(254,208,143,1) 70%, rgba(246,243,159,1) 100%)',
  'linear-gradient(72deg, rgba(250,134,190,1) 0%, rgba(162,117,227,1) 40%, rgba(154,235,237,1) 70%, rgba(255,252,171,1) 100%)',
  'linear-gradient(108deg, rgba(190,220,250,1) 0%, rgba(152,172,248,1) 40%, rgba(176,136,249,1) 70%, rgba(218,159,249,1) 100%)',
  'linear-gradient(144deg, rgba(101,193,140,1) 0%, rgba(193,244,197,1) 40%, rgba(255,190,216,1) 70%, rgba(255,123,169,1) 100%)',
  'linear-gradient(90deg, rgba(255,187,204,1) 0%, rgba(255,204,204,1) 40%, rgba(255,221,204,1) 70%, rgba(255,238,204,1) 100%)',
]
const darkBg = [
  'linear-gradient(36deg, rgba(26,26,64,1) 0%, rgba(39,0,130,1) 40%, rgba(122,11,192,1) 70%, rgba(250,88,182,1) 100%)',
  'linear-gradient(72deg, rgba(255,152,152,1) 0%, rgba(207,69,92,1) 40%, rgba(151,21,73,1) 70%, rgba(71,0,49,1) 100%)',
  'linear-gradient(108deg, rgba(27,31,58,1) 0%, rgba(83,53,74,1) 40%, rgba(166,73,66,1) 70%, rgba(255,120,68,1) 100%)',
  'linear-gradient(144deg, rgba(198,222,65,1) 0%, rgba(45,110,126,1) 40%, rgba(21,59,68,1) 70%, rgba(7,28,33,1) 100%',
]
const bgIndex = ref(Math.floor(Math.random() * 10))
const background = computed(() => !isDark.value ? darkBg[bgIndex.value % darkBg.length] : lightBg[bgIndex.value % lightBg.length])
let typed: InstanceType<typeof Typed>
const strings: string[] = ['愿你眼里有光，心中有爱❤️']
const typedOptions: TypedOptions = {
  typeSpeed: 80,
  backSpeed: 30,
  backDelay: 2000,
  contentType: 'null',
  loop: true,
  onLastStringBackspaced: () => {
    bgIndex.value += 1
  },
}
const { data, isFetching, execute } = useFetch('https://v1.hitokoto.cn', { immediate: false }).json<Hitokoto>()

async function getHitokoto() {
  if (typed)
    typed.stop()

  await execute()
  const dataValue = data.value
  if (!dataValue?.hitokoto) {
    typed.start()
    return
  }
  const hitokoto = dataValue.hitokoto
  const from = dataValue.from ? `《${dataValue.from}》` : ''
  const from_who = dataValue.from_who ? `${dataValue.from_who} ` : ''
  const from_text = (from || from_who) ? ` —— ${from_who}${from}` : ''
  const strings = [hitokoto + from_text]
  startTyped(strings)
}

function startTyped(strings: string[]) {
  if (typed)
    typed.destroy()

  bgIndex.value += 1
  typed = new Typed('#hitokoto', {
    strings,
    ...typedOptions,
  })
}

onMounted(async () => {
  await promiseTimeout(props.delay)
  startTyped(strings)
})

onUnmounted(() => {
  typed.destroy()
})
</script>

<template>
  <div class="flex items-center gap2 op50">
    <span i-carbon-circle-dash class="icon-btn text-0 op0 transition-all" :class="{ 'rotate text-4 !op100 pointer-events-none': isFetching }" />
    <span
      class="text min-w0 flex-auto cursor-pointer transition-opacity transition-duration-400"
      :class="{ op0: isFetching }"
      :style="{ backgroundImage: background }"
      @click="getHitokoto()"
    >
      <span id="hitokoto" />
    </span>
  </div>
</template>

<style scoped>
.rotate {
  animation: rotation 2s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

.text {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

:deep(.typed-cursor) {
  user-select: none;
}
</style>
