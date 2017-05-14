---
layout: post
title:  "用树莓派实现 HomeKit 控制台灯"
date:   2017-1-6 00:08
categories: 树莓派
permalink: /rpi-homekit-yeelight.html
---
* Do not remove this line (it will not be displayed) 
{:toc}

在看到少数派上的 [借助树莓派与 HomeBridge ，将 YeeLight 彩光灯接入 Apple HomeKit](http://sspai.com/36617) 一文后, 非常心动. 在暑假的时候关注过一阵子 yeelight, 那时实现的功能非常有限还不支持 IFTTT 就作罢没有买, 但到了12月后, yeelight 既有 IFTTT 又能玩 homekit, 于是立马下单了树莓派 3 和 yeelight.

树莓派可以理解为一台微型电脑 (开发板), 运行的是树莓派定制的 Rapbian, 虽然树莓派并不是性能最强也不是最有性价比的开发板, 但它的社区支持是最友好的 (毕竟面向的人群还包括儿童), 它出的杂志 MagPi 极度令人沉迷 (甚至能让我回忆起从前看大众软件的时光), 官方的教程和文档对新手非常友好 (只需要一点点英语基础就够), 作为对比让我们斜眼一下 [DragonBoard 410c](https://developer.qualcomm.com/hardware/dragonboard-410c/tutorial-videos), 任何出现的问题只要 Google 一下 Raspberry Pi + 关键词都能找到, 其配套的硬件软件也很出色, 例如 sense hat 可以直接配合自带的 sense hat emulator. 因此非常推荐任何对编程感兴趣的人入手.

本文用到的硬件如下:
1. 宜家 E27 螺孔台灯 RMB 99
2. yeelight 彩光版 RMB 89
3. 树莓派 3 Model B (同时配了外壳和散热片) RMB 206
4. 预先烧录好 NOOBS 的 Micro SD 卡
5. 网线
6. 有线鼠标
7. 戴尔显示器
8. Macbook Pro
9. iPhone 

## 配置树莓派
参考官方指南 [Raspberry Pi Software Guide](https://www.raspberrypi.org/learning/software-guide/) 烧录 Micro SD 卡. 把下载好的 [NOOBS for Raspberry Pi](https://www.raspberrypi.org/downloads/noobs/) 解压缩然后拷到 SD 卡上. 当然, 也可以直接烧录 Raspbian 到 SD 卡, 这样就不用忍受 NOOBS 安装的漫长时间, 直接插卡就能开机.

插入有线鼠标 (带 USB 发射埠的无线鼠标也可以, 凑活用就好, 之后可以在 Macbook 上使用 SSH 操作), Micro SD 卡, HDMI 线, 网线, Micro USB 电源, 然后就可以安装 Raspbian, 安装完毕后就能进入系统.

进入系统后, 点击左上角 Preferences - Raspberry Pi Configuration, 打开 SSH 和 VNC. 建议在这里顺便更改用户密码.

这时候就可以切回 Macbook, 打开终端 (我使用的是 iTerm2), 输入代码 `ssh pi@raspberrypi.local` 然后输入树莓派的密码, 连接树莓派.

![](http://ww2.sinaimg.cn/large/006tNc79gw1fbg76r9rl7j30oa0g1mzm.jpg)

更具体的操作方法, 请参考官方帮助页面 [Raspberry Pi Software Guide](https://www.raspberrypi.org/learning/software-guide/).
 
## 更换国内镜像源
由于国内访问树莓派服务器的不便, 因此需要更换为国内镜像, 这里我将 sources 的镜像更换为速度更快的阿里云, archive.raspberrypi.org 的镜像只找到中科大的, 因此使用了中科大的镜像.

```
sudo nano /etc/apt/sources.list
# 用 # 注释掉原有的 source, 输入阿里云镜像.
deb http://mirrors.aliyun.com/raspbian/raspbian/ jessie main non-free contrib
deb-src http://mirrors.aliyun.com/raspbian/raspbian/ jessie main non-free contrib
```

![](http://ww3.sinaimg.cn/large/006tNc79gw1fbg76t6uh7j30oa0g142p.jpg)

更换中科大镜像的方法一样, 但文件位置及名字不同.

```
sudo nano /etc/apt/sources.list.d/raspi.list
# 注释掉原来的, 输入中科大镜像
deb http://mirrors.ustc.edu.cn/archive.raspberrypi.org/ jessie main ui
```

![](http://ww4.sinaimg.cn/large/006tNc79gw1fbg76rmtg6j30oa0g1jtv.jpg)

更换好源后, 输入以下代码就可以不用忍受龟速更新系统了.
```
sudo apt-get update
sudo apt-get upgrade
```

## 安装 Node.js 及相关依赖
Homebridge 是一个用 node.js 开发的 HomeKit 服务器, 因此需要参考 [Running HomeBridge on a Raspberry Pi](https://github.com/nfarina/homebridge/wiki/Running-HomeBridge-on-a-Raspberry-Pi) 在树莓派上先安装 node.js, 由于国内网络问题, 仍然需要更换镜像.

```
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
# 更换为国内源
sudo nano /etc/apt/sources.list.d/nodesource.list
# 输入清华大学镜像
deb http://mirrors.tuna.tsinghua.edu.cn/nodesource/deb/ jessie main
deb-src http://mirrors.tuna.tsinghua.edu.cn/nodesource/deb/ jessie main
```

这时候就可以安装 node.js 以及其相关依赖了.
```
sudo apt-get install -y nodejs
sudo apt-get install libavahi-compat-libdnssd-dev
```

## 安装 homebridge 及相关依赖
Homebridge 属于 node.js 下的模块之一, 这时候需要用到 npm 安装, npm 的速度也是很令人着急, 但好在 npm 可以使用代理, 这里我们使用淘宝镜像下载 homebridge. 本步骤比较繁琐, 依旧参考 [Running HomeBridge on a Raspberry Pi](https://github.com/nfarina/homebridge/wiki/Running-HomeBridge-on-a-Raspberry-Pi).

```
# 在命令后添加 --registry=http://r.cnpmjs.org 使用国内 npm 镜像代理
sudo npm install -g --unsafe-perm homebridge hap-nodejs node-gyp --registry=http://r.cnpmjs.org
cd /usr/lib/node_modules/homebridge/
sudo npm install --unsafe-perm bignum --registry=http://r.cnpmjs.org
cd /usr/lib/node_modules/hap-nodejs/node_modules/mdns
sudo node-gyp BUILDTYPE=Release rebuild
```

这时候可以输入 `homebridge` 测试能否正常运行 homebridge, 如果一切顺利的话, 能看到 homebridge 一直运行且没有报错, 打开手机的家庭 app 添加配件就能看到 homebridge.

## 安装 homebridge-yeelight
记得打开 yeelight 的极客模式, 最新版本 (0.0.1.4) 的 [homebridge-yeelight](https://www.npmjs.com/package/homebridge-yeelight) 已经不需要更改 config.json 了, 因此直接输入以下代码就完成了配置, 能在手机里添加台灯了.
```
sudo npm install -g homebridge-yeelight --registry=http://r.cnpmjs.org
homebridge
```

## 开机启动
[Running HomeBridge on a Raspberry Pi](https://github.com/nfarina/homebridge/wiki/Running-HomeBridge-on-a-Raspberry-Pi) 上给出的添加启动项实在是太繁琐了, 我甚至因为这一步没弄明白重新刷了次机, 还顺便搞懂了.bashrc 和 rc.local 有什么区别. 事实上, 树莓派文档 [Scheduling tasks with Cron](https://www.raspberrypi.org/documentation/linux/usage/cron.md)  给出的方法是最简单且方便以后配置别的程序的.

```
# 先安装 cron
sudo apt-get install gnome-schedule
```

然后配置 cron.

```
crontab -e
```

在最下方添加 `@reboot homebridge &` 即可完成开机启动 homebridge 的配置. 再多嘴一句, cron 这个命令非常好用, 在 system tools 里有 GUI 界面, 还能让树莓派完成每周日运行 `sudo apt-get update sudo apt-get update` 这样的定时任务.

## 参考资料
[Scheduling tasks with Cron - Raspberry Pi Documentation (树莓派官方的资料真的非常友好)](https://www.raspberrypi.org/documentation/linux/usage/cron.md)

[Raspberry Pi Documentation](https://www.raspberrypi.org/documentation/)

[借助树莓派与HomeBridge，将 YeeLight 彩光灯接入 Apple HomeKit - 少数派](http://sspai.com/36617)

[小米网关接入Homekit完整教程，声控家中设备! - 小米社区官方论坛](http://bbs.xiaomi.cn/t-13198850)         
         