---
title: 阿里云学习笔记 2023
date: 2023-12-7 10:59:50
tags:
  - 云服务
categories:
  - 其他
id: aliyun-note
---

[[toc]]

# 阿里云学习笔记 2023再出发

买了99一年的阿里云服务器，记录操作过程。

## ssh

### 生成ssh key

```bash
ssh-keygen -m PEM -t rsa -b 4096
```

### authorized_keys

将`~/.ssh/id_rsa.pub`的内容复制到`~/.ssh/authorized_keys`

### 私钥

在`~/.ssh/id_rsa`中，复制到Github中

## 部署

## nginx

```bash
apt update
apt install nginx
systemctl status nginx # 查看状态
curl localhost # Welcome to nginx!

vim /etc/nginx/nginx.conf
```

找到http块，并在该块内添加以下内容：

```nginx
server {
    listen 80;
    server_name cn.wiidede.space;

    location / {
        root /var/www/cn.wiidede.space;
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
nginx -t # 检查配置
systemctl reload nginx
```

## 配置安全组策略

打开 80 443 端口

## 配置dns

A 记录

## https

```nginx
http {
  server {
    listen 443 ssl;
    server_name cn.wiidede.space;

    ssl_certificate /etc/nginx/ssl/cn.wiidede.space.pem;
    ssl_certificate_key /etc/nginx/ssl/cn.wiidede.space.key;

      location / {
          root /var/www/cn.wiidede.space;
          try_files $uri $uri/ /index.html;
      }
  }
}
```

## 解析不同域名，解析不同路径，转发本地端口

```nginx
  server {
    listen 80;
    server_name ~^(?:cn\.)?wiidede\.space$;

    location / {
      root /var/www/cn.wiidede.space;
      try_files $uri.html $uri $uri/ /index.html;
    }
  }

  server {
    listen 80;
    server_name sub.wiidede.space;

    location / {
      proxy_pass http://localhost:21001;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
    }
  }

  server {
    listen 443 ssl;
    server_name wiidede.space;

    ssl_certificate /etc/nginx/ssl/wiidede.space.pem;
    ssl_certificate_key /etc/nginx/ssl/wiidede.space.key;

      location / {
          root /var/www/cn.wiidede.space;
          try_files $uri.html $uri $uri/ /index.html;
      }

      location /img {
          alias /var/www/img;
      }
  }

  server {
    listen 443 ssl;
    server_name cn.wiidede.space;

    ssl_certificate /etc/nginx/ssl/cn.wiidede.space.pem;
    ssl_certificate_key /etc/nginx/ssl/cn.wiidede.space.key;

      location / {
          root /var/www/cn.wiidede.space;
          try_files $uri.html $uri $uri/ /index.html;
      }
  }
```

## docker

docker compose up -d
