---
layout: default
---

# 寻找最大素数 - 基础版 (游戏3)

<!-- 提供第三个小游戏界面 -->
<!-- <Game3 /> -->

引导学生先写一个基础版的枚举算法来寻找。

Python 代码提示（判断一个数 `n` 是否为素数）：
```python
is_prime = True
if n < 2:
    is_prime = False
else:
    for i in range(2, n): # 从2到n-1检查是否有因子
        if n % i == 0:
            is_prime = False
            break # 找到一个因子就可以确定不是素数了
# 如何找到999到100之间最大的那个素数？
```

**互动点：** 学生编写代码，运行并观察结果。可能会发现程序运行有点慢。