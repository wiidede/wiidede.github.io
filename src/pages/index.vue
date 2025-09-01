<script setup lang="ts">
const {
  contacts,
  personalities,
  projects,
  contributions,
  skills,
  // experiences,
  // awards,
} = useMyInfo()
</script>

<template>
  <div class="slide-enter-content m-auto max-w65ch text-left">
    <img class="mx-2 mb4 aspect-ratio-square h36 select-none rd-full" alt="wiidede" src="https://img.wiidede.space/special/avatar.png">

    <h1 class="mb2 text-8 text-zinc-900 dark:text-zinc-50">
      Hey, I am wiidede 小的的 <span class="wave-hand inline-block animate-count-infinite animate-duration-1800">👋</span>
    </h1>
    <div class="mx--2 mb8 flex items-center gap-2">
      <a
        v-for="contact, idx in contacts"
        :key="idx"
        :href="contact.href"
        class="rd px2 py-1 hover:bg-zinc/10"
      ><div :class="contact.icon" /></a>
    </div>
    <div class="columns-1 gap-x-4 gap-y-2 md:columns-3 min-[414px]:columns-2">
      <div v-for="personality, idx in personalities" :key="idx" class="flex items-center gap-2">
        <div :class="personality.icon" />
        <span>{{ personality.label }}</span>
      </div>
    </div>

    <h2 class="mb4 mt12 text-7 text-zinc-900 dark:text-zinc-50">
      项目
    </h2>
    <div class="grid grid-cols-1 mx--2 gap2 md:grid-cols-2">
      <a
        v-for="project, idx in projects"
        :key="idx" class="group w-full rd p-2 leading-none transition hover:bg-zinc/10"
        :href="project.href"
        target="_blank"
      >
        <div class="float-left mr2 aspect-ratio-square h10 inline-flex flex-[0_0_auto] items-center justify-center rd-full ring-1 ring-zinc-200 dark:ring-zinc-800">
          <div :class="project.icon" class="h7 w7" />
        </div>
        <span class="under-anime text-lg text-zinc-900 font-medium leading-none !inline group-hover:under-anime-hover dark:text-zinc-50">{{ project.name }}</span>
        <br>
        <span class="text-sm text-zinc-500 font-light leading-tight">{{ project.desc }}</span>
      </a>
    </div>

    <h2 class="mb4 mt12 text-7 text-zinc-900 dark:text-zinc-50">
      博客
    </h2>
    <ThePosts pinned />

    <h2 class="mb4 mt12 text-7 text-zinc-900 dark:text-zinc-50">
      贡献
    </h2>
    <div class="grid grid-cols-1 mx--2 md:grid-cols-2">
      <a
        v-for="contribution, idx in contributions"
        :key="idx"
        :href="`https://github.com/${contribution.owner}/${contribution.name}/pulls?q=is:pr+author:wiidede`"
        target="_blank"
        class="group w-full flex items-center gap1 rd p2 transition hover:bg-zinc/10"
      >
        <img
          :alt="`${contribution.owner}'s avatar`"
          :src="`https://github.com/${contribution.owner}.png?size=48`"
          class="h-4.8 w-4.8 select-none"
        >
        <span class="under-anime h4 inline-flex items-center leading-none group-hover:under-anime-hover">{{ contribution.name }}</span>
        <span class="flex items-center gap-2px c-#8250df"><div i-the-merged-pr />{{ contribution.count }}</span>
      </a>
    </div>

    <h2 class="mb4 mt12 text-7 text-zinc-900 dark:text-zinc-50">
      技能
    </h2>
    <div class="grid grid-cols-[auto_1fr] max-w30ch items-center gap-x-1 gap-y-2">
      <template v-for="skill in skills" :key="skill.label">
        <div :class="skill.icon" class="w-1.2em" />
        <div class="w-full flex flex-col">
          <span class="leading-tight">{{ skill.label }}</span>
          <div class="h1 w-full rd-full bg-zinc-100/67 dark:bg-zinc-700">
            <div class="h1 rd-full bg-rose-200 dark:bg-rose-700" :style="{ width: `${skill.value}%` }" />
          </div>
        </div>
      </template>
    </div>

    <!-- <h2 class="mb4 mt12 text-7 text-zinc-900 dark:text-zinc-50">
      经历
    </h2>
    <div class="space-y-4">
      <div v-for="experience, idx in experiences" :key="idx" class="max-w40ch flex items-center gap2">
        <div class="aspect-ratio-square h10 flex flex-[0_0_auto] items-center justify-center rd-full ring-1 ring-zinc-200 dark:ring-zinc-800">
          <img :alt="experience.name" :src="experience.logo" class="w8 select-none rd-full">
        </div>
        <div class="min-w0 flex-auto">
          <div class="text-zinc-900 font-medium dark:text-zinc-50">
            {{ experience.name }}
          </div>
          <div class="flex justify-between text-sm font-light">
            <span class="text-zinc-600 dark:text-zinc-400">{{ experience.post }}</span>
            <span class="text-zinc-500">{{ experience.time }}</span>
          </div>
        </div>
      </div>
    </div>

    <h2 class="mb4 mt12 text-7 text-zinc-900 dark:text-zinc-50">
      获奖
    </h2>
    <div class="grid grid-cols-[auto_auto] w-fit gap-x-4 gap-y-4">
      <template v-for="award in awards" :key="award.name">
        <div class="grid content-between justify-items-end">
          <span class="text-zinc-900 font-medium dark:text-zinc-50">{{ award.award }}</span>
          <span class="text-zinc-500 font-light">{{ award.time }}</span>
        </div>
        <div class="grid">
          <span class="text-zinc-900 font-medium dark:text-zinc-50">{{ award.name }}</span>
          <span class="text-zinc-600 font-light dark:text-zinc-400">{{ award.unit }}</span>
        </div>
      </template>
    </div> -->

    <h2 class="mb4 mt12 text-7 text-zinc-900 dark:text-zinc-50">
      写在最后
    </h2>

    <p class="prose">
      谢谢你光临我的个人网站🥰我也很乐意如果可以认识你。
    </p>
    <p class="prose">
      If you can provide me awesome job(prefer remote, open source), here's my <a href="/resume" target="_blank">resume</a>
    </p>

    <TheFooter />
  </div>
</template>
