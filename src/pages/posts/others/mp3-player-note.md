---
title: 大三实训 MP3 播放器 硬件
date: 2019-07-04 14:40:25
tags:
  - 硬件
categories:
  - 其他
id: mp3-player-note
---

[[toc]]

# 大三实训 MP3 播放器 硬件

## 命名规范

1. 驼峰命名法

   - 一组单词表示函数、变量的实际作用

   - 每个单词首字母大写
   - 变量、函数：首字母小写
   - 结构体、枚举：首字母大写

2. 匈牙利命名法
   - 显示框 -- iSum
   - 求和按钮 -- btnSum
   - int -- i
   - bool -- b
   - string -- s
   - \* - - p
   - const -- c_

## 基于AVR的音乐播放器的设计与实现

1. 团队协作 Team Building
2. 项目开发流程
3. 熟悉C、C语言单片机开发技术

### 团队建设

1. 组长、经理
   - 项目经理
   - 项目组长
2. 组员
   - 产品
   - 硬件开发
     - 主板 - 电路设计人员 - PCB
       - 硬盘
         - SSD
           - 英特尔
           - 三星
           - ……
         - HHD
     - 驱动开发人员 - BIOS
   - 软件开发
   - 设计人员
     - 设计产品的功能
     - 设计产品的界面
     - 完成文档
     - 产品发布
   -
   -
   - 8 ~ 9 人一组 10:15
   - 9 - 12  2 - 5:30 3:30
   - 6:30 - 8:30
   -
   -
   - 3周
   - C语言基础、单片机基础驱动、
   - 项目搭建与实现：音频播放芯片、显示屏
   - 项目逻辑实现：控制、播放
3. 音乐播放器
   - 评审、调研项目 - 项目确认
     - 公司负责人
     - 财务工作人员
     - 技术总监
     -
     - 技术
     - 成本
     - 效益
   - 开发团队
     - 领导 - 经理、组长
     - 产品
     - 设计
   - 需求确认
     - 需求分析报告
       - 功能
     - 功能确认表/工作量
     - 原型设计
   - 设计
     - 数据设计
     - 用例
   - 编码
     - 注释
       - 接口的说明
       - 参数，逐条说明：类型，作用，内存使用
       - 返回值，类型，作用，内存使用
     - 接口
       - 规范
   - 测试
     - 白盒测试
       - 常规数据测试
       - 边界数据 / 极限数据
     - 黑盒测试
       - 隐藏内部实现
       - 功能测试
     - 扩大测试范围
   - 交付
   - 运维

## 音乐播放器

1. 控制

   - 控制方式
     - 按键 - 6
     - 红外遥控
     - 串口

   - 播放/暂停
     - 播放
     - 停止
     - 暂停
   - 歌曲切换
     - 上一首
     - 下一首
     - 模式切换
       - 单曲循环
       - 随机循环
       - 顺序循环
   - 音量调节
     - 音量增加
     - 音量减少
     - 静音
   - 歌曲列表跳转
   - 播放进度跳转
     - 快进
     - 快退
   - 收藏歌曲
   - 屏幕背光开关

2. 显示

   - 开机动画
   - 播放列表
     - 歌曲名称
     - 歌手
     - 时长
     - 状态
   - 当前正在播放的歌曲
     - 名称
     - 进度条
     - 时间
   - 歌词显示
   - 运行状态

### UVRT

### GPIO 输入输出I/O

### 用途

- UASRT GSM Wi-Fi 蓝牙 GPRS 窄带物联网

- LCD GPIO（8位并行）

- VS1003 SPI GPIO

- 红外

### DDRxn寄存器

- 1 = 输出
- 0 = 输入

### PORTxn寄存器

- 1 = 引脚输出高电平 上拉电阻使能
- 0 = 引脚输出低电平 上拉电阻去使能

### PINxn

- 读取引脚电平变化（输入状态）

```c
//pc3输出高电平
DDRC |= 0x08;
PORTC |= 0x08;
//pc4输出低电平
PORTC &= 0xEF;
//pc0134输出高电平
DDRC |= (1 << 0) | (1 << 1) | (1 << 3) | (1 << 4);
//pc2567输出低电平
DDRC &= ~((1 << 2) | (1 << 5) | (1 << 6) | (1 << 7));
```

## 模块

1. GPIO-LED : led.h/led.c

   ```c
   //Led初始化
   void ledInit();
   //Led亮
   void ledOpen();
   //Led灭
   void ledClose();
   ```

2. TOOL-DELAY : delay.h/delay.c

   ```c
   //按毫秒延时
   //@param u16 time 要延时的毫秒数
   void delay_ms(u16 time);
   //按微秒延时
   //@param u16 time 要延时的微秒数
   void delay_us(u16 time);
   ```

3. TOOL-SYSTEM : system.h

   ```c
   //char ---> s8
   //short ---> s16
   //long ---> s32
   //unsigned char ---> u8
   //unsigned short ---> u16
   //unsigned long ---> u32
   ```

4. GPIO-KEY : key.h/key.c

   ```c
   //按键初始化
   void keyInit();
   //获取当前按键状态
   //@return u8 S1~S6 对应0~5位
   //             按下为1，抬起为0
   u8 getKeyValue();
   ```

5. USART : usart.h/usart.c

   ```c
   //串口初始化
   //波特率、帧结构、功能开关
   //@param ubrr 决定串口的波特率
   void usartInit(u16 ubrr);
   //数据发送
   //@param data 要发送的数据
   void usartTransmit(u8 data);
   //通过串口发送字符串
   void usartTransmitString(s8 * str);
   //通过串口发送数字
   void usartTransmitNumber(s32 num);
   //接受中断服务函数
   //ISR(USART_RXC_vect);
   ```

## USART

UCSRA = 0

UCSRB = 1 << RXCIE | 1 << RXEN | 1 << TXEN

UCSRC = 1 << URSEL | 1 << UCSZ1 | 1<< UCSZ0

UBRRH/UBRRL

u16 ubrr = 383

UBRRL = ubrr

UBRRH = ubrr >> 8

串口配置

- 波特率
- 帧结构
  - 数据位 - 8
  - 停止位 - 1
  - 校验位 - 0
- 功能使能

发送、接受

## LCD12864

- 128 x 64 像素
- 8 x 4 汉字
- 并行通信
- 通信内容
  - 在第一行显示“你好”
  - RS :
    - 指令：L
      - 坐标设置
    - 数据：H
      - 你好
  - RW :
    - 写入：L
    - 读取：H
  - EN :
    - 操作屏幕，使能
- 初始化
  - 设置基本指令集
  - 清空
  - 显示打开
  - 地址归位
- 写指令
  - 等待LCD空闲
  - RS_L
  - RW_L
  - EN_H
  - 延时
  - 指令写入
  - EN_L
- 等待LCD空闲：
  - RS_L
  - RW_H
  - EN_H
  - 延时
  - 读取BF状态
  - EN_L

### 7/9任务

1. 显示图片

2. LCD：void lcdDispProgrees(u8 pos);//进度条

3. 界面设计

   1. 每个界面完成一个单独的接口

      \*name1 \*name2 \*name3 pos

   2. 完成静态

   3. 文档说明每个界面具体可以显示的内容

4. LCD模块 详细设计说明书

## mp3步骤

1. 初始化驱动
2. 加载播放列表
3. 功能选择
   1. 控制

### 6天

1. 列表存储与加载
2. 播放控制
3. 进度条显示
4. 串口同步
5. 上下位机歌词显示

### 运行流程

- 初始化
  - 硬件初始化
  - 显示开机界面
  - 挂载文件系统
  - 加载播放列表
    - 歌曲名字
    - 歌曲总数
- 运行
  - 功能选择
    - 播放
    - 浏览列表
  - 播放
    - 确定要播放的歌曲序号
      - 顺序-0
    - 根据序号获取歌曲名称
      - 打开文件
      - 播放
        - 按键检测
          - 判断跳转标记量
            - 标记量清空
            - break;
        - 向VS1003发送数据
        - 判断歌曲是否结束
        - next();

### 控制模块

Control : control.h/control.c

```c
//初始化
void init();
//运行
void start();
//初始化播放列表
//确定歌曲总数
void updatePlaylist();
//根据歌曲序号获取歌曲名称
void getMusicName(u16 musicIndex, u8 *musicName);
//memcpy();
//下一首
void next();
//上一首
void prev();
//按键检测
//getKeyValue()
//u8 temp = infValue;
//infValue = 0;
void keyCheck();
```
