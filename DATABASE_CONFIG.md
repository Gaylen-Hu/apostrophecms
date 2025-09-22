# 远程MongoDB数据库配置指南

## 概述
本指南将帮助您配置ApostropheCMS项目连接到远程MongoDB数据库。

## 配置方法

### 方法1：使用环境变量（推荐）

在您的系统环境变量中设置 `APOS_MONGODB_URI`：

```bash
# Windows PowerShell
$env:APOS_MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority"

# Linux/macOS
export APOS_MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority"
```

### 方法2：在app.js中直接配置

我已经在您的 `app.js` 文件中添加了数据库配置选项。您需要取消注释并修改相应的配置：

#### 2.1 使用完整URI（推荐）
```javascript
'@apostrophecms/db': {
  options: {
    uri: 'mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority'
  }
}
```

#### 2.2 分别配置参数
```javascript
'@apostrophecms/db': {
  options: {
    host: 'your-server.com',
    port: 27017,
    user: 'your-username',
    password: 'your-password',
    name: 'my-app'
  }
}
```

## 连接字符串示例

### MongoDB Atlas（云服务）
```
mongodb+srv://myuser:mypassword@mycluster.1234x.mongodb.net/my-app?retryWrites=true&w=majority
```

### 自托管MongoDB
```
mongodb://username:password@your-server.com:27017/my-app
```

### 带认证数据库的连接
```
mongodb://username:password@your-server.com:27017/my-app?authSource=admin
```

## 密码特殊字符处理

如果您的密码包含特殊字符，需要进行URL编码：

| 字符 | 编码 |
|------|------|
| @    | %40  |
| :    | %3A  |
| /    | %2F  |
| ?    | %3F  |
| #    | %23  |
| [    | %5B  |
| ]    | %5D  |
| 空格  | %20  |

## 连接选项说明

```javascript
connect: {
  connectTimeoutMS: 30000,        // 连接超时时间（毫秒）
  serverSelectionTimeoutMS: 30000, // 服务器选择超时时间（毫秒）
  maxPoolSize: 10,                // 最大连接池大小
  minPoolSize: 2,                 // 最小连接池大小
  retryWrites: true,              // 连接重试次数
  w: 'majority'                   // 写入关注级别
}
```

## 安全建议

1. **不要在代码中硬编码密码**：使用环境变量或配置文件
2. **使用强密码**：包含大小写字母、数字和特殊字符
3. **限制IP访问**：在MongoDB服务器上配置IP白名单
4. **使用SSL/TLS**：确保连接加密
5. **定期轮换密码**：定期更改数据库密码

## 测试连接

配置完成后，启动应用程序测试连接：

```bash
npm run dev
```

如果连接成功，您将看到应用程序正常启动。如果连接失败，请检查：

1. 连接字符串是否正确
2. 用户名和密码是否正确
3. 服务器地址和端口是否正确
4. 网络连接是否正常
5. 防火墙设置是否允许连接

## 常见问题

### 1. 连接超时
- 检查网络连接
- 增加 `connectTimeoutMS` 值
- 检查防火墙设置

### 2. 认证失败
- 验证用户名和密码
- 检查认证数据库设置
- 确认用户权限

### 3. 服务器选择超时
- 检查服务器地址和端口
- 增加 `serverSelectionTimeoutMS` 值
- 检查DNS解析

## 生产环境配置

在生产环境中，建议：

1. 使用环境变量而不是硬编码配置
2. 使用连接池优化性能
3. 配置适当的超时时间
4. 启用SSL/TLS加密
5. 设置监控和日志记录

## 下一步

配置完成后，您可以：

1. 运行数据库迁移：`node app @apostrophecms/migration:migrate`
2. 创建管理员用户：`node app @apostrophecms/user:create admin admin`
3. 开始开发您的应用程序
