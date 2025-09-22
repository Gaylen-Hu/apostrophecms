# Vite IP访问配置指南

## 问题描述
当您通过IP地址（如 `http://192.168.1.100:3000`）访问应用程序时，Vite开发服务器仍然会生成指向 `localhost` 的资源链接，导致资源加载失败。

## 解决方案

### 1. 已创建的配置文件

我已经为您创建了 `apos.vite.config.js` 文件，其中包含了正确的Vite配置：

```javascript
export default defineConfig({
  server: {
    // 允许外部访问，绑定到所有网络接口
    host: '0.0.0.0',
    port: 3000,
  }
});
```

### 2. 已更新的app.js配置

在 `app.js` 中的 `@apostrophecms/vite` 模块配置已更新：

```javascript
'@apostrophecms/vite': {
  options: {
    devServer: {
      host: '0.0.0.0',
      port: 3000,
    }
  }
}
```

### 3. 环境变量配置（可选）

您可以通过环境变量来配置Vite服务器：

```bash
# Windows PowerShell
$env:VITE_HOST="0.0.0.0"
$env:VITE_PORT="3000"

# Linux/macOS
export VITE_HOST=0.0.0.0
export VITE_PORT=3000
```

### 4. 启动应用程序

配置完成后，重新启动开发服务器：

```bash
npm run dev
```

### 5. 访问应用程序

现在您可以通过以下方式访问应用程序：

- **本地访问**: `http://localhost:3000`
- **IP访问**: `http://您的IP地址:3000`
- **网络访问**: `http://192.168.1.100:3000`（替换为您的实际IP）

## 配置说明

### host: '0.0.0.0' 的含义
- `0.0.0.0` 表示绑定到所有可用的网络接口
- 这允许外部设备通过IP地址访问您的开发服务器
- 默认的 `localhost` 只允许本地访问

### 安全注意事项
- 在开发环境中使用 `0.0.0.0` 是安全的
- 在生产环境中，应该使用具体的IP地址或域名
- 确保防火墙设置允许访问指定端口

### 故障排除

#### 1. 仍然显示localhost链接
- 清除浏览器缓存
- 重启开发服务器
- 检查配置文件是否正确加载

#### 2. 无法通过IP访问
- 检查防火墙设置
- 确认IP地址正确
- 检查网络连接

#### 3. 端口被占用
- 更改端口号：`port: 3001`
- 或者终止占用端口的进程

## 生产环境配置

在生产环境中，建议使用以下配置：

```javascript
export default defineConfig({
  server: {
    host: 'your-domain.com', // 使用具体域名
    port: 80, // 或443（HTTPS）
    https: true // 启用HTTPS
  }
});
```

## 验证配置

配置完成后，您可以通过以下方式验证：

1. 启动服务器：`npm run dev`
2. 查看控制台输出，确认服务器绑定到 `0.0.0.0:3000`
3. 通过IP地址访问应用程序
4. 检查浏览器开发者工具中的网络请求，确认资源链接使用正确的IP地址

## 常见问题

### Q: 为什么需要这个配置？
A: Vite默认绑定到localhost是为了安全考虑，但这会阻止外部设备访问开发服务器。

### Q: 这个配置会影响生产环境吗？
A: 不会。这个配置只影响开发环境，生产环境使用不同的构建配置。

### Q: 如何获取我的IP地址？
A: 
- Windows: `ipconfig`
- Linux/macOS: `ifconfig` 或 `ip addr show`
- 或者查看网络设置中的IP地址
