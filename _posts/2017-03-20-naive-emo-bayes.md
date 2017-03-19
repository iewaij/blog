---
layout: post
title:  "机器如何判断句子的情绪？"
date:   2017-03-20 01:18
---

* Do not remove this line (it will not be displayed) 
{:toc}

生成博文的时候公式排版有问题，我也不知道怎么修复，如果你遇到式子乱码的问题，请移步我的 [GitHub 笔记](https://github.com/iewaij/machine-learning-lab/blob/master/Naive_Bayes/note/Naive_Emo_Bayes_Notes.ipynb) 和[代码](https://github.com/iewaij/machine-learning-lab/blob/master/Naive_Bayes/code/Naive_Emo_Bayes.ipynb)，多谢包涵！

## 贝叶斯推断
P(x, y) = P(x|y) × P(y) = P(y|x) × P(x)

P(x, y) 指 x 与 y **同时出现**的联合概率。

P(x|y) 指在 y 条件下，x 出现的概率。P(x|y) × P(y) 即意味着产生 y 条件的概率乘上 y 条件下 x 出现的概率，就能得到 x 与 y **同时出现**的联合概率，这很好理解。

P(y|x) 同理。

通过移项，P(x|y) = P(y|x) × P(x)  /  P(y)

举个例子，假设全中国只有一所大学，参加高考的人数为 n，考生是水货的概率是 0.9，水货通过高考的概率是 0.01，非水货通过高考的概率是 0.9。那么新学年这所大学的大一水货有多少呢？

首先我们有四种情况，水货通过 P(sb, pass) ，水货不通过  P(sb, nopass)，非水货通过 P(nosb, pass)，非水货不通过  P(nosb, nopass)，且这四种情况的概率和是1。

我们知道了 P(sb), P(nosb), P(pass|sb), P(pass|nosb)，需要计算在已经通过高考的条件下，水货的概率，你可以理解为把条件和事件互换，也就是 P(sb|pass)。

考生是水货的概率是 0.9，P(sb) = 0.9。考生是非水货的概率就是 0.1，P(nosb) = 0.1。如果考生是水货，那么通过的概率是 0.01，P(pass|sb) = 0.01，那么水货通过的概率 P(sb, pass) = P(sb) × P(pass|sb) = 0.009。如果考生不是水货，那么通过的概率是 0.9，P(pass|nosb) = 0.9，P(nosb, pass) = P(nosb) × P(pass|nosb) = 0.09。

因为新学年这所大学里的大一新生只有两种情况：水货通过 P(sb, pass) ，非水货通过 P(nosb, pass)。我们可以计算水货通过 P(sb, pass) 和非水货通过 P(nosb, pass) 的比例，是 0.009:0.09，这两种情况的**概率和是1**，这样就能算出通过高考的条件下，水货的概率 = 0.009 / (0.009+0.09) = 0.09，也就是 9% 了。

用贝叶斯公式，其实就是上面那个方法，只是看公式很难从直觉上理解这个公式。

P(sb, pass) + P(nosb, pass) = P(pass) = 0.009+0.09
P(sb|pass) = P(pass|sb) * P(sb) / P (pass)  = 0.09

更详尽的解释，可以参考阮一峰写的文章：

[贝叶斯推断及其互联网应用（一）：定理简介](http://www.ruanyifeng.com/blog/2011/08/bayesian_inference_part_one.html)
[贝叶斯推断及其互联网应用（二）：过滤垃圾邮件](http://www.ruanyifeng.com/blog/2011/08/bayesian_inference_part_two.html)
[朴素贝叶斯分类器的应用](http://www.ruanyifeng.com/blog/2013/12/naive_bayes_classifier.html) 

## 独立事件
老李的老婆生了三个小孩，都是女孩，现在老李的老婆又怀孕了，女孩的可能性大还是男孩的可能性大？

只要不是文盲，正常人都会说一样大，因为每次怀孕都是一次独立事件，事件与事件之间不会相互影响。

在 x 的条件下，y 发生的概率与 x 无关，可得：
P(y|x) = P(y)
P(x, y) = P(x) × P(y|x) = P(x) × P(y)

## 使用贝叶斯分类器判断句子的情绪
每个句子都会有一种情绪，人理解句子是完全出于直觉的，但机器不行。一种方法是使用概率，这个句子对应情绪 a, b, c, d 的概率分布是多少？如果这个对应情绪 a 的概率最高，那么机器就认为这个句子带有情绪 a。

我们可以把这个概率理解为在句子 S 条件下， 代表正面情绪 y = positive的概率，即 P(y=positive|S)，其中 S 可以分解成词，即 P(y=positive|W1, W2, W3… Wn)。

P(y=positive|S) = P(y=positive|W1) × P(y=positive|W2) × P(y=positive|W3) × … × P(y=positive|Wn) 成立吗？答案是不能，现在我给出证明：

通过贝叶斯公式，可得
P(y=positive|S) = P(y=positive) × P(S|y=positive) / P(S)

S = W1, W2, W3… Wn
P(S) = P(W1, W2, W3… Wn)
P(S|y=positive) = P(W1, W2, W3… Wn|y=positive)

我们先简化情况，假设 W1, W2, W3… Wn 都是不关联的独立事件，独立事件意味着第一个词不会影响第二个词的出现的概率，在现实情况下，这当然不可能，但这个简化不会太影响效果。

P(S) = P(W1, W2, W3… Wn) = P(W1) × P(W2) × P(W3) × … × P(Wn)
P(W1, W2, W3… Wn|y=positive) = P(W1|y=positive) × P(W2|y=positive) × P(W3|y=positive) × … × P(Wn|y=positive)

因此等号左边 P(y=positive|S) = P(y=positive) × P(W1, W2, W3… Wn|y=positive) / P(S) = P(y=positive) × ~~P(W1, W2, W3… Wn|y=positive)~~ **P(W1|y=positive) × P(W2|y=positive) × P(W3|y=positive) × … × P(Wn|y=positive)** / **P(S)**

再看等号右边，P(y=positive|W1) = P(W1|y=positive) × P(y=positive) / P(W1)，因此 P(y=positive|W1) × P(y=positive|W2) × P(y=positive|W3) × … × P(y=positive|Wn) = **P(W1|y=positive) × P(W2|y=positive) × P(W3|y=positive) × … × P(Wn|y=positive)** × P(y=positive)^n / [P(W1) × P(W2) × P(W3) × … × P(Wn)] = **P(W1|y=positive) × P(W2|y=positive) × P(W3|y=positive) × … × P(Wn|y=positive)** × P(y=positive)^n / **P(S)**

等号左右边加粗的式子约掉，左边剩 P(y=positive)，右边剩 P(y=positive)^n，因此等式不成立。正确的简化应该是等式左边：

P(y=positive|S) = P(y=positive) × P(W1|y=positive) × P(W2|y=positive) × P(W3|y=positive) × … × P(Wn|y=positive) / P(S)

## 洞察式子
观察这个式子，我们可以得出以下一些看法：
- 分母 P(S) 并不重要，因为我们比较的是相同条件S下，各个情绪的概率。
- P(y=positive) 是该情绪在语料库下的整体概率，如果语料库和应用场景的情绪概率不一致的话，模型很有可能出错。例如京东上的商品评价正面情绪更多，淘宝的商品评价正负面情绪对半开，如果用京东的商品评价训练模型，是无法应用在淘宝商品上的。
- P(Wn|y=positive) 是在正面语料库中，Wn 出现在该语料中的概率，使用结巴分词，Counter() 计数就可以了。

## 代码实现
- 结巴分词，得到列表。
- Counter() 计数，归一化得到概率。
- 输入句子，用结巴分词，分别计算正面和负面的概率。

## 问题
具体实现还会有两个问题。一个是 Python 的浮点数精度问题，这个可以把概率转换成对数，对数相加就是概率相乘。另一个问题是测试时，有的句子根本不在训练集里，这时候可以用拉普拉斯平滑，有点深奥（其实是我也没明白其本质），先不讲了。
