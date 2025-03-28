// @unocss-include

import cslg from '/assets/images/cslg.avif'
import dahua from '/assets/images/dahua.avif'
import kedacom from '/assets/images/kedacom.png'
import travel from '/assets/images/travel.avif'

export function useMyInfo() {
  const contacts = [
    { icon: 'i-logos-google-gmail text-0.8em', label: 'Gmail', href: 'mailto:wiixdede@gmail.com' },
    { icon: 'i-carbon-logo-github text-black dark:text-white', label: 'GitHub', href: 'https://github.com/wiidede' },
    { icon: 'i-the-bilibili text-#00ADEB', label: 'bilibili', href: 'https://space.bilibili.com/33819620' },
    { icon: 'i-the-xiaohongshu text-#EA3F4A text-1.2em', label: '小红书', href: 'https://www.xiaohongshu.com/user/profile/5d98c7080000000001003beb' },
    { icon: 'i-the-x text-0.9em', label: 'Twitter', href: 'https://x.com/wiixdede' },
    { icon: 'i-the-coolapk text-#10AA5F text-1.2em', label: 'CoolApk', href: 'http://www.coolapk.com/u/641913' },
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
      desc: '一个Arco Design Vue的Nuxt模块，支持自动自动导入Arco Design组件、图标等',
      href: 'https://www.npmjs.com/package/arco-design-nuxt-module',
    },
    {
      icon: 'i-the-vue-range-multi',
      name: 'Vue Range Multi',
      desc: '一个支持多个滑块的Vue组件，支持自由添加/删除滑块',
      href: 'https://www.npmjs.com/package/vue-range-multi',
    },
    {
      icon: 'i-the-exif-gallery',
      name: 'Exif Gallery',
      desc: '集成 AI 智能处理、浏览器图片压缩等功能的全栈相册解决方案',
      href: 'https://photo.wiidede.space/',
    },
    {
      icon: 'i-the-reach-star',
      name: '摘星',
      desc: '一个目标管理应用，通过记录去摘得属于自己的星星',
      href: 'https://reach-star.wiidede.space/',
    },
    {
      icon: 'i-the-dandanplay-vi',
      name: 'dandanplayVi',
      desc: 'dandanplay简易web实现。使用CCL实现弹幕播放器，支持设置弹幕样式、显示区域、同屏数量、时间轴偏移。提供多个播放器',
      href: 'https://dandan.wiidede.space/',
    },
    {
      icon: 'i-the-liquid-ray',
      name: 'Liquid Ray',
      desc: '一个一体化、无缝的vscode主题插件，色彩偏霓虹、梦幻',
      href: 'https://marketplace.visualstudio.com/items?itemName=wiidede.liquid-ray',
    },
    {
      icon: 'i-the-my-day',
      name: '流光日月',
      desc: '一个规划一天计划的小页面，显示当前计划的进度，可以存在多个计划，支持通过url分享计划',
      href: 'https://day.wiidede.space/',
    },
    {
      icon: 'i-the-valine-mail',
      name: 'Valine Mail',
      desc: 'fork于Valine Admin，目的是更好的邮件提醒。无需定时任务。云函数异步逻辑完善、更详细的log输出',
      href: 'https://github.com/wiidede/Valine-Admin',
    },
    {
      icon: 'i-the-coding-movie',
      name: 'Coding Movie',
      desc: '生成一些简单的效果、素材用于剪辑',
      href: 'https://coding-movie.wiidede.space/',
    },
    {
      icon: 'i-the-law-wallpaper',
      name: '律法壁纸',
      desc: '轮播律法条例',
      href: 'https://law.wiidede.space/',
    },
    {
      icon: 'i-the-ueditor-monaco',
      name: 'UEditor Monaco',
      desc: '一个UEditor的demo页，支持使用Monaco编辑富文本源码',
      href: 'https://ueditor.wiidede.space/',
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
    { icon: 'i-logos-unocss', label: 'UnoCSS', value: 80 },
    { icon: 'i-logos-vitest', label: 'Vitest', value: 20 },
    { icon: 'i-logos-nuxt-icon', label: 'Nuxt', value: 50 },
    { icon: 'i-logos-react', label: 'React', value: 35 },
    { icon: 'i-logos-python', label: 'Python', value: 25 },
    { icon: 'i-logos-tensorflow', label: 'TensorFlow', value: 18 },
  ]

  const experiences = [
    { logo: cslg, name: '常熟理工学院', post: '物联网工程', time: '2017.09 - 2021.06' },
    { logo: kedacom, name: '苏州科达科技股份有限公司', post: '前端工程师', time: '2020.07 - 2022.08' },
    { logo: dahua, name: '上海达华测绘科技有限公司', post: '前端工程师', time: '2022.08 - 2024.02' },
    { logo: travel, name: 'gap', post: 'undefined', time: '2024.03 - present' },
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
  interface Friend {
    name: string
    link: string
    desc: string
    avatar: string
  }

  const friends: Friend[] = [
    { name: 'CIRCUIT', link: 'https://yang000.cn', desc: '鸯飞漫冬山', avatar: 'https://q.qlogo.cn/headimg_dl?dst_uin=58894242&spec=100&img_type=jpg' },
    { name: 'XiYu博客', link: 'https://xiyu.pro', desc: '记录·分享', avatar: 'https://gravatar.loli.net/avatar/16a8d4c0491cf8cec54e6ab8f65e4fa6' },
    { name: '小孙同学', link: 'https://blog.sunguoqi.com', desc: '路虽远行则将至，事随难做则必成！', avatar: 'https://assets.guoqi.dev/images/avatar.png' },
    { name: 'wiidede | 小的的', link: 'https://wiidede.space', desc: '是小的的呐，愿你眼里有光，心中有爱', avatar: 'https://github.com/wiidede.png' },
    { name: '申请友链', link: '#new', desc: '很高兴认识你', avatar: 'i-carbon-user-follow' },
  ]

  const idols: Friend[] = [
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
