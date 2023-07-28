---
title: 毕业设计部署踩坑笔记
date: 2021-04-26 21:30:33
tags:
  - 部署
  - 毕业设计
  - 云服务
categories:
  - 其他
id: graduation-project-note
---

[[toc]]

# 毕业设计部署踩坑笔记

首先为什么要叫踩坑，主要还是之前从来没有正式的发布过

其次就是最后想要的效果，就是用docker直接在服务器上发布

## 1.nginx直接发布编译好的vue项目

先停掉apache2或其他服务

```bash
sudo /etc/init.d/apache2 stop
```

### 安装nginx

```bash
sudo apt update
sudo apt install nginx
```

nginx 配置 我们使用最简单的配置

```bash
sudo vim /etc/nginx/nginx.conf
```

> /etc/nginx/nginx.conf

```conf
#最简单的配置
worker_processes 1;
events {
    worker_connections  1024;
}
http {
    include       conf/mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;                    #端口
        server_name  localhost;             #主机名
        location / {
            root   html;                    #项目根目录
            index  index.html index.htm;    #起始页
        }
    }
}
```

> /etc/nginx/conf/mime.types

```conf
types {
  text/html                             html htm shtml;
  text/css                              css;
  text/xml                              xml rss;
  image/gif                             gif;
  image/jpeg                            jpeg jpg;
  application/x-javascript              js;
  text/plain                            txt;
  text/x-component                      htc;
  text/mathml                           mml;
  image/png                             png;
  image/x-icon                          ico;
  image/x-jng                           jng;
  image/vnd.wap.wbmp                    wbmp;
  application/java-archive              jar war ear;
  application/mac-binhex40              hqx;
  application/pdf                       pdf;
  application/x-cocoa                   cco;
  application/x-java-archive-diff       jardiff;
  application/x-java-jnlp-file          jnlp;
  application/x-makeself                run;
  application/x-perl                    pl pm;
  application/x-pilot                   prc pdb;
  application/x-rar-compressed          rar;
  application/x-redhat-package-manager  rpm;
  application/x-sea                     sea;
  application/x-shockwave-flash         swf;
  application/x-stuffit                 sit;
  application/x-tcl                     tcl tk;
  application/x-x509-ca-cert            der pem crt;
  application/x-xpinstall               xpi;
  application/zip                       zip;
  application/octet-stream              deb;
  application/octet-stream              bin exe dll;
  application/octet-stream              dmg;
  application/octet-stream              eot;
  application/octet-stream              iso img;
  application/octet-stream              msi msp msm;
  audio/mpeg                            mp3;
  audio/x-realaudio                     ra;
  video/mpeg                            mpeg mpg;
  video/quicktime                       mov;
  video/x-flv                           flv;
  video/x-msvideo                       avi;
  video/x-ms-wmv                        wmv;
  video/x-ms-asf                        asx asf;
  video/x-mng                           mng;
}
```

### 编译vue项目

```bash
yarn run bulid
```

修改nginx.conf http server location root 为 项目所在位置 （dist文件夹）

访问localhost，成功

## 2.发布flask应用

这里没有其他项目就不用虚拟环境了

```bash
sudo pip3 install gunicorn
gunicorn -w 2 -b 127.0.0.1:5000 waterMeter:app
```

## 3.部署阿里云服务器

首先初始化服务器并下载项目

```bash
# 初始化
sudo apt update
sudo apt upgrade

# 创建目录

sudo mkdir /app
sudo chmod 777 /app
cd /app

# 安装git
sudo apt install git

# 设置git
git config --global user.name wiidede
git config --global user.email wiixdede@gmail.com


# 克隆前后端仓库
git clone -b dist https://gitee.com/wiidede/water-meter-frontend.git


# 安装tree
sudo apt install tree

# 查看目录
tree -L 2

# .
# ├── water-meter-backend
# │   ├── app
# │   ├── assets
# │   ├── base
# │   ├── main
# │   ├── README.md
# │   ├── utils
# │   ├── waterMeter.py
# │   └── 毕业设计.md
# └── water-meter-frontend
#     ├── dist
#     └── README.md

# 8 directories, 4 files

# 安装nginx
sudo apt install nginx

# 修改配置
cd /etc/nginx/sites-available/
# defalut默认被占用 可以先删除它
sudo vim default

# 添加server配置
# server {
#     listen       80;
#     server_name  localhost;
#     location / {
#         root   /app/water-meter-frontend/dist;
#         index  index.html;
#     }
# }

# 重启
sudo nginx -s reload
# 或者
sudo systemctl reload nginx
sudo systemctl restart nginx

# 后端配置
cd /app/water-meter-backend/

sudo apt install python3-pip
# sudo pip3 install tensorflow==1.15 # python3.8 无法安装 tf1

# 使用虚拟环境
sudo pip3 install virtualenv

# 安装python3.6
sudo apt install software-properties-common
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.6
python3.6 -V

virtualenv venv --python=python3.6
source venv/bin/activate

# 虚拟环境（venv）
pip install gunicorn
pip install flask
pip install flask-cors
pip install tensorflow==1.15
pip install scipy
pip install easydict
pip install Pillow
pip install opencv-python
# 安装依赖
sudo apt install libgl1-mesa-glx

# 传输checkpoints
# scp -r file(ubuntu的文件) root(用户名)@xx.xx.xx.xx(公网ip):/home/(目标文件夹)
scp -r -i ssh-key.pem /home/robot/dd_demo/watermeter/WaterMeter/checkpoints root@xx.xx.xx.xx:/app/water-meter-backend
gunicorn -w 2 -b 127.0.0.1:5001 waterMeter:app



# 退出虚拟环境
deactivate



# 修改配置
cd /etc/nginx/sites-available/
# defalut默认被占用 可以先删除它
sudo vim default

# 添加这个服务
# proxy服务器
# server {
#     listen       5000;
#     server_name  xx.xx.xx.xx;

#     location / {
#         proxy_pass   http://127.0.0.1:5001;  #反向代理
#         proxy_cookie_domain 127.0.0.1 xx.xx.xx.xx; #修改cookie里域名

#         # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
#         # add_header Access-Control-Allow-Origin *;  #当前端只跨域不带cookie时，可为*
#         # add_header Access-Control-Allow-Credentials true;
#     }
# }

cd /usr/lib/systemd/system
vi water-meter-backend.servier


# [Unit]
# After=syslog.target network.target remote-fs.target nss-lookup.target
# [Service]
# #项目所在目录
# user=root
# WorkingDirectory=/app/water-meter-backend/
# #gunicorn启动命令
# #解释1.先是虚拟环境下的gunicorn所在位置
# #2.--bind 绑定端口 承接上篇所以选用0.0.0.0:8001
# #3.xxx表示项目名称
# ExecStart=/app/water-meter-backend/venv/bin/gunicorn -w 2 -b 127.0.0.1:5001 waterMeter:app
# Restart=on-failure
# [Install]
# WantedBy=multi-user.target


# 添加到开机自启动项
sudo systemctl enable water-meter-backend.servier
```
