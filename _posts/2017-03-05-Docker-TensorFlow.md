---
layout: post
title:  "Docker + TensorFlow 入门、主题指南"
date:   2017-03-05 15:32
---

* Do not remove this line (it will not be displayed) 
{:toc}

Docker 是个非常轻量级的虚拟机，可以保证环境不影响代码的运行。

TensorFlow 官方在 Docker 上有镜像，可以直接下载。这几天研究了一点 Docker，感觉只看懂了一小角，也不知道对不对，就斗胆先写一些了。

## 镜像和容器
Docker Hub 上可以得到各种来源的镜像，这个镜像就像以前装系统的光盘或者 .iso，装载了这个系统最初始的状态。

Docker 可以帮助我们把这个镜像安装，变成我们可以使用的容器，在这个容器里随便折腾，折腾完了可以删掉，再从镜像新建一个新容器，这样可以保证以前的折腾不会影响现在的代码，队友的环境也可以和自己保持一致。

## 上手
本文以 Mac 为例，介绍如何上手 Docker。

### Homebrew 安装 Docker
如果有 homebrew，直接运行代码 `brew cask install docker` 即可安装 Docker，启动 Docker 后，Menu Bar 上会出现一只鲸鱼，也不是很明白鲸鱼和虚拟机有什么关系。

### Docker 加速器设置
因为国内的垃圾网络，最好装加速器来减少下载镜像的等待时间，我用了号称永久免费的 [DaoCloud](https://www.daocloud.io/)，在得到镜像地址后，在 Docker 中如图所示设置。

![](images/屏幕快照 2017-03-05 下午2.57.26.png)

### TensorFlow 镜像安装
启动 Docker，然后终端运行以下命令，即可从 Docker Hub 上下载 TensorFlow 镜像。

```
docker run -it -p 8888:8888 tensorflow/tensorflow
```

如果你想要和你的容器共享文件，那么最好用这个命令：

```
docker run -it -p 8888:8888 -v ~/pathe/to/folder/you/wannna/share:/portal tensorflow/tensorflow
```

从你的容器访问 `/portal` 文件夹，就是你电脑上的 `~/pathe/to/folder/you/wannna/share` 文件夹。`/portal` 这个名字可以随便改，不过我觉得叫 `/portal` 还蛮酷的。

如果一切顺利的话，你就可以打开终端的链接，从浏览器访问 Jupyter Notebook 了。

### Docker 关键命令
使用 `docker images` 查看装了哪些镜像：

![](images/屏幕快照 2017-03-05 下午3.05.15.png)

使用 `docker rmi <image name or tag or ID whatever>` 可以删除镜像。

使用 `docker ps` 查看正在运行的容器（图中没有正在运行的容器）：

![](images/屏幕快照 2017-03-05 下午3.07.15.png)

使用 `docker ps -a` 查看所有的容器：

![](images/屏幕快照 2017-03-05 下午3.08.37.png)

使用 `docker rm <container name or tag or ID whatever>` 可以删除容器。

如果觉得一个一个删太烦，运行 `docker rm $(docker ps -a -q)`删除所有容器。

若要停止容器（比如端口被占），运行 `docker stop <container name or tag or ID whatever>`。启动容器运行 `docker start <container name or tag or ID whatever>`。

好的，现在到关键部分了！当我启动了一个 TensorFlow 容器后，我该怎么开始运行 Jupyter Notebook 呢？运行`docker start -i <container name or tag or ID whatever>` 就可以了！

在 notebook 里测试一下 `/portal` 是否正常，可以运行：

```
!ls /portal/
```

如果你和一样用的是 oh-my-zsh，你可以在 zshconfig 里加上这两个 alias 方便以后使用：

```
# 新建容器并从 /portal 传输文件
alias tfdocker="docker run -it -p 8888:8888 -v ~/Coding/DeepLearning101:/portal tensorflow/tensorflow"

# 启动 ID 为 a4032edb39cb 的容器并开启 Jupyter Notebook
alias startdocker="docker start -i a4032edb39cb"
```

## Jupyter Notebook 主题更改
用了新编辑器怎么可以不换主题，在 Jupyter Notebook 中，以感叹号开头运行命令就是终端指令。在 notebook 中运行：

```
!pip install --upgrade jupyterthemes
```

如果一切顺利（在中国的垃圾网络下怎么可能顺利，你可能要多试几次），你就可以参考[GitHub - dunovank/jupyter-themes 文档](https://github.com/dunovank/jupyter-themes) 做主题调整了。我输入的命令是：

```
# 用 solarized-light 主题，代码字体是 inputmono，字号 12 点，界面字体 sourcesans，输出字体 sourcesans，开启工具栏，开启标题栏
!jt -t solarized-light -f inputmono -fs 12 -nf sourcesans -tf sourcesans -T -N
```

结果如图：

[image:BBEDC019-FC9E-47FF-8BF8-32F771697B38-1965-0000072987BC43E4/vPAAAAAElFTkSuQmCC.png]




































#博客