// setup/main.ts
import { defineAppSetup } from '@slidev/types'

export default defineAppSetup(async ({ app, router }) => {

  // 确保代码只在浏览器环境中执行
  if (typeof window !== 'undefined') {
    // 动态创建一个 script 标签来加载 Pyodide 从 CDN
    const script = document.createElement('script');
    // 你可以从 Pyodide 官方文档获取最新的 CDN 链接和版本
    // script.type = 'module'; // <--- Add this line
    script.src = '/pyodide/pyodide.js';
    // script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pyodide/0.27.3/pyodide.js';
    // script.src = 'https://cdn.jsdelivr.net/pyodide/v1.27.7/full/pyodide.js';
    // script.src = 'https://jsd.onmicrosoft.cn/pyodide/v0.27.7/full/pyodide.js';
    script.async = true;
    document.head.appendChild(script);

    // 当脚本加载完成后执行
    script.onload = async () => {
      try {
        console.log('Pyodide 主脚本已加载，正在初始化 Pyodide...');
        // loadPyodide 函数在脚本加载后会在 window 对象上可用
        // @ts-ignore: loadPyodide 在脚本加载后存在于 window 对象
        const pyodide = await window.loadPyodide();
        // 将加载的 Pyodide 实例挂载到 window 对象上
        // @ts-ignore: 允许赋值给 window 对象
        window.pyodide = pyodide;
        console.log('Pyodide 已成功加载并挂载到 window.pyodide');

        // 你可以在这里预加载一些常用的 Python 包
        // await pyodide.loadPackage(['numpy', 'matplotlib']);
        // console.log('numpy 和 matplotlib 已加载到 Pyodide');

      } catch (error) {
        console.error('加载或初始化 Pyodide 失败:', error);
      }
    };

    // 如果脚本加载失败
    script.onerror = () => {
      console.error('从 CDN 加载 Pyodide 脚本失败。');
    };
  }
})
