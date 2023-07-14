<script setup lang="ts">
const {
  contacts,
  personalities,
  projects,
  contributions,
  skills,
  experiences,
  awards,
} = useMyInfo()
</script>

<template>
  <div class="slide-enter-content m-auto max-w65ch text-left">
    <img class="mx-2 mb4 aspect-ratio-square h36 select-none rd-full" alt="wiidede" src="https://avatars.githubusercontent.com/u/25472916?v=4">

    <h1 class="mb2 text-8 text-zinc-900 dark:text-white">
      Hey, I am wiidede 小的的 👋
    </h1>
    <div class="mx--2 mb8 space-x-4">
      <a
        v-for="contact, idx in contacts"
        :key="idx"
        :href="contact.href"
        class="rd px2 py-1 hover:bg-zinc/10"
      ><i :class="contact.icon" /></a>
    </div>
    <div v-for="personality, idx in personalities" :key="idx">
      <i :class="personality.icon" class="mr1" />
      <span>{{ personality.label }}</span>
    </div>

    <h2 class="mb4 mt12 text-7 text-zinc-900 dark:text-white">
      项目
    </h2>
    <div class="grid grid-cols-1 mx--2 gap2 md:grid-cols-3">
      <a
        v-for="project, idx in projects"
        :key="idx" class="w-full rd p2 leading-none transition hover:bg-zinc/10"
        :href="project.href"
        target="_blank"
      >
        <div class="float-left mr2 aspect-ratio-square h10 inline-flex flex-[0_0_auto] items-center justify-center rd-full ring-1 ring-zinc-200 dark:ring-zinc-800">
          <i :class="project.icon" class="h7 w7" />
        </div>
        <span class="mb1 inline-block text-lg font-medium leading-none text-zinc-900 dark:text-white">{{ project.name }}</span>
        <br>
        <span class="text-sm font-light leading-tight text-zinc-500">{{ project.desc }}</span>
      </a>
    </div>

    <h2 class="mb4 mt12 text-7 text-zinc-900 dark:text-white">
      博客
    </h2>
    <ThePosts pinned />
    <p class="prose">
      <a href="/posts">更多 ...</a>
    </p>

    <h2 class="mb4 mt12 text-7 text-zinc-900 dark:text-white">
      贡献
    </h2>
    <div class="grid grid-cols-1 mx--2 md:grid-cols-2">
      <a
        v-for="contribution, idx in contributions"
        :key="idx"
        :href="`https://github.com/${contribution.owner}/${contribution.name}/pulls?q=is:pr+author:wiidede`"
        target="_blank"
        class="w-full flex items-center gap1 rd p2 transition hover:bg-zinc/10"
      >
        <img
          :alt="`${contribution.owner}'s avatar`"
          :src="`https://avatars.githubusercontent.com/u/${contribution.ownerId}?s=48&v=4`"
          class="h-4.8 w-4.8 select-none"
        >
        <span class="h4 inline-flex items-center leading-none">{{ contribution.name }}</span>
        <span class="flex items-center gap-2px c-#8250df"><i i-the-merged-pr />{{ contribution.count }}</span>
      </a>
    </div>

    <h2 class="mb4 mt12 text-7 text-zinc-900 dark:text-white">
      技能
    </h2>
    <div class="max-w30ch flex flex-col items-start justify-between gap2">
      <div v-for="skill in skills" :key="skill.label" class="w-full flex items-center gap1">
        <i :class="skill.icon" />
        <div class="w-full flex flex-col">
          <span class="leading-tight">{{ skill.label }}</span>
          <div class="h1 w-full rd-full bg-zinc-100/67 dark:bg-zinc-700">
            <div class="h1 rd-full bg-rose-200 dark:bg-rose-700" :style="{ width: `${skill.value}%` }" />
          </div>
        </div>
      </div>
    </div>

    <h2 class="mb4 mt12 text-7 text-zinc-900 dark:text-white">
      经历
    </h2>
    <div class="space-y-4">
      <div v-for="experience, idx in experiences" :key="idx" class="w-full flex items-center gap2 pr44">
        <div class="aspect-ratio-square h10 flex flex-[0_0_auto] items-center justify-center rd-full ring-1 ring-zinc-200 dark:ring-zinc-800">
          <img :alt="experience.name" :src="experience.logo" class="w8 select-none rd-full">
        </div>
        <div class="min-w0 flex-auto">
          <div class="font-medium text-zinc-900 dark:text-white">
            {{ experience.name }}
          </div>
          <div class="flex justify-between text-sm font-light">
            <span class="text-zinc-600 dark:text-zinc-400">{{ experience.post }}</span>
            <span class="text-zinc-500">{{ experience.time }}</span>
          </div>
        </div>
      </div>
    </div>

    <h2 class="mb4 mt12 text-7 text-zinc-900 dark:text-white">
      获奖
    </h2>
    <div class="grid grid-cols-[auto_auto] w-fit gap-x-4 gap-y-4">
      <template v-for="award in awards" :key="award.name">
        <div class="grid content-between justify-items-end">
          <span class="font-medium text-zinc-900 dark:text-white">{{ award.award }}</span>
          <span class="font-light text-zinc-500">{{ award.time }}</span>
        </div>
        <div class="grid">
          <span class="font-medium text-zinc-900 dark:text-white">{{ award.name }}</span>
          <span class="font-light text-zinc-600 dark:text-zinc-400">{{ award.unit }}</span>
        </div>
      </template>
    </div>

    <h2 class="mb4 mt12 text-7 text-zinc-900 dark:text-white">
      写在最后
    </h2>

    <p class="prose">
      谢谢你光临我的个人网站🥰我也很乐意如果可以认识你。
    </p>
    <p class="prose">
      如果你可以提供我一个非常酷的工作机会，这是我的<a href="/resume" target="_blank">简历</a>。
    </p>

    <TheFooter />
  </div>
</template>
