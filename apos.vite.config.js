import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    // 允许外部访问，绑定到所有网络接口
    host: '0.0.0.0',
    // 或者指定特定的IP地址
    // host: '192.168.1.100', // 替换为您的实际IP地址
    port: 3000,
    // 启用HTTPS（可选）
    // https: true,
    // 配置代理（如果需要）
    proxy: {
      // 代理API请求到ApostropheCMS后端
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  // 构建配置
  build: {
    // 输出目录
    outDir: 'dist',
    // 资源内联阈值
    assetsInlineLimit: 4096,
    // 代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          utils: ['lodash', 'moment']
        }
      }
    }
  },
  // 开发工具配置
  define: {
    // 定义全局常量
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development')
  },
  // CSS配置
  css: {
    preprocessorOptions: {
      scss: {
        // 全局SCSS变量
        additionalData: `@import "./modules/asset/ui/src/variables.scss";`
      }
    }
  },
  // 优化配置
  optimizeDeps: {
    include: ['vue', 'vue-router', 'lodash']
  }
});
