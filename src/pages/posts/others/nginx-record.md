---
title: nginx record
date: 2023-07-06 15:09:56
tags:
  - nginx
categories:
  - 其他
id: nginx-record
---

[[toc]]

# nginx record

## start nginx

```bash
start nginx
```

## check nginx conf

```bash
nginx -t -c ./conf/nginx.conf
```

## reload nginx

```bash
nginx -s reload
```

## stop nginx

```bash
nginx -s stop
```

## quit nginx

```bash
nginx -s quit
```

## vue router history mode

```nginx
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;
        location / {
            root C:\Users\wdd\Documents\dh-project\frame\dist;
            try_files $uri $uri/ /index.html;
        }

        location /aa/bb {
            alias C:\Users\wdd\Documents\dh-project\frame\dist;
            try_files $uri $uri/ /aa/bb/index.html;
        }
    }
}
```
