// @unocss-include

import cslg from '/assets/images/cslg.avif'
import kedacom from '/assets/images/kedacom.png'
import dahua from '/assets/images/dahua.avif'

export function useMyInfo() {
  const contacts = [
    { icon: 'i-logos-google-gmail', label: 'Gmail', href: 'mailto:wiixdede@gmail.com' },
    { icon: 'i-carbon-logo-github text-black dark:text-white', label: 'GitHub', href: 'https://github.com/wiidede' },
    { icon: 'i-the-bilibili text-#00ADEB', label: 'bilibili', href: 'https://space.bilibili.com/33819620' },
    { icon: 'i-the-coolapk text-#10AA5F', label: 'CoolApk', href: 'http://www.coolapk.com/u/641913' },
    { icon: 'i-logos-twitter', label: 'Twitter', href: 'https://twitter.com/wiixdede' },
  ]

  const personalities = [
    { icon: 'i-carbon-code', label: '代码强迫症' },
    { icon: 'i-carbon-logo-figma', label: '喜欢简洁有趣的设计' },
    { icon: 'i-carbon-camera', label: '想拍人像的风光摄影' },
    { icon: 'i-carbon-worship', label: '虚假的二次元' },
    { icon: 'i-carbon-pedestrian', label: '跑步&跳操' },
    { icon: 'i-carbon-carbon-for-ibm-product', label: '热爱科技' },
    { icon: 'i-carbon-restaurant-fine', label: '追求高效简洁的生活' },
  ]

  const projects = [
    {
      icon: 'i-the-arco-design-nuxt-module',
      name: 'Arco Design Nuxt Module',
      desc: '一个Arco Design Vue的Nuxt模块，支持自动自动导入Arco Design组件、图标、hook',
      href: 'https://www.npmjs.com/package/arco-design-nuxt-module',
    },
    {
      icon: 'i-the-vue-range-multi',
      name: 'Vue Range Multi',
      desc: '一个支持多个滑块的Vue组件，支持自由添加/删除滑块',
      href: 'https://www.npmjs.com/package/vue-range-multi',
    },
    {
      icon: 'i-the-my-day',
      name: '流光日月',
      desc: '一个规划一天计划的小页面，显示当前计划的进度，可以存在多个计划，支持通过url分享计划',
      href: 'https://fly-my-day.netlify.app/',
    },
    {
      icon: 'i-the-dandanplay-vi',
      name: 'dandanplayVi',
      desc: 'dandanplay的一个简易web实现。通过CCL实现了一个弹幕播放器，支持设置弹幕样式、显示区域、同屏数量、时间轴偏移。也可以选择其他弹幕播放器',
      href: 'https://dandanplay-vitesse.netlify.app/',
    },
    {
      icon: 'i-the-liquid-ray',
      name: 'Liquid Ray',
      desc: '一个一体化、无缝的vscode主题插件，色彩偏霓虹、梦幻',
      href: 'https://marketplace.visualstudio.com/items?itemName=wiidede.liquid-ray',
    },
    {
      icon: 'i-the-valine-mail',
      name: 'Valine Mail',
      desc: 'fork于Valine Admin，目的是更好的邮件提醒。无需再绑定LeanCloud实例的域名，无需定时任务。云函数异步逻辑完善、更详细的log输出',
      href: 'https://marketplace.visualstudio.com/items?itemName=wiidede.liquid-ray',
    },
  ]

  const contributions = [
    { name: 'element-plus', count: 4, owner: 'element-plus' },
    { name: 'vueuse', count: 1, owner: 'vueuse' },
    { name: 'vite-plugin-vue-devtools', count: 1, owner: 'webfansplz' },
    { name: 'pdf2docx', count: 1, owner: 'dothinking' },
  ]

  const skills = [
    { icon: 'i-logos-vue', label: 'Vue 3', value: 90 },
    { icon: 'i-logos-element', label: 'Element Plus', value: 95 },
    { icon: 'i-logos-typescript-icon', label: 'TypeScript', value: 70 },
    { icon: 'i-logos-vitejs', label: 'Vite', value: 75 },
    { icon: 'i-logos-unocss', label: 'UnoCSS', value: 75 },
    { icon: 'i-logos-vitest', label: 'Vitest', value: 20 },
    { icon: 'i-logos-nuxt-icon', label: 'Nuxt', value: 5 },
    { icon: 'i-logos-react', label: 'React', value: 35 },
    { icon: 'i-logos-python', label: 'Python', value: 25 },
    { icon: 'i-logos-tensorflow', label: 'TensorFlow', value: 18 },
  ]

  const experiences = [
    { logo: cslg, name: '常熟理工学院', post: '物联网工程', time: '2017.09 - 2021.6' },
    { logo: kedacom, name: '苏州科达科技股份有限公司', post: '前端工程师', time: '2020.07 - 2022.8' },
    { logo: dahua, name: '上海达华测绘科技有限公司', post: '前端工程师', time: '2022.08 - present' },
  ]

  const awards = [
    { time: '2019.08', name: 'IJCAI2019老年人机器人看护大赛（国际赛）', award: '三等奖', unit: '澳门大学' },
    { time: '2019.06', name: '2019中国服务机器人大赛', award: '二等奖', unit: '中国自动化学会' },
    { time: '2019.03', name: '蓝桥杯大赛', award: '三等奖', unit: '中国软件行业协会' },
    { time: '2017.12', name: 'CCF大数据与计算智能大赛青年志愿者服务证书', award: '', unit: '中国共产主义青年团' },
  ]

  return {
    contacts,
    personalities,
    projects,
    contributions,
    skills,
    experiences,
    awards,
  }
}

export function useFriends() {
  const friends = [
    { name: 'CIRCUIT', link: 'https://yang000.cn', desc: '鸯飞漫冬山', avatar: 'https://q.qlogo.cn/headimg_dl?dst_uin=58894242&spec=100&img_type=jpg' },
    { name: 'wiidede | 小的的', link: 'https://wiidede.space', desc: '是小的的呐，愿你眼里有光，心中有爱', avatar: 'https://github.com/wiidede.png' },
    { name: '申请友链', link: '#new', desc: '很高兴认识你', avatar: 'i-carbon-user-follow' },
  ]

  const idols = [
    { name: 'Anthony Fu', link: 'https://antfu.me', desc: 'A ship in harbor is safe, but that is not what ships are built for.', avatar: 'https://github.com/antfu.png' },
    { name: 'Evan You', link: 'https://evanyou.me', desc: '', avatar: 'https://github.com/yyx990803.png' },
  ]

  const siteInfo = [
    { label: '站点名称', content: 'wiidede | 小的的' },
    { label: '站点链接', content: 'https://wiidede.space' },
    { label: '站点描述', content: '是小的的呐，愿你眼里有光，心中有爱' },
    { label: '主人头像', content: 'https://github.com/wiidede.png' },
  ]

  return {
    friends,
    idols,
    siteInfo,
  }
}
