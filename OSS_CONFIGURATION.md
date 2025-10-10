# 阿里云OSS存储配置指南

本项目已配置支持阿里云OSS作为文件存储后端。阿里云OSS兼容S3协议，因此我们使用ApostropheCMS的S3存储模式。

## 配置步骤

### 1. 准备阿里云OSS

1. 登录[阿里云OSS控制台](https://oss.console.aliyun.com/)
2. 创建一个存储桶(Bucket)
   - 选择合适的地域（如：华东1-杭州）
   - 设置读写权限为"公共读"或"私有"（根据需求）
   - 记录Bucket名称
3. 获取AccessKey
   - 进入[访问控制RAM控制台](https://ram.console.aliyun.com/)
   - 创建用户并授予OSS权限（推荐使用RAM用户而不是主账号）
   - 记录AccessKey ID和AccessKey Secret

### 2. 配置环境变量

在项目根目录创建 `.env` 文件（如果不存在），添加以下配置：

```bash
# Vite开发服务器配置
VITE_HOST=0.0.0.0
VITE_PORT=3000

# 应用程序配置
APOS_BASE_URL=http://localhost:3000
APOS_SECRET=your-secret-key-here-change-this-in-production
SESSION_SECRET=your-session-secret-key-change-this-in-production

# 环境
NODE_ENV=development

# ==========================================
# 阿里云OSS存储配置
# ==========================================

# OSS Bucket名称（必填）
APOS_S3_BUCKET=your-bucket-name

# OSS AccessKey ID（必填）
APOS_S3_KEY=your-access-key-id

# OSS AccessKey Secret（必填）
APOS_S3_SECRET=your-access-key-secret

# OSS Endpoint（必填）
# 根据您的Bucket所在地域选择对应的Endpoint
APOS_S3_ENDPOINT=https://oss-cn-hangzhou.aliyuncs.com

# OSS Region（可选，但建议配置）
APOS_S3_REGION=oss-cn-hangzhou

# CDN URL（可选，如果使用了阿里云CDN）
# APOS_CDN_URL=https://your-cdn-domain.com
```

### 3. 阿里云OSS各地域Endpoint列表

| 地域 | Region ID | Endpoint |
|------|-----------|----------|
| 华东1（杭州） | oss-cn-hangzhou | https://oss-cn-hangzhou.aliyuncs.com |
| 华东2（上海） | oss-cn-shanghai | https://oss-cn-shanghai.aliyuncs.com |
| 华北1（青岛） | oss-cn-qingdao | https://oss-cn-qingdao.aliyuncs.com |
| 华北2（北京） | oss-cn-beijing | https://oss-cn-beijing.aliyuncs.com |
| 华北3（张家口） | oss-cn-zhangjiakou | https://oss-cn-zhangjiakou.aliyuncs.com |
| 华南1（深圳） | oss-cn-shenzhen | https://oss-cn-shenzhen.aliyuncs.com |
| 华南2（河源） | oss-cn-heyuan | https://oss-cn-heyuan.aliyuncs.com |
| 华南3（广州） | oss-cn-guangzhou | https://oss-cn-guangzhou.aliyuncs.com |
| 西南1（成都） | oss-cn-chengdu | https://oss-cn-chengdu.aliyuncs.com |
| 中国香港 | oss-cn-hongkong | https://oss-cn-hongkong.aliyuncs.com |
| 美国西部1（硅谷） | oss-us-west-1 | https://oss-us-west-1.aliyuncs.com |
| 美国东部1（弗吉尼亚） | oss-us-east-1 | https://oss-us-east-1.aliyuncs.com |
| 亚太东南1（新加坡） | oss-ap-southeast-1 | https://oss-ap-southeast-1.aliyuncs.com |

更多地域请参考[阿里云OSS地域和访问域名](https://help.aliyun.com/document_detail/31837.html)

## 配置说明

### 模块配置文件

已创建的配置文件：`modules/@apostrophecms/uploadfs/index.js`

该文件包含以下关键配置：

- **storage**: 设置为 `'s3'`，使用S3兼容模式
- **key/secret/bucket**: 从环境变量读取阿里云OSS凭证
- **endpoint**: 阿里云OSS的访问端点
- **s3ForcePathStyle**: 设置为 `false`，使用虚拟主机样式（阿里云OSS要求）
- **https**: 启用HTTPS传输
- **bucketObjectsACL**: 设置对象访问权限（默认为 `'public-read'`）

### 访问权限说明

**bucketObjectsACL** 选项说明：

- `'public-read'`: 公开读取，适合公开网站的图片和资源
- `'private'`: 私有访问，需要配合CDN使用，适合需要访问控制的场景

### 使用CDN（可选）

如果您配置了阿里云CDN来加速OSS资源：

1. 在阿里云CDN控制台配置CDN域名，源站设置为OSS Bucket
2. 在 `.env` 文件中添加：
   ```bash
   APOS_CDN_URL=https://your-cdn-domain.com
   ```

这样，所有上传的资源URL将使用CDN域名。

## 测试配置

1. 启动应用：
   ```bash
   npm run dev
   ```

2. 登录管理后台，上传一张图片

3. 检查图片是否成功上传到阿里云OSS：
   - 登录阿里云OSS控制台
   - 进入您的Bucket
   - 查看是否有新上传的文件

4. 验证图片URL是否可以正常访问

## 故障排查

### 上传失败

1. **检查AccessKey权限**：
   - 确保RAM用户有OSS的读写权限
   - 推荐授予 `AliyunOSSFullAccess` 策略

2. **检查Bucket权限**：
   - 确保Bucket的读写权限设置正确
   - 如果使用"私有"权限，需要配置CDN或使用签名URL

3. **检查网络连接**：
   - 确保服务器能够访问阿里云OSS的Endpoint
   - 检查防火墙规则

### 图片无法显示

1. **检查Bucket的公共访问设置**
2. **检查对象的ACL权限**
3. **如果使用CDN，检查CDN配置是否正确**

### 查看详细日志

在 `.env` 文件中添加调试选项：

```bash
DEBUG=uploadfs
```

重启应用后可以看到更详细的uploadfs操作日志。

## 从本地存储迁移到OSS

如果您之前使用本地存储，现在想迁移到OSS：

1. 备份当前的 `public/uploads` 目录
2. 更新配置为OSS
3. 使用阿里云OSS工具将现有文件上传到Bucket
4. 或者使用ApostropheCMS的迁移功能重新上传

## 生产环境配置

在生产环境中，建议：

1. 使用环境变量而不是硬编码配置
2. 使用RAM用户而不是主账号AccessKey
3. 定期轮换AccessKey
4. 启用Bucket的日志记录功能
5. 配置CDN以提高访问速度
6. 考虑使用 `bucketObjectsACL: 'private'` 配合CDN，增强安全性

## 成本优化建议

1. **选择合适的存储类型**：
   - 标准存储：适合频繁访问的数据
   - 低频访问：适合不经常访问但需要快速读取的数据
   - 归档存储：适合长期保存很少访问的数据

2. **配置生命周期规则**：
   - 自动将旧文件转换为低频存储或归档存储
   - 自动删除过期的临时文件

3. **启用CDN**：
   - 减少OSS回源流量
   - 提高用户访问速度

4. **图片处理**：
   - 使用阿里云OSS的图片处理服务
   - 按需生成不同尺寸的缩略图

## 相关文档

- [ApostropheCMS Uploadfs文档](https://docs.apostrophecms.org/reference/modules/uploadfs.html)
- [阿里云OSS文档](https://help.aliyun.com/product/31815.html)
- [阿里云OSS最佳实践](https://help.aliyun.com/document_detail/31955.html)

## 安全注意事项

⚠️ **重要提醒**：

1. **永远不要将 `.env` 文件提交到版本控制系统**
2. 定期检查并更新 `.gitignore` 文件，确保包含：
   ```
   .env
   .env.local
   .env.*.local
   ```
3. AccessKey具有高权限，请妥善保管
4. 如果AccessKey泄露，立即在阿里云控制台禁用并生成新的Key

