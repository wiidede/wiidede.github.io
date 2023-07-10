<script lang="ts" setup>
const showHeader = inject(ProvideShowHeaderKey)
const showBg = inject(ProvideShowBgKey)

showHeader && (showHeader.value = false)
showBg && (showBg.value = false)

const skills = [
  { label: 'Vue 3', value: 90 },
  { label: 'Element Plus', value: 95 },
  { label: 'Typescript', value: 70 },
  { label: 'Vite', value: 75 },
  { label: 'React', value: 30 },
  { label: 'Python', value: 20 },
  { label: 'TensorFlow', value: 18 },
]

const contributions = [
  { name: 'element-plus', count: 4, owner: 'element-plus', ownerId: 68583457 },
  { name: 'pdf2docx', count: 1, owner: 'dothinking', ownerId: 13885442 },
]

const personalities = [
  '代码强迫症',
  '喜欢简洁有趣的设计',
  '想拍人像的风光摄影',
  '虚假的二次元',
  '跑步&跳操',
  '热爱科技',
  '追求高效简洁的生活',
]
</script>

<template>
  <div class="a4 mx-a flex shadow shadow-inset">
    <div class="flex-[7]">
      x
    </div>
    <div class="h-full w-1px bg-gray-200" />
    <div class="flex flex-[3] flex-col items-start gap6 px4 py8">
      <div class="mx4 flex flex-col items-start">
        <div class="aspect-ratio-square h36 rd-full bg-pink-200" />
        <h1 class="text-12 font-200">
          wiidede
        </h1>

        <span class="flex items-center gap2"><i i-carbon-phone class="" />17625809601</span>
        <a href="mailto:wiixdede@gmail.com" class="flex items-center gap2"><i i-carbon-email />wiixdede@gmail.com</a>
        <a href="https://wiidede.github.io" class="flex items-center gap2"><i i-carbon-earth-southeast-asia-filled />wiidede.github.io</a>
        <a href="https://github.com/wiidede" class="flex items-center gap2"><i i-carbon-logo-github />wiidede</a>
      </div>
      <div class="w-full flex flex-col items-start gap1 border rd p4">
        <h2 class="mb1 text-6">
          技能
        </h2>
        <template v-for="skill in skills" :key="skill.label">
          <div class="w-full flex flex-col items-start">
            <span>{{ skill.label }}</span>
            <div class="h2 w-full rd-full bg-gray-100">
              <div class="h2 rd-full bg-pink-200" :style="{ width: `${skill.value}%` }" />
            </div>
          </div>
        </template>
      </div>
      <div class="w-full flex flex-col items-start border rd p4">
        <h2 class="mb2 text-6">
          贡献
        </h2>
        <div class="flex flex-col gap2">
          <a
            v-for="contribution, idx in contributions"
            :key="idx"
            :href="`https://github.com/${contribution.owner}/${contribution.name}/pulls?q=is:pr+author:wiidede`"
            class="flex items-center gap2"
          >
            <img
              alt="Owner avatar"
              :src="`https://avatars.githubusercontent.com/u/${contribution.ownerId}?s=48&v=4`"
              width="24"
              height="24"
            >
            {{ contribution.name }}
            <span class="flex items-center gap-2px c-#8250df"><i i-the-merged-pr />{{ contribution.count }}</span>
          </a>
        </div>
      </div>
      <div class="w-full flex flex-col items-start border rd p4">
        <h2 class="mb2 text-6">
          特质
        </h2>
        <div class="flex flex-col items-start">
          <span v-for="personality, idx in personalities" :key="idx">{{ personality }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="a4 mx-a flex shadow shadow-inset">
    second page test
  </div>
</template>

<style lang="scss" scoped>
.a4 {
  width: 210mm;
  height: 297mm;
}
</style>
