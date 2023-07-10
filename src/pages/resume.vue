<script lang="ts" setup>
const showHeader = inject(ProvideShowHeaderKey)
const showBg = inject(ProvideShowBgKey)

showHeader && (showHeader.value = false)
showBg && (showBg.value = false)

const skills = [
  { label: 'Vue', value: 90 },
  { label: 'Element Plus', value: 95 },
]

const hobbies = ['摄影', '跑步', '设计']
</script>

<template>
  <div class="a4 mx-a flex shadow shadow-inset">
    <div class="flex-[2]">
      x
    </div>
    <div class="flex flex-[1] flex-col items-center gap2 bg-slate-50/20 px2 py8">
      <div class="aspect-ratio-square h36 rd-full bg-pink/10" />
      <h1 class="text-12 font-200">
        wiidede
      </h1>
      <span class="flex items-center gap2"><i i-carbon-phone class="" />17625809601</span>
      <a href="mailto:wiixdede@gmail.com" class="flex items-center gap2"><i i-carbon-email />wiixdede@gmail.com</a>
      <a href="https://wiidede.github.io" class="flex items-center gap2"><i i-carbon-earth-southeast-asia-filled />wiidede.github.io</a>
      <a href="https://github.com/wiidede" class="flex items-center gap2"><i i-carbon-logo-github />wiidede</a>
      <div class="m4 w-full border rd p4">
        <h2 class="mb2 text-6">
          技能
        </h2>
        <div v-for="skill, idx in skills" :key="idx">
          <div class="flex flex-col items-start">
            <span>{{ skill.label }}</span>
            <div class="h2 w-full rd-full bg-gray/10">
              <div class="h2 rd-full bg-pink/10" :style="{ width: `${skill.value}%` }" />
            </div>
          </div>
        </div>
      </div>
      <div class="m4 w-full border rd p4">
        <h2 class="mb2 text-6">
          贡献
        </h2>
        <div class="flex flex-col gap2">
          <a href="https://github.com/element-plus/element-plus/pulls?q=is:pr+author:wiidede" class="flex items-center gap2">
            <img alt="element-plus Owner avatar" src="https://avatars.githubusercontent.com/u/68583457?s=48&v=4" width="24" height="24">
            element-plus
            <span class="flex items-center"><i i-the-merged-pr class="c-#8250df" />4</span>
          </a>
          <a href="https://github.com/dothinking/pdf2docx/pulls?q=is:pr+author:wiidede" class="flex items-center gap2">
            <img alt="pdf2docx Owner avatar" src="https://avatars.githubusercontent.com/u/13885442?s=48&v=4" width="24" height="24">
            pdf2docx
            <span class="flex items-center"><i i-the-merged-pr class="c-#8250df" />1</span>
          </a>
        </div>
      </div>
      <div class="m4 w-full border rd p4">
        <h2 class="mb2 text-6">
          爱好
        </h2>
        <div class="flex flex-wrap gap2">
          <span v-for="hobby, idx in hobbies" :key="idx" class="tag !text-4">{{ hobby }}</span>
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
