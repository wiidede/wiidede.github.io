<script lang="ts" setup>
import cslg from '/assets/images/cslg.avif'
import kedacom from '/assets/images/kedacom.png'
import dahua from '/assets/images/dahua.avif'

const route = useRoute()

const showHeader = inject(ProvideShowHeaderKey)
const showBg = inject(ProvideShowBgKey)

showHeader && (showHeader.value = false)
showBg && (showBg.value = false)

const isFull = route.query.full === 'true'
const isConservative = route.query.conservative === 'true'

const baseInfoLeft = [
  { icon: 'i-carbon-user', value: '24岁 1999年7月' },
  { icon: 'i-carbon-application-web', value: '3年 前端' },
  { icon: 'i-carbon-phone', value: isFull ? '17625809601' : '176____9601' },
  { icon: 'i-carbon-email', value: 'wiidede@qq.com' },
]

const baseInfoRight = [
  { icon: 'i-carbon-logo-github', value: 'wiidede', href: 'https://github.com/wiidede' },
  { icon: 'i-carbon-earth-southeast-asia-filled', value: 'wiidede.github.io', href: 'https://wiidede.github.io' },
]

const experiences = [
  { logo: cslg, name: '常熟理工学院', post: '物联网工程', time: '2017.09 - 2021.6' },
  { logo: kedacom, name: '苏州科达科技股份有限公司', post: '前端工程师', time: '2020.07 - 2022.8' },
  { logo: dahua, name: '上海达华测绘科技有限公司', post: '前端工程师', time: '2022.08 - present' },
]

const skills = [
  { label: 'Vue 3', value: 90 },
  { label: 'Element Plus', value: 95 },
  { label: 'Typescript', value: 70 },
  { label: 'Vite', value: 75 },
  { label: 'React', value: 35 },
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
  <div class="a4 mx-a flex text-left text-zinc-700">
    <div class="flex flex-[7] flex-col items-start gap4 px4 py8">
      <div class="w-full flex justify-between pr4">
        <div class="flex flex-col items-start justify-between leading-[1]">
          <h1 class="text-20 font-bold text-zinc-900">
            王子羽
          </h1>
          <div class="grid grid-cols-2 gap-x-2 gap-y-1">
            <div v-for="info, idx in baseInfoLeft" :key="idx" class="flex items-center gap1">
              <i :class="info.icon" />
              <span>{{ info.value }}</span>
            </div>
          </div>
        </div>
        <div class="relative h36 flex-[0_0_auto] rd-full">
          <img v-show="!isConservative" class="h36 rd-full" alt="王子羽" src="/assets/images/dede.avif">
          <div class="absolute bottom-0 left-0 right-0 top-0 rd-full ring-3 ring-sky-200 ring-inset" />
        </div>
      </div>
      <div v-for="experience, idx in experiences" :key="idx" class="w-full flex items-center gap2 pr50">
        <div class="aspect-ratio-square h10 flex flex-[0_0_auto] items-center justify-center rd-full ring-1 ring-zinc-200">
          <img alt="x" :src="experience.logo" class="w8 rd-full">
        </div>
        <div class="flex-auto">
          <div class="font-medium text-zinc-900">
            {{ experience.name }}
          </div>
          <div class="flex justify-between text-sm font-light text-zinc-500">
            <span>{{ experience.post }}</span>
            <span>{{ experience.time }}</span>
          </div>
        </div>
      </div>
      <h2 class="text-8 font-bold text-zinc-900">
        项目
      </h2>
      <h3 class="text-6 font-medium text-zinc-900">
        智能运维项目（Vue 2全家桶 + Element UI）
      </h3>
      苏州科达是一家摄像头制造企业，其项目的主要业务都是设备的维护和为客户提供城市管理等解决方案。
      智能运维就是一套设备、用户、配置的管理及数据、图表动态展示的系统，方便客户更轻松的管理设备。
      <ol class="list-decimal list-inside">
        <li>配合公司前端框架修改项目框架：动态权限变化；三方登录；baseUrl支持相对路径</li>
        <li>响应式echarts组建；el-tooltip封装文字溢出判断；带有鉴权头的图片；年月日切换组件</li>
        <li>前端导出excel；uKey登录；webSocket接受告警、进度、权限推送</li>
        <li>页面性能优化；UI细节优化；组件代码重构；减少es5；去除JQuery；更换三方库</li>
        <li>独自开发子项目迷你巡检系统：不走公司统一登录；统一资源流程，合理覆写框架</li>
        <li>开发子项目：工单管理（动态表格；动态表单）；自定义可视化（组件动态展示）；数据治理平台（大量echarts图表展示、权限控制）；云平台运维（vis拓扑图）等；</li>
        <li>支持部门其他项目的业务开发，如：解析平台、分布式存储系统、狮山大屏等项目</li>
      </ol>
      <h3 class="text-6 font-medium text-zinc-900">
        运维中台项目（React + TypeScript + AntD + Redux）
      </h3>
      <ol class="list-decimal list-inside">
        <li>该项目基于现成的低代码平台改造开发</li>
        <li>全局日期组件添加格式；在AntD3.x中新建YearPicker</li>
        <li>不同组件间数据联动；下钻的逻辑优化；支持不同维度的属性各自与整体排序</li>
      </ol>
    </div>
    <div class="h-full b-r" />
    <div class="flex flex-[3] flex-col items-start gap4 px4 py8">
      <div class="mx4 flex flex-col items-start">
        <img
          class="mb4 aspect-ratio-square h36 rd-full"
          alt="wiidede"
          :src="isConservative ? '/assets/images/dede.avif' : 'https://avatars.githubusercontent.com/u/25472916?v=4'"
        >
        <div v-for="info, idx in baseInfoRight" :key="idx" class="flex items-center gap1">
          <i :class="info.icon" />
          <a :href="info.href" target="_blank">{{ info.value }}</a>
        </div>
      </div>
      <div class="w-full flex flex-col items-start gap1 border rd px4 pb4 pt2">
        <h2 class="mb1 text-8 font-bold text-zinc-900">
          技能
        </h2>
        <template v-for="skill in skills" :key="skill.label">
          <div class="w-full flex flex-col items-start">
            <span>{{ skill.label }}</span>
            <div class="h1 w-full rd-full bg-zinc-100">
              <div class="h1 rd-full bg-pink-200" :style="{ width: `${skill.value}%` }" />
            </div>
          </div>
        </template>
      </div>
      <div class="w-full flex flex-col items-start border rd px4 pb4 pt2">
        <h2 class="mb2 text-8 font-bold text-zinc-900">
          贡献
        </h2>
        <div class="flex flex-col gap2">
          <a
            v-for="contribution, idx in contributions"
            :key="idx"
            :href="`https://github.com/${contribution.owner}/${contribution.name}/pulls?q=is:pr+author:wiidede`"
            target="_blank"
            class="flex items-center gap2"
          >
            <img
              :alt="`${contribution.owner}'s avatar`"
              :src="`https://avatars.githubusercontent.com/u/${contribution.ownerId}?s=48&v=4`"
              width="24"
              height="24"
            >
            {{ contribution.name }}
            <span class="flex items-center gap-2px c-#8250df"><i i-the-merged-pr />{{ contribution.count }}</span>
          </a>
        </div>
      </div>
      <div class="w-full flex flex-col items-start border rd px4 pb4 pt2">
        <h2 class="mb2 text-8 font-bold text-zinc-900">
          个性
        </h2>
        <div class="flex flex-col items-start">
          <span v-for="personality, idx in personalities" :key="idx">{{ personality }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="a4 mx-a text-left text-zinc-700">
    <div class="flex flex-col items-start gap4 px4 py8">
      <h3 class="text-6 font-medium text-zinc-900">
        家庭服务机器人、水表识别（大学期间）
      </h3>
      <ol class="list-decimal list-inside">
        <li>使用ROS系统操作机器人（C++），过程中涉及SLAM、建图、导航、路径规划等。</li>
        <li>使用深度学习进行物品识别，从而提供家庭服务。顺带做了水表识别的项目。</li>
      </ol>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.a4 {
  width: 210mm;
  height: 297mm;
}
</style>
