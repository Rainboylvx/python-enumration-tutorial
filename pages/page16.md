---
layout: default
---

# 游戏3 - 优化后的代码与密码

展示优化后的寻找最大三位数素数的参考代码。

```python
import math
import time

def is_prime_optimized(n):
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(math.sqrt(n)) + 1, 2):
        if n % i == 0:
            return False
    return True

# 优化版计时
start_time_optimized = time.time()
max_prime_optimized = -1
iterations_optimized = 0
for num in range(999, 99, -1):
    iterations_optimized += 1
    if is_prime_optimized(num):
        max_prime_optimized = num
        break
end_time_optimized = time.time()
time_taken_optimized = end_time_optimized - start_time_optimized

if max_prime_optimized != -1:
    print(f"优化版找到的最大三位数素数: {max_prime_optimized}")
    print(f"优化版迭代次数: {iterations_optimized}")
    print(f"优化版耗时: {time_taken_optimized:.6f} 秒")
else:
    print("优化版没有找到三位数素数")

print("\n--- 对比基础版 ---")

def is_prime_basic(n):
    if n < 2:
        return False
    for i in range(2, n): # 从2到n-1检查
        if n % i == 0:
            return False
    return True

# 基础版计时
start_time_basic = time.time()
max_prime_basic = -1
iterations_basic = 0
for num in range(999, 99, -1): # 从999到100
    iterations_basic +=1
    if is_prime_basic(num):
        max_prime_basic = num
        break # 找到第一个即为最大
end_time_basic = time.time()
time_taken_basic = end_time_basic - start_time_basic

if max_prime_basic != -1:
    print(f"基础版找到的最大三位数素数: {max_prime_basic}")
    print(f"基础版迭代次数: {iterations_basic}")
    print(f"基础版耗时: {time_taken_basic:.6f} 秒")
else:
    print("基础版没有找到三位数素数")

```

对比优化前后的执行效率（可以通过 `pyodide` 粗略计时或观察执行次数）。

<!-- 密码锁动画展示破解过程 -->