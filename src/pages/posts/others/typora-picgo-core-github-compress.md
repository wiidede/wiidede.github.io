---
title: typora+picgo-core+github+compress 压缩后上传 github 图床
date: 2022-05-04 08:58:41
tags:
  - picgo
categories:
  - 其他
id: typora-picgo-core-github-compress
---

[[toc]]

# `typora`+`picgo-core`+`github`+`compress` 压缩后上传 github 图床

1. 新建github access token

2. typora 设置 图像 选择 picgo-core 下载或更新

3. 添加配置文件（更换wiidede/img-store-one成自己的仓库）

   ```json
   {
     "picBed": {
       "current": "github",
       "uploader": "github",
       "smms": {
         "token": ""
       },
       "github": {
         "branch": "main",
         "customUrl": "https://wiidede.github.io/img-store-one", // "https://raw.githubusercontent.com/wiidede/img-store-one/master"
         "path": "images/",
         "repo": "wiidede/img-store-one",
         "token": "自行申请后查看"
       }
     },
     "picgoPlugins": {}
   }
   ```

4. 然后成功

   ![image-20220504082530013](https://wiidede.github.io/img-store-one/images/image-20220504082530013.png)

5. 安装 compress 插件（可选，我直接压缩成webp了，本地压缩，而且体积小，缺点可能就是画质一般般，但是都用github图床了，这就足够了）

   ```shell
   npm install picgo -g
   picgo add compress
   picgo use transformer
   picgo config plugin compress
   ```

6. 测试最终效果(我是个憨批，把token放出来了，下图的已经没用了，马上就换了一个😑)

   ![image-20220504085315955](https://wiidede.github.io/img-store-one/images/image-20220504085315955.webp)

7. mac (using custom command)

```bash
/usr/local/bin/node /usr/local/bin/picgo upload
```
