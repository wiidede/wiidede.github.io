<script lang="ts" setup>
import cslg from '/assets/images/cslg.avif'
import dahua from '/assets/images/dahua.avif'
import kedacom from '/assets/images/kedacom.png'

const route = useRoute()

const [DefineTitledBox, ReuseTitledBox] = createReusableTemplate<{
  name: string
  gap?: string
}>()

const showHeader = inject(ProvideShowHeaderKey)
const showBg = inject(ProvideShowBgKey)

showHeader && (showHeader.value = false)
showBg && (showBg.value = false)

const isConservative = route.query.conservative === 'true'

const {
  personalities,
  projects,
  contributions,
  skills,
  experiences,
  awards,
} = useMyInfo()

const baseInfoLeft = [
  { icon: 'i-carbon-user', value: '24岁 1999.07' },
  { icon: 'i-carbon-application-web', value: '3年 前端' },
  { icon: 'i-carbon-phone', value: route.query.tel || '176____9601' },
  { icon: 'i-carbon-email', value: 'wiixdede@gmail.com' },
]

const baseInfoRight = [
  { icon: 'i-carbon-logo-github', value: 'wiidede', href: 'https://github.com/wiidede' },
  { icon: 'i-carbon-earth-southeast-asia-filled', value: 'wiidede.space', href: 'https://wiidede.space' },
]

const certificates = [
  { icon: 'i-carbon-translate', label: 'CET-6' },
  { icon: 'i-carbon-app-connectivity', label: '软件设计师' },
]
</script>

<template>
  <DefineTitledBox v-slot="{ $slots, name, gap }">
    <div class="border rd px2 pb4 pt2">
      <h2 class="mb2 px2 text-8 text-zinc-900 font-bold">
        {{ name }}
      </h2>
      <div class="min-h0 flex flex-auto flex-col child:px2" :class="gap">
        <component :is="$slots.default" v-if="$slots.default" />
      </div>
    </div>
  </DefineTitledBox>
  <div class="a4 mx-a flex px4 text-left text-zinc-700">
    <div class="flex flex-[7] flex-col items-start gap4 px4 pt8">
      <div class="w-full flex justify-between pr4">
        <div class="min-w0 flex flex-auto flex-col items-start justify-between gap4 leading-none">
          <h1 class="text-20 text-zinc-900 font-bold">
            王子羽
          </h1>
          <div class="grid grid-cols-[auto_auto] w-full justify-between gap-y-1">
            <div v-for="info, idx in baseInfoLeft" :key="idx" class="flex items-center gap1">
              <div :class="info.icon" />
              <span>{{ info.value }}</span>
            </div>
          </div>
        </div>
        <div class="relative h36 flex-[0_0_auto] rd-full">
          <img v-show="!isConservative" class="h36 select-none rd-full" alt="王子羽" src="/assets/images/dede.avif">
        </div>
      </div>
      <div v-for="experience, idx in experiences" :key="idx" class="w-full flex items-center gap2 pr44">
        <div class="aspect-ratio-square h10 flex flex-[0_0_auto] items-center justify-center rd-full ring-1 ring-zinc-200">
          <img :alt="experience.name" :src="experience.logo" class="w8 select-none rd-full">
        </div>
        <div class="min-w0 flex-auto">
          <div class="text-zinc-900 font-medium">
            {{ experience.name }}
          </div>
          <div class="flex justify-between text-sm font-light">
            <span class="text-zinc-600">{{ experience.post }}</span>
            <span class="text-zinc-500">{{ experience.time }}</span>
          </div>
        </div>
      </div>
      <h2 class="text-8 text-zinc-900 font-bold">
        项目
      </h2>
      <div class="w-full flex flex-col gap2">
        <div class="flex flex-[0_0_auto] items-center gap2">
          <h3 class="text-6 text-zinc-900 font-medium">
            长江口航道管理系统
          </h3>
          <img class="inline-block h5 select-none" :src="dahua">
          <div class="ml-auto text-zinc-500/50">
            2022.08 - 2024.02
          </div>
        </div>
        <div class="flex flex-wrap items-center gap2">
          <TheTech icon="i-logos-vue" label="Vue3" />
          <TheTech icon="i-logos-element" label="Element Plus" />
          <TheTech icon="i-logos-typescript-icon" label="TypeScript" />
          <TheTech icon="i-logos-vitejs" label="Vite" />
          <TheTech icon="i-logos-unocss" label="UnoCSS" />
          <TheTech icon="i-logos-pinia" label="Pinia" />
        </div>
        <span class="text-sm text-zinc-500">
          项目背景：为长江口航道局打造一套航道管理系统
          <br>
          个人职责：负责框架内容的设计与维护，独自开发五个子系统中的两个
        </span>
        <ol class="list-decimal list-inside">
          <li>
            前端框架调整：<ul class="ml4 list-disc list-inside">
              <li>同时获取环境配置与挂载App</li>
              <li>将Axios改为单例模式，新增导出没有全局loading的实例</li>
              <li>允许在App挂载完之前调用ElLoading，并确保ElConfig配置正确</li>
              <li>完善类型定义，去掉框架中的大部分any</li>
              <li>编写vite插件解决tailwind reset和element-plus button样式冲突</li>
              <li>提供useConfig、useLayout、useGisMap等组合式函数</li>
            </ul>
          </li>
          <li>五个子系统公共样式分离</li>
          <li>使用Vue Grid Layout实现可拖动式自定义工作台，每个模块都异步引入</li>
          <li>数据字典Composition Api封装，使用useDict('xxx')，并且支持缓存</li>
          <li>封装表格和表单，支持使用对象数组配置且类型完善</li>
          <li>封装多选，绑定格式为：'a,b,c'；封装日期选择，绑定开始结束时间两个值</li>
          <li>封装元素内容溢出后向左悬浮的组件</li>
          <li>使用Teleport给ElInput添加prefix</li>
          <li>ElTable显示合计支持快速定义指定列进行合计</li>
          <li>封装上传组件，支持预览的时候，图片以ElImage展示</li>
          <li>使用async-validator校验表格数据，只需和校验表单一样写rules就行</li>
          <li>封装contextmenu + floating-ui，右键菜单跟随页面滚动</li>
          <li>
            帮助其他项目：<ul class="ml4 list-disc list-inside">
              <li>去掉无意义嵌套路由的组件</li>
              <li>拆离过度封装的storage，防止keepalive中的页面仍在后台运行</li>
            </ul>
          </li>
          <li>
            支持其他项目：<ul class="ml4 list-disc list-inside">
              <li>使用Vant开发移动端H5</li>
              <li>修复项目eslint异常启动失败，修复所有eslint error</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
    <div class="h-full b-r" />
    <div class="flex flex-[3] flex-col items-start gap4 px4 pb4 pt8">
      <div class="w-full flex flex-col items-start px2">
        <img
          class="mx-2 mb4 aspect-ratio-square h36 select-none rd-full"
          alt="wiidede"
          :src="isConservative ? '/assets/images/dede.avif' : 'https://img.wiidede.space/special/avatar.png'"
        >
        <a
          v-for="info, idx in baseInfoRight"
          :key="idx"
          :href="info.href"
          target="_blank"
          class="w-full flex items-center gap1 rd px2 py1 transition hover:bg-zinc-100"
        ><div :class="info.icon" />{{ info.value }}</a>
      </div>
      <ReuseTitledBox name="技能" class="min-h0 w-full flex flex-auto flex-col" gap="justify-between">
        <div class="grid grid-cols-[auto_1fr] h-full max-w30ch items-center gap-1">
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
      </ReuseTitledBox>
      <ReuseTitledBox name="贡献" class="w-full flex flex-col items-start" gap="gap-0.5">
        <a
          v-for="contribution, idx in contributions"
          :key="idx"
          :href="`https://github.com/${contribution.owner}/${contribution.name}/pulls?q=is:pr+author:wiidede`"
          target="_blank"
          class="w-full flex items-center gap1 rd px2 py1 transition hover:bg-zinc-100"
        >
          <img
            :alt="`${contribution.owner}'s avatar`"
            :src="`https://github.com/${contribution.owner}.png?size=48`"
            class="h-4.8 w-4.8 select-none"
          >
          <span class="h4 inline-flex items-center leading-none">{{ contribution.name }}</span>
          <span class="flex items-center gap-2px c-#8250df"><div i-the-merged-pr />{{ contribution.count }}</span>
        </a>
      </ReuseTitledBox>
      <ReuseTitledBox name="个性" class="w-full flex flex-col items-start">
        <div v-for="personality, idx in personalities" :key="idx" class="flex items-center gap-1">
          <div :class="personality.icon" />
          <span>{{ personality.label }}</span>
        </div>
      </ReuseTitledBox>
    </div>
  </div>
  <div class="a4 mx-a flex px4 text-left text-zinc-700">
    <div class="flex flex-[7] flex-col items-start gap4 px4 pt8">
      <div class="w-full flex flex-col gap2">
        <div class="flex flex-[0_0_auto] items-center gap2">
          <h3 class="text-6 text-zinc-900 font-medium">
            智能运维
          </h3>
          <img class="inline-block h2 select-none" :src="kedacom">
          <div class="ml-auto text-zinc-500/50">
            2020.06 - 2022.08
          </div>
        </div>
        <div class="flex flex-wrap items-center gap2">
          <TheTech icon="i-logos-vue" label="Vue2" />
          <TheTech icon="i-logos-element" label="Element UI" />
          <TheTech icon="i-logos-webpack" label="webpack" />
        </div>
        <span class="text-sm text-zinc-500">
          项目背景：为购买公司摄像头的客户提供一套管理设备、用户、配置；动态展示数据、图表的系统，方便客户更轻松的管理摄像头设备。
        </span>
        <ol class="list-decimal list-inside">
          <li>前端框架扩展：动态权限变化，实时添加/移除需要权限的按钮/页面；集成公司三方登录；请求baseUrl支持相对路径</li>
          <li>
            组件封装：响应式ECharts组件，不再担心ECharts大小有问题；el-tooltip封装文字溢出判断；
            需要鉴权的图片组件；年月日切换组件解决Element UI直接修改type面板异常
          </li>
          <li>前端导出excel；uKey登录；webSocket接收告警、进度、权限等</li>
          <li>页面性能优化；UI细节优化；组件代码重构；去除Jquery等写法</li>
          <li>
            开发子项目：<ul class="ml4 list-disc list-inside">
              <li>迷你巡检系统（覆写框架登录流程；动态多层级系统配置）</li>
              <li>工单管理（动态表格；动态表单）</li>
              <li>自定义可视化（可拖动组件）</li>
              <li>数据治理平台（大量ECharts图表展示，相似图表封装）</li>
              <li>云平台运维（vis拓扑图）</li>
            </ul>
          </li>
          <li>支持部门其他项目（解析平台、分布式存储系统、狮山大屏等）的业务开发</li>
        </ol>
      </div>
      <div class="w-full flex flex-col gap2">
        <div class="flex flex-[0_0_auto] items-center gap2">
          <h3 class="text-6 text-zinc-900 font-medium">
            运维中台
          </h3>
          <img class="inline-block h2 select-none" :src="kedacom">
          <div class="ml-auto text-zinc-500/50">
            2021.06 - 2022.04
          </div>
        </div>
        <div class="flex flex-wrap items-center gap2">
          <TheTech icon="i-logos-react" label="React" />
          <TheTech icon="i-logos-ant-design" label="Ant Design" />
          <TheTech icon="i-logos-redux-saga w-2em" label="Redux-Saga" />
          <TheTech icon="i-logos-webpack" label="webpack" />
        </div>
        <ol class="list-decimal list-inside">
          <li>该项目基于现成的低代码平台改造开发</li>
          <li>全局日期组件添加格式；在AntD3.x中新建YearPicker</li>
          <li>不同组件间数据联动；下钻的逻辑优化；支持不同维度属性各自与整体排序</li>
        </ol>
      </div>
      <div class="w-full flex flex-col gap2">
        <div class="flex flex-[0_0_auto] items-center gap2">
          <h3 class="text-6 text-zinc-900 font-medium">
            家庭服务机器人
          </h3>
          <img class="inline-block h5 select-none" :src="cslg">
          <div class="ml-auto text-zinc-500/50">
            2020.09 - 2020.12
          </div>
        </div>
        <div class="flex flex-wrap items-center gap2">
          <TheTech icon="i-logos-ros w-2em" label="ROS" />
          <TheTech icon="i-logos-python" label="Python" />
          <TheTech icon="i-logos-c-plusplus" label="C++" />
          <TheTech icon="i-logos-tensorflow" label="TensorFlow" />
        </div>
        <ol class="list-decimal list-inside">
          <li>使用ROS系统操作机器人，掌握了SLAM、建图、导航、路径规划等</li>
          <li>使用深度学习进行物品识别，从而提供家庭服务</li>
          <li>使用深度学习额外完成了水表识别的项目</li>
        </ol>
      </div>
      <h2 class="text-8 text-zinc-900 font-bold">
        获奖
      </h2>
      <div class="grid grid-cols-[auto_auto] gap-x-4 gap-y-4">
        <template v-for="award in awards" :key="award.name">
          <div class="grid content-between justify-items-end">
            <span class="text-zinc-900 font-medium">{{ award.award }}</span>
            <span class="text-zinc-500 font-light">{{ award.time }}</span>
          </div>
          <div class="grid">
            <span class="text-zinc-900 font-medium">{{ award.name }}</span>
            <span class="text-zinc-600 font-light">{{ award.unit }}</span>
          </div>
        </template>
      </div>
    </div>
    <div class="h-full b-r" />
    <div class="flex flex-[3] flex-col items-start gap4 px4 pt8">
      <ReuseTitledBox name="证书" class="w-full flex flex-col items-start">
        <div v-for="certificate, idx in certificates" :key="idx" class="flex items-center gap-1">
          <div :class="certificate.icon" />
          <span>{{ certificate.label }}</span>
        </div>
      </ReuseTitledBox>
      <ReuseTitledBox name="开源" class="w-full flex flex-col items-start" gap="gap1">
        <a
          v-for="project, idx in projects.slice(0, 7)"
          :key="idx" class="w-full rd p2 leading-none transition hover:bg-zinc-100"
          :href="project.href"
          target="_blank"
        >
          <div class="float-left mr2 aspect-ratio-square h10 inline-flex flex-[0_0_auto] items-center justify-center rd-full ring-1 ring-zinc-200">
            <div :class="project.icon" class="h7 w7" />
          </div>
          <span class="text-lg text-zinc-900 font-medium leading-tight">{{ project.name }}</span>
          <br>
          <span class="text-sm text-zinc-500 font-light leading-tight">{{ project.desc }}</span>
        </a>
      </ReuseTitledBox>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.a4 {
  width: 210mm;
  height: 297mm;
  font-size: 14px;
  background-color: white;
}

.a4 + .a4 {
  height: calc(297mm - 1px);
  border-top: 1px solid #f0f0f0;
}

@media print {
  .a4 + .a4 {
    border-color: transparent;
  }
}
</style>
