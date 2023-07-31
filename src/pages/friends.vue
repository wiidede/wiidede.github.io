<script setup lang="ts">
const {
  friends,
  idols,
  siteInfo,
} = useFriends()
</script>

<template>
  <div class="slide-enter-content m-auto max-w100ch text-left">
    <h1 class="mb2 text-8 text-zinc-900 dark:text-zinc-50">
      朋友们 <span class="wave-hand inline-block animate-count-infinite animate-duration-1800">👋</span>
    </h1>

    <div class="grid grid-cols-1 mx--2 gap2 md:grid-cols-2 xl:grid-cols-3">
      <a
        v-for="friend, idx in friends"
        :key="idx" class="group w-full rd p2 leading-none transition hover:bg-zinc/10"
        :href="friend.link"
        :target="friend.link.startsWith('http') ? '_blank' : '_self'"
      >
        <div class="float-left mr2 aspect-ratio-square h10 inline-flex flex-[0_0_auto] items-center justify-center ring-1 ring-zinc-200 dark:ring-zinc-800">
          <img v-if="friend.avatar.startsWith('http')" :src="friend.avatar" class="aspect-ratio-square h9 w9">
          <i v-else :class="friend.avatar" />
        </div>
        <span class="mb1 inline-block text-lg font-medium leading-none text-zinc-900 under-anime group-hover:under-anime-hover dark:text-zinc-50">{{ friend.name }}</span>
        <br>
        <span class="text-sm font-light leading-tight text-zinc-500">{{ friend.desc }}</span>
      </a>
    </div>

    <h2 class="mb4 mt12 text-7 text-zinc-900 dark:text-zinc-50">
      感谢我的偶像们
    </h2>

    <div class="grid grid-cols-1 mx--2 gap2 md:grid-cols-2 xl:grid-cols-3">
      <a
        v-for="idol, idx in idols"
        :key="idx" class="group w-full rd p2 leading-none transition hover:bg-zinc/10"
        :href="idol.link"
        target="_blank"
      >
        <div class="float-left mr2 aspect-ratio-square h10 inline-flex flex-[0_0_auto] items-center justify-center ring-1 ring-zinc-200 dark:ring-zinc-800">
          <img :src="idol.avatar" class="aspect-ratio-square h9 w9">
        </div>
        <span class="mb1 inline-block text-lg font-medium leading-none text-zinc-900 under-anime group-hover:under-anime-hover dark:text-zinc-50">{{ idol.name }}</span>
        <br>
        <span class="text-sm font-light leading-tight text-zinc-500">{{ idol.desc }}</span>
      </a>
    </div>

    <h2 class="mb4 mt12 text-7 text-zinc-900 dark:text-zinc-50">
      本站信息
    </h2>
    <div v-for="info, idx in siteInfo" :key="idx">
      <span class="select-none text-zinc-900">{{ info.label }}：</span><span>{{ info.content }}</span>
    </div>

    <h2 id="new" class="mb4 mt12 text-7 text-zinc-900 dark:text-zinc-50">
      申请友链
    </h2>

    <p class="prose">
      谢谢你光临我的个人网站🥰我也很乐意如果可以认识你。
    </p>
    <p class="prose">
      我希望贵站是友好的，非搬运的，非商业化的
    </p>
    <p class="prose">
      我希望贵站不应该有影响观看体验的广告、弹窗
    </p>
    <p class="prose">
      在申请友链之前，请先将本站加入贵站的友链中哦~
    </p>
    <p class="prose">
      在<a href="#valine-comments">评论</a>中发送你的信息就行啦
    </p>
    <p class="prose">
      <TheFriendFormat />
    </p>

    <TheFooter />
    <client-only>
      <div class="slide-enter mx-auto max-w100ch pt-4 animate-delay-800">
        <TheValine />
      </div>
    </client-only>
  </div>
</template>
