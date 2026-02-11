---
title: Exif Gallery Nuxt
date: 2025-03-14T19:53:47+08:00
tags:
  - CSS
categories:
  - 前端
  - Nuxt
  - Vue
id: exif-gallery-nuxt
---

# Exif Gallery Nuxt一个集成 AI 智能处理、浏览器图片压缩等功能的全栈相册解决方案

![Exif Gallery Nuxt](https://photo.wiidede.space/exif-gallery-nuxt.jpg)

集成 AI 智能处理、浏览器图片压缩等功能的全栈相册解决方案。

📸 喜欢摄影的同学一定想过在网上分享自己的照片吧？
所以，我做了一个网站！相当于一个可以访问的个人作品集。

🤔 为什么要做这个网站？
其实，最初的想法很简单：我想更好地管理自己的照片 📂我希望它们能被更多人看到 👀
我也试过其他类似网站，比如exif-photo-blog，它部署在Vercel上，但用多了就会碰到图片优化的使用限制。于是我想：干脆用Vue生态重写一个吧！把图片压缩直接放在浏览器端处理，彻底解决后端优化限量的问题。

体验地址：<https://photo.wiidede.space/>

GitHub: <https://github.com/wiidede/exif-gallery-nuxt>

特性：

1. 解析 EXIF 信息，包括拍摄时间、拍摄地点、相机型号、光圈、快门速度、ISO等，也会读取文件修改时间作为备选
2. 浏览器图片压缩，支持压缩成JPEG、WebP、AVIF格式，类似于squoosh
3. AI生成图片标题、标签，支持gemini openai
4. 几乎完全免费（R2 需要绑定信用卡，中国大陆Visa支持）
5. 基于Nuxt、NuxtHub，部署在cloudflare，SSR
6. 图片存储在 R2 上
7. 数据库使用 D1，驱动使用 drizzle-orm
8. 使用 shadcn-vue 和 inspira-ui，使用unocss提供原子化css
9. 移动端样式支持
10. i18n: 中文/英文
11. 自定义主题样式
12. 批量上传
13. 自动压缩，ai自动生成标题、标签
14. 两种视觉效果，动态流式布局，网格布局
15. 无限滚动丝滑加载
16. 按tag筛选图片，显示各个tag下的图片数量
17. 图片信息快速编辑
18. 图片单独连接
19. 图片3d卡片效果
20. view-transitions转场动画
21. Nuxt Auth Utils提供服务端工具的简约身份验证模块
22. 自定义网站标题

致谢：很多灵感来自exif-photo-blog，如果你不喜欢我的项目，或者不方便绑信用卡，但也想部署网站，可以去exif-photo-blog，这也是个非常棒的网站✨

希望你们喜欢我的项目，也期待听到你们的声音！💌
