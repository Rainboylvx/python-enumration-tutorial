---
layout: default
---

# 游戏3 - 优化你的素数查找器！

“刚才找素数是不是感觉有点慢？我们能优化一下吗？”

引导学生思考优化点：

*   判断素数时，循环需要到 `n-1` 吗？其实到 `sqrt(n)` 就可以了。
*   我们是要找最大的三位数素数，是不是可以从 999 开始往下找，找到第一个就是答案？

  <textarea>
import math

def is_prime_optimized(n):
    if n < 2:
        return False
    # 优化：检查到 sqrt(n)
    # 2是唯一的偶数素数
    if n == 2:
        return True
    if n % 2 == 0: # 排除偶数
        return False
    # 从3开始，只检查奇数，步长为2
    for i in range(3, int(math.sqrt(n)) + 1, 2):
        if n % i == 0:
            return False
    return True

max_prime_optimized = -1
# 优化：从大到小查找，找到第一个即为最大
for num in range(999, 99, -1): 
    if is_prime_optimized(num):
        max_prime_optimized = num
        break 

if max_prime_optimized != -1:
    print(f"找到的最大的三位数素数 (优化版): {max_prime_optimized}")
else:
    print("没有找到三位数素数 (优化版)")

# 对比基础版（可选，如果学生已经写了基础版）
# print("\n--- 基础版回顾 ---")
# def is_prime_basic(n):
#     if n < 2:
#         return False
#     for i in range(2, n):
#         if n % i == 0:
#             return False
#     return True
# max_prime_basic = -1
# for num in range(999, 99, -1):
#     if is_prime_basic(num):
#         max_prime_basic = num
#         break
# if max_prime_basic != -1:
#     print(f"找到的最大的三位数素数 (基础版): {max_prime_basic}")
# else:
#     print("没有找到三位数素数 (基础版)")
  </textarea>

**互动点：** 学生修改代码，加入优化策略，再次运行，感受效率的提升。