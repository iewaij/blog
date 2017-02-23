---
layout: post
title:  "QM 自学指引"
date:   2017-02-23 22:06
---

* Do not remove this line (it will not be displayed) 
{:toc}

大家今天上完 Paolo 的 QM 感觉酸爽吗？

我在看完这门课给出的课件后倒吸一口凉气，把大学半学期的微分课程压缩到4小时讲完，lecture 上 Paolo 给出的 module outline 也不知道大家有没有什么概念，单变量和多变量微分、优化、概率论、统计齐了，虽然没有线性代数和积分，但在我看来这样的安排已经够恐怖。

如果你是理科生，那么微分 Lecture 1 和大部分概率论应该没什么特别大的问题（只要你没忘），提前浏览课件，自己证明一下，然后把不会的标注出来或者自己 Google。

如果你是文科生，我觉得基本是完了。这门课太紧凑了，5分钟给完证明然后接下来5分钟就讲推论，证明的解释有多反人类我就不说了，证明过程也不给多少时间思考，证明完也不练习，安排太不合理了，大家期末写 feedback 的时候提一下吧。

当然，不管你高中的基础如何，第一周 lecture 后应该还是要跪，鄙人因为酷爱写代码在大二上学期的时候自学了微积分（上完第一节课已经默默开始自学统计学了），就不识好歹地在这里写个自学指引（优化我还没接触，就不放了），让我们一起开开心心地被数学和 Paolo 虐。

## 微积分
最好的学习方式是公开课，我不太建议看书，因为公开课是用动画、板书配合讲师讲解，理解效率会比较高。教科书给出的证明更适合已经入门的人，也更加严谨，我一般想不起来证明的时候才会翻书。

### 单变量和多变量微积分

[MIT: 18.01.1x Calculus 1A: Differentiation](https://courses.edx.org/courses/MITx/18.01.1x/2T2015/info)
 
![](http://lijiawei.cc/images/edx-mit-calculus.png)

这门课只有4单元，一个单元接近2小时，讲得太好了，基于直觉，引人入胜。把微分讲得透透的，每一步都有严谨有趣的证明，甚至包括 e^x 的导数为什么是它本身，还讲了多变量微分中的 implicit differentiation 和一点点微分方程。

### 泰勒展开

泰勒展开可以把任意函数用多项式表示，比如三角函数 sin(x) 的展开就是这样：

![](http://lijiawei.cc/images/sinx.svg)

数学家之所以发明了这个方法，是因为研究多项式能大大简化工作。

[单变量微积分：第一部分](https://www.coursera.org/learn/single-variable-calculus/home)

这门课虽然也是微积分导论课，但直接从泰勒展开切入，视角独特，但不是很出于直觉，整个推导都是基于欧拉公式。

[MIT: 18.01.3x Calculus 1C: Coordinate systems and infinite series](https://courses.edx.org/courses/MITx/18.01.3x/1T2016/info)

是 MIT 单变量微积分第三部分的课，我没上过就不评论了。

### 如果你需要一本教科书

知乎上有蛮多推荐的，大家还是找最适合自己的，比如你觉得北大的数学分析简洁干净习题难那我也觉得蛮好的。

[普林斯顿微积分读本](https://book.douban.com/subject/4926707/)

好书，哪怕你没有三角函数的基础（或者基础忘光了），你也可以入门，里面包含了泰勒级数的内容，如果你觉得实在没时间看公开课的话，用这本学也不是不可以。

Calculus by Ron Larson, Bruce H. Edwards

在 [知乎](https://www.zhihu.com/question/32729130) 上被赞誉为「被多数学生评为最适合自学的微积分教材」，我的感觉是<del>图片还是蛮多的</del>字体舒服阅读体验好，不过大部分英文原版教材都不错啦，大家去图书馆随便借本也够用的。

## 统计
### 编程相关

如果你有编程基础或者学习一点点编程（R 语言编程非常简单我保证），[UTAustinX: UT.7.11x Foundations of Data Analysis - Part 1](https://courses.edx.org/courses/course-v1:UTAustinX+UT.7.11x+3T2016/info) 和 [UTAustinX: UT.7.11x Foundations of Data Analysis - Part 2](https://courses.edx.org/courses/course-v1:UTAustinX+UT.7.21x+3T2016/info) 是评价最好的，20小时的内容包含了统计和 R 语言入门，Lab 体验超棒。

如果你更喜欢用 Python，那么还有 [MIT: Computational Probability and Inference](https://www.edx.org/course/computational-probability-inference-mitx-6-008-1x)。

### 无编程背景

斯坦福公开课 [Probability and Statistics](https://lagunita.stanford.edu/courses/OLI/ProbStat/Open/about)，课程内容不错，体验也不错，如果不想编程的话可以试试。

[NotreDameX: SOC120x I Heart Stats: Learning to Love Statistics](https://courses.edx.org/courses/NotreDameX/SOC120x/2T2015/info)，看名字似乎比较适合入门，但没有概率论的内容。

如果你想更深入的学习概率论的话，试试 MIT 的 [Introduction to Probability - The Science of Uncertainty](https://www.edx.org/course/introduction-probability-science-mitx-6-041x-2) ， [有博文](https://medium.freecodecamp.com/if-you-want-to-learn-data-science-take-a-few-of-these-statistics-classes-9bbabab098b9#.yxn77f7b5)评价此门课程「It is a masterpiece with a weighted average rating of 4.91 out of 5 stars over 34 reviews. Be warned: it is a challenge and much longer than most MOOCs」。

## 最后警告
如果你是高中理科基础，那么自学 QM 至少得花60小时以上，先花一周搞定较简单的微积分，然后再按照 QM 课程安排规律地学习泰勒级数、概率和统计。

如果你是文科生，建议现在就开始自学并且多多练习抱好大腿，这门课的安排实在太紧凑了。