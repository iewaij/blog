---
layout: post
title: "First Blog"
date:   2018-06-07 20:00
---

## About Me
My name is Jiawei Li, right now I’m Economics student at University of Birmingham in my exchange (or 3rd) year. My home university is University of Nottingham Ningbo campus in China.

In the last two years, I’ve been learning programming myself and passionate about data science. I heard about Julia before applying for the Summer of Code project but never tried it, during the application period I found myself enjoying this language so much, so I applied.

This summer I’m working with my mentor Patrick Mogensen ( [@pkofod](https://discourse.julialang.org/u/pkofod) ) for  [JuliaNLSolvers 2](https://github.com/JuliaNLSolvers) .  [JuliaNLSolvers 2](https://github.com/JuliaNLSolvers)  mainly has three packages, Optim.jl for solving optimization problems, NLsolve.jl for solving systems of nonlinear equations and LsqFit.jl for curve fitting or parameter estimation. Currently, LsqFit.jl is at very beginning stage and a lot of features could be added, such as trust region method and non-vector functionality. I’ll also be working on documentations and benchmarks for Optim.jl, LsqFit.jl and NLsolve.jl. Any suggestions are welcome!

## Work and Future Plans
In the first week, I’ve finished the [example of logistics regression](https://github.com/iewaij/Notebooks/blob/Logistic-Regression/Logistic%20Regression%20Using%20Optim.jl.ipynb). I didn’t work much in the next two weeks because of crazy and depressing university final exams. This week I’m working on the method comparison and benchmarks example for Optim.jl to give users a more intuitive understanding about how each method works and how well they work.

During the development of method comparison example, I’m also trying to pack the functionality of comparing methods and visualization into the package itself, which will make it much less painful to visualize optimization trace and choose the best method. There’s not much documentation about it in either Plots.jl or Optim.jl, so it costs me a lot of time researching and debugging.

After finish these two examples, I’ll be rewriting present documentations and examples of all three packages using Literature.jl. For NLSolver.jl and Lsqfit.jl, the documentation will be build from README.md. For Optim.jl, I need write more examples about manifold and linesearch methods. Then I’ll work on improving the functionality of Lsqfit.jl, which will be discussed in more details in my next blog post.
