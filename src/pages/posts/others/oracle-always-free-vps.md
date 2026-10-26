---
title: 记录Oracle永久免费vps折腾
date: 2026-10-24 22:30:50
tags:
  - 云服务
categories:
  - 其他
id: oracle-always-free-vps
---

[[toc]]

# 记录Oracle永久免费vps折腾

几年前就知道Oracle有永久免费的vps，之前办visa卡的时候也申请过，但试了好几次都是abc。
这次正好办了一张2233卡，也正好看到X上说Oracle放水就尝试注册了。没想到真通过了。

我用手机电信卡的流量注册，没开vpn，信息基本都是真实的填上去。算是运气不错。

我随便选了一个大阪的区域，然后服务器只开了一个e2，1cpu1g，对我来说够用了，对永久免费应该是最稳的一个。

申请完之后就有点索然无味了，自己虽然有些一些小网站但基本都部署在cloudflare上面，免费额度目前完全够用。
甚至cloudflare worker可以有后端，配合上d1 r2数据库存储也都有了。

想来想去还是搞个代理吧哈哈哈，看了一下很多人都用3x-ui，就顺手安装了一个。

但是也不知道要配什么节点，就都让ai去操作了。

我把ssh连接私钥的地址发给ai，直接让它通过私钥ssh命令去服务器玩了。

还开了一个3x-ui控制台的浏览器让它自己操作。

ai一开始推荐了`vless`+`reality`，创建了一个节点，但是尝试mihomo和sing-box都连不上，怀疑可能是xray版本太新了，但也懒得降级了，就用`vless`+`websocket`+`tls`，这样既可以走cloudflare黄云代理，也可以直连服务器。
区别就是你客户端的写法。

至于域名我直接在dnshe加了一个de5.net的免费域名托管到cloudflare了。

但我现在手上有几个订阅链接，还想加上新服务器的节点，于是我让ai写了一个本地配置文件整合。

核心就是整合订阅链接到一个配置。分组的只有一个ai。(不少配置都用random，example.com等代替了，不用照抄，反正我是觉得你有什么想法都可以和ai提)

```yaml
# ============================================================
#  mihomo 配置 —— 自建节点 + 机场订阅合并
#  只保留两个核心分组：节点选择 / AI
#  依赖：mihomo 内核（Bettbox / Clash Verge / FlClash 均可）
# ============================================================

mixed-port: 7890
allow-lan: false
mode: rule
log-level: info
ipv6: false
unified-delay: true
tcp-concurrent: true
find-process-mode: strict

external-controller: 127.0.0.1:9090

profile:
  store-selected: true
  store-fake-ip: true

dns:
  enable: true
  ipv6: false
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  fake-ip-filter:
    - '+.example.com'
    - '*.lan'
    - '*.local'
    - 'time.*.com'
    - 'ntp.*.com'
    - '+.market.xiaomi.com'
  default-nameserver:
    - 223.5.5.5
    - 119.29.29.29
  nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
  proxy-server-nameserver:
    - https://dns.alidns.com/dns-query
    - 223.5.5.5

# ============================================================
#  订阅源：把 url 换成你自己的机场订阅链接
#  path 是本地缓存文件名，改名字避免冲突
# ============================================================
proxy-providers:
  订阅A:
    type: http
    url: 填写url
    interval: 3600
    path: ./providers/jc-a.yaml
    health-check:
      enable: true
      url: https://www.gstatic.com/generate_204
      interval: 300
    # 过滤掉机场塞进来的"剩余流量""到期时间""官网"这类垃圾节点
    exclude-filter: '剩余|到期|过期|官网|网址|订阅|流量|客服|群|机场|TG|电报|通知|公告|防失联|备用|回国|游戏'

  订阅B:
    type: http
    url: 填写url
    interval: 3600
    path: ./providers/jc-b.yaml
    health-check:
      enable: true
      url: https://www.gstatic.com/generate_204
      interval: 300
    exclude-filter: '剩余|到期|过期|官网|网址|订阅|流量|客服|群|机场|TG|电报|通知|公告|防失联|备用|回国|游戏'

# ============================================================
#  自建节点（Oracle 大阪）
#  名字带 🇯🇵 方便肉眼识别，不需要地区分组也能一眼区分
# ============================================================
proxies:
  # ── WS + TLS 直连：延迟最低 ──
  - name: 🇯🇵 JP-WS-直连
    type: vless
    server: 123.123.123.123
    port: 8443
    uuid: random
    network: ws
    udp: true
    tls: true
    servername: ws.example.com
    ws-opts:
      path: /random
      headers:
        Host: ws.example.com

  # ── WS + TLS 套 Cloudflare：抗封锁 ──
  - name: 🇯🇵 JP-WS-CF
    type: vless
    server: ws.example.com
    port: 8443
    uuid: random
    network: ws
    udp: true
    tls: true
    servername: ws.example.com
    ws-opts:
      path: /random
      headers:
        Host: ws.example.com

  # ── Reality：当前 mihomo 内核不兼容，等修复 ──
  - name: 🇯🇵 JP-Reality
    type: vless
    server: e2.example.com
    port: 443
    uuid: random
    network: tcp
    udp: true
    tls: true
    flow: xtls-rprx-vision
    servername: www.cloudflare.com
    client-fingerprint: chrome
    reality-opts:
      public-key: random
      short-id: random
      spider-x: /random

# ============================================================
#  策略组：只要两个
#  proxies 里的排在前面，use 里的机场节点接在后面
# ============================================================
proxy-groups:
  # ── 组1：节点选择（手动） ──
  - name: 节点选择
    type: select
    proxies:
      - 🇯🇵 JP-WS-直连
      - 🇯🇵 JP-WS-CF
      - 🇯🇵 JP-Reality
      - 自动选择
    use:
      - 订阅A
      - 订阅B

  # ── 自动测速（不单独出现在规则里，只作为节点选择的一个选项） ──
  - name: 自动选择
    type: url-test
    url: https://www.gstatic.com/generate_204
    interval: 300
    tolerance: 50
    proxies:
      - 🇯🇵 JP-WS-直连
      - 🇯🇵 JP-WS-CF
    use:
      - 订阅A
      - 订阅B

  # ── 组2：AI ──
  - name: AI
    type: select
    proxies:
      - 节点选择
      - 🇯🇵 JP-WS-直连
      - 🇯🇵 JP-WS-CF
      - 🇯🇵 JP-Reality
    use:
      - 订阅A
      - 订阅B

  # ── 直连组（隐藏，仅供规则引用） ──
  - name: 直连
    type: select
    proxies:
      - DIRECT
    hidden: true

# ============================================================
#  规则集
# ============================================================
rule-providers:
  # 私有网络
  private:
    type: http
    format: mrs
    behavior: domain
    interval: 86400
    url: https://cdn.jsdmirror.com/gh/appshubcc/bett-rules@meta/geo/geosite/private.mrs
    path: ./ruleset/private.mrs
  private_ip:
    type: http
    format: mrs
    behavior: ipcidr
    interval: 86400
    url: https://cdn.jsdmirror.com/gh/appshubcc/bett-rules@meta/geo/geoip/private.mrs
    path: ./ruleset/private_ip.mrs

  # 国内域名
  geolocation-cn:
    type: http
    format: mrs
    behavior: domain
    interval: 86400
    url: https://cdn.jsdmirror.com/gh/appshubcc/bett-rules@meta/geo/geosite/geolocation-cn.mrs
    path: ./ruleset/geolocation-cn.mrs

  # 国内 IP
  cn_ip:
    type: http
    format: mrs
    behavior: ipcidr
    interval: 86400
    url: https://cdn.jsdmirror.com/gh/appshubcc/bett-rules@meta/geo/geoip/cn.mrs
    path: ./ruleset/cn_ip.mrs

  # AI 服务域名（复用 MyClash 的规则集）
  ai:
    type: http
    format: mrs
    behavior: domain
    interval: 86400
    url: https://cdn.jsdmirror.com/gh/appshubcc/bett-rules@meta/geo/geosite/category-ai-!cn.mrs
    path: ./ruleset/ai.mrs

  # 国外域名（兜底代理）
  geolocation-!cn:
    type: http
    format: mrs
    behavior: domain
    interval: 86400
    url: https://cdn.jsdmirror.com/gh/appshubcc/bett-rules@meta/geo/geosite/geolocation-!cn.mrs
    path: ./ruleset/geolocation-!cn.mrs

# ============================================================
#  规则（从上往下匹配，命中即停）
# ============================================================
# 注意：个人偏好规则（直连白名单 / 指定走节点 / 广告拦截）
# 全部由 clash-custom-rule.js 在客户端注入，这里不再重复维护。
# 该脚本会把规则插到 rules 最前面，优先级高于本文件所有规则。
rules:
  # ── 0. 结构性保险：让 Clash 自己解析并连上服务器 ──
  #    这两条不是个人偏好，是防止节点流量自己套自己（死循环）
  - IP-CIDR,123.123.123.123/32,DIRECT,no-resolve
  - DOMAIN-SUFFIX,example.com,DIRECT

  # ── 1. 私有网络直连 ──
  - RULE-SET,private,直连
  - RULE-SET,private_ip,直连
  - IP-CIDR,127.0.0.0/8,DIRECT,no-resolve
  - IP-CIDR,192.168.0.0/16,DIRECT,no-resolve
  - IP-CIDR,10.0.0.0/8,DIRECT,no-resolve
  - IP-CIDR,172.16.0.0/12,DIRECT,no-resolve

  # ── 2. AI 走 AI 组（必须在 CN 直连之前） ──
  - RULE-SET,ai,AI

  # ── 3. 国内直连 ──
  - RULE-SET,geolocation-cn,直连
  - RULE-SET,cn_ip,直连,no-resolve

  # ── 4. 国外域名走节点 ──
  - RULE-SET,geolocation-!cn,节点选择

  # ── 5. 兜底 ──
  - GEOIP,CN,直连
  - MATCH,节点选择
```

再配合上我自己写过的一个覆写脚本，可以对任意配置加上自定义规则。并且可以除了DIRECT、REJECT还可以写PROXY、ai分组，会自动选到对应分组，如`节点选择`。像我最常用的就是l站，还有公益站中转都走ai分组。

```js
function main(config) {
  // === 用户配置区：写标准 Clash 规则字符串及自定义策略 ===
  const customRules = [
    'IP-CIDR,123.123.123.123/32,DIRECT,no-resolve',
    'DOMAIN-SUFFIX,example.com,DIRECT',
    'DOMAIN-SUFFIX,hybgzs.com,DIRECT',

    'DOMAIN-SUFFIX,example.cn,PROXY',

    'DOMAIN-SUFFIX,linux.do,ai',

    'DOMAIN-KEYWORD,adobe,REJECT',
    'DOMAIN-KEYWORD,parallels,REJECT',
  ]

  // === 步骤1：查找主代理组名（用于替换 PROXY 及作为兜底降级）===
  let mainProxyGroup = 'PASS' // 默认兜底

  if (config['proxy-groups']) {
    const preferredNames = ['PROXY', 'Proxy', '代理', '🚀 节点选择', '节点选择', 'Default']
    for (const name of preferredNames) {
      if (config['proxy-groups'].some(g => g.name === name)) {
        mainProxyGroup = name
        break
      }
    }

    if (!mainProxyGroup) {
      const fallback = config['proxy-groups'].find(g =>
        ['select', 'url-test', 'fallback'].includes(g.type)
      )
      mainProxyGroup = fallback ? fallback.name : 'PASS'
    }
  }

  // === 步骤2：定义内置策略白名单 ===
  const BUILTIN_POLICIES = new Set([
    'DIRECT',
    'REJECT',
    'REJECT-DROP',
    'REJECT-TINYGLOB',
    'PASS',
    'COMPATIBLE',
    'NONE'
  ])

  // === 步骤3：处理每条规则 ===
  const processedRules = customRules.map((ruleStr) => {
    const parts = ruleStr.split(',')

    // 非法规则（不足3段），原样返回
    if (parts.length < 3)
      return ruleStr

    const currentPolicy = parts[2].trim()
    const currentPolicyUpper = currentPolicy.toUpperCase()

    if (currentPolicyUpper === 'PROXY') {
      // 情况 A：PROXY 替换为主代理组
      parts[2] = mainProxyGroup
    }
    else if (BUILTIN_POLICIES.has(currentPolicyUpper)) {
      // 情况 B：内置策略，保持原样

    }
    else {
      // 情况 C：自定义关键字（如 AI），进行模糊匹配
      const proxyGroups = config['proxy-groups'] || []
      const matchedGroup = proxyGroups.find(g =>
        g.name && g.name.toLowerCase().includes(currentPolicy.toLowerCase())
      )

      if (matchedGroup) {
        parts[2] = matchedGroup.name // 匹配成功，替换为具体分组
      }
      else {
        // 🛡️ 匹配失败，降级为主代理组，防止 Clash 加载报错
        parts[2] = mainProxyGroup
      }
    }

    return parts.join(',')
  })

  // === 步骤4：插入到 rules 最前面 ===
  if (!config.rules)
    config.rules = []
  config.rules = [...processedRules, ...config.rules]

  return config
}
```

感觉现在真好，几年前折腾服务器的时候还要上网各种找教程，配置，一步步手动操作。现在不管是配置还是排查，基本都能直接扔给ai，让它给你搭建好环境，ai还是太方便了。
