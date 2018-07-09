---
layout: post
title: "Second Blog"
date:   2018-07-08 20:00
---

During the second month of GSoC, I focused more on `LsqFit.jl`. `LsqFit.jl` is a simple (for now) package to perform non-linear regression. One example of non-linear model is the exponential model, which takes a one-element predictor variable $t$. The model function is:

$$
m(t, \boldsymbol{\gamma}) = \gamma_1 \exp(\gamma_2 t)
$$

Given that the function $m$ is non-linear, there's no analytical solution for the best $\boldsymbol{\gamma}$. We have to use computational tools to find the least squares solution. Besides `LsqFit.jl` in Julia, there're other packages to perform non-linear least squares, such as `Scipy.optimize` in `Python` and `nls` in `R`.

`LsqFit.jl` is still at its early stage, during the last month my work included:

1. documentation and tutorial
2. weight parameter
3. output and tools

I build the documentation based on the Github `README.md` and added more details on non-linear regression, which could help beginners to understand the code and workflow behind. The documentation is held [here](https://julianlsolvers.github.io/LsqFit.jl/latest/).

There was a issue regarding weight parameter, which was caused by sending wrong residual function. The fix could be a simple fix or a better fix but involves more changes. I took a look at what other packages do, `nls` in `R` doesn't support weights and `Scipy.optimize` in `Python` took the error standard deviation or eatimated covariance as the parameter, which may not make sense at the first look but has computational advantage. The discussion could be seen [here](https://github.com/JuliaNLSolvers/LsqFit.jl/issues/69).

The last thing is [fitting result output and tools](https://github.com/iewaij/LsqFit.jl/tree/curve-fit-tools), including functions computing R-squared and adjusted R-squared to help users see results more straightforward.

Other than what I mentioned, some work unfinished includes an early but usable version of  `NLSolve.jl` [documentation](https://github.com/iewaij/NLsolve.jl/tree/init-docs), considering the existing documentation of `NLSolve.jl` covers most topics needed, and preparing `LsqFit.jl` for Julia v0.7 changes. There're lots of changes in v0.7 and the algorithm behaves very strange in v0.7, showing different results form v0.6, I'll come back to this issue when I finished other functionalities.

For the next month, my focus will still be on `LsqFit.jl`, including more algorithms for least squares and bootstrap method for assessing goodness of fit.
