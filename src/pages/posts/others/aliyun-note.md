---
title: 阿里云学习笔记
date: 2020-01-11T16:09:31+08:00
tags:
  - 云服务
categories:
  - 其他
id: aliyun-note
---

[[toc]]

# 阿里云学习笔记(很久之前的尝试)

## 购买服务器

选择套餐（注册免费试用）

ip地址：xx.xx.xx.xx

选择了ubuntu14.04（免费试用没有更高的版本）

## 创建桌面

通过VNC连接

```bash
apt-get update
apt-get upgrade
apt-get install ubuntu-desktop
```

修改两个配置文件可以使用root登录

```bash
vi /usr/share/lightdm/lightdm.conf.d/50-ubuntu.conf
```

```conf
[Seat:*]
user-session=ubuntu
greeter-show-manual-login=true
allow-guest=false
```

```bash
vi /root/.profile
```

```bash
# ~/.profile: executed by Bourne-compatible login shells.
if [ "$BASH" ]; then
if [ -f ~/.bashrc ]; then
. ~/.bashrc
fi
fi
tty -s && mesg n || true
```

## 搭建ftp传输文件

### 失败（无法匿名登录，本地测试通过，远程无法连接）

```bash
# 创建匿名上传目录
mkdir ~/ftp
cd ~/ftp
mkdir anonymous
chomd 777 anonymous
# 安装vsftpd
sudo apt-get install vsftpd
sudo vi /etc/vsftpd.conf
```

```conf
# 修改vsftpd.conf
anonymous_enable=YES
anon_root=/root/ftp
no_anon_password=YES
write_enable=YES
anon_upload_enable=YES
anon_mkdir_write_enable=YES
```

```bash
# 重启服务
service vsftpd restart
```

```bash
# 测试
ftp 127.0.0.1
anonymous
```

开放20/21端口（ftp使用的端口）

### 第二次尝试（创建用户）（sftp）(成功)

```bash
apt install vsftpd
mkdir /home/uftp
useradd -d /home/uftp -s /bin/bash uftp
passwd uftp
chown uftp:uftp /home/uftp
vi /etc/vsftpd.user_allowlist
# 加入uftp(直接添加4个字)
vi /etc/vsftpd.conf
```

```yaml
write_enable=YES
userlist_file=/etc/vsftpd.user_allowlist
userlist_enable=YES
userlist_deny=NO
```

```bash
# 重启服务
service vsftpd restart
#用21端口 uftp 123456 主动 登陆
```

关闭20/21端口 sftp使用22端口，同时22端口通常用于ssh连接

## 展示markdown文件给别人看（简单的网页）

<https://github.com/wangchaoeric87/markdown>

```python
from flask import Flask
from flask import render_template
from flask import Markup
import markdown

app=Flask(__name__)

@app.route('/alinote')
def index():
  content = md2html('/home/uftp/note/aliCloud-note.md')
  return render_template('index.html',**locals())

def md2html(filename):

  exts = ['markdown.extensions.extra', 'markdown.extensions.codehilite','markdown.extensions.tables','markdown.extensions.toc']
  mdcontent = ""
  with open(filename,'r',encoding='utf-8') as f:
    mdcontent = f.read()
    pass
  html = markdown.markdown(mdcontent,extensions=exts)
  content = Markup(html)
  return content

if __name__ == '__main__':
  app.debug = True
  app.run(host='0.0.0.0',port = 5000)
```

把 app.run() 中 host 参数改为0.0.0.0即可给所有人访问

把 app.route() 的改成网页的路径 /alinote

通过外网访问

<http://xx.xx.xx.xx:5000/alinote>

CSS样式

<https://raw.githubusercontent.com/sindresorhus/github-markdown-css/gh-pages/github-markdown.css>
