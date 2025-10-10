# 阿里云OSS快速配置指南

## 📋 快速开始（3步完成配置）

### 第1步：创建 .env 文件

在项目根目录创建 `.env` 文件，复制以下内容并填入您的实际信息：

```bash
# 应用配置
APOS_BASE_URL=http://localhost:3000
APOS_SECRET=请修改为随机字符串
SESSION_SECRET=请修改为随机字符串
NODE_ENV=development

# 阿里云OSS配置（必须填写）
APOS_S3_BUCKET=您的bucket名称
APOS_S3_KEY=您的AccessKeyId
APOS_S3_SECRET=您的AccessKeySecret
APOS_S3_ENDPOINT=https://oss-cn-hangzhou.aliyuncs.com
APOS_S3_REGION=oss-cn-hangzhou
```

### 第2步：获取阿里云OSS信息

#### 2.1 创建Bucket
1. 访问 https://oss.console.aliyun.com/
2. 点击"创建Bucket"
3. 填写Bucket名称，选择地域
4. 读写权限选择"公共读"
5. 复制Bucket名称到 `.env` 的 `APOS_S3_BUCKET`

#### 2.2 获取AccessKey
1. 访问 https://ram.console.aliyun.com/users
2. 创建RAM用户（推荐）或使用主账号
3. 授予 `AliyunOSSFullAccess` 权限
4. 创建AccessKey，复制到 `.env` 文件：
   - AccessKey ID → `APOS_S3_KEY`
   - AccessKey Secret → `APOS_S3_SECRET`

#### 2.3 选择Endpoint
根据您的Bucket地域，选择对应的Endpoint：

| 地域 | Endpoint | Region ID |
|------|----------|-----------|
| 杭州 | https://oss-cn-hangzhou.aliyuncs.com | oss-cn-hangzhou |
| 上海 | https://oss-cn-shanghai.aliyuncs.com | oss-cn-shanghai |
| 北京 | https://oss-cn-beijing.aliyuncs.com | oss-cn-beijing |
| 深圳 | https://oss-cn-shenzhen.aliyuncs.com | oss-cn-shenzhen |
| 香港 | https://oss-cn-hongkong.aliyuncs.com | oss-cn-hongkong |

### 第3步：启动并测试

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
# 登录后台，上传一张图片测试
```

## ✅ 配置验证清单

- [ ] .env 文件已创建并填写完整
- [ ] 阿里云OSS Bucket已创建
- [ ] Bucket读写权限设置为"公共读"
- [ ] AccessKey已创建并配置
- [ ] Endpoint与Bucket地域匹配
- [ ] 应用可以正常启动
- [ ] 可以在后台上传图片
- [ ] 上传的图片在OSS控制台可见
- [ ] 图片URL可以正常访问

## 🔧 .env 文件完整示例

```bash
# ============================================
# 基础配置
# ============================================
VITE_HOST=0.0.0.0
VITE_PORT=3000
APOS_BASE_URL=http://localhost:3000
NODE_ENV=development

# 安全密钥（务必修改为随机字符串）
APOS_SECRET=change-this-to-random-string-min-32-chars
SESSION_SECRET=change-this-to-random-string-min-32-chars

# ============================================
# 阿里云OSS配置
# ============================================

# Bucket名称（在OSS控制台创建）
APOS_S3_BUCKET=my-website-assets

# AccessKey（在RAM控制台创建）
APOS_S3_KEY=LTAI5tAbCdEfGhIjKlMnO
APOS_S3_SECRET=AbCdEfGhIjKlMnOpQrStUvWxYz1234567

# Endpoint（根据Bucket地域选择）
APOS_S3_ENDPOINT=https://oss-cn-hangzhou.aliyuncs.com
APOS_S3_REGION=oss-cn-hangzhou

# CDN配置（可选，如果使用了CDN）
# APOS_CDN_URL=https://cdn.yourdomain.com

# ============================================
# 其他配置
# ============================================
GEOCODER_API_KEY=
```

## 🚨 常见问题

### Q: 上传失败，提示权限错误
**A:** 检查以下几点：
1. RAM用户是否有OSS权限（需要 AliyunOSSFullAccess）
2. Bucket的读写权限是否正确
3. AccessKey是否正确

### Q: 图片上传成功但无法访问
**A:** 
1. 检查Bucket的读写权限，应设置为"公共读"
2. 或者配置CDN访问

### Q: 提示找不到Bucket
**A:** 
1. 检查 APOS_S3_BUCKET 是否拼写正确
2. 检查 APOS_S3_ENDPOINT 是否与Bucket地域匹配

### Q: "Please use virtual hosted style to access"
**A:**
配置文件已修复此问题，重启应用即可：
```bash
# 按 Ctrl+C 停止应用，然后重新启动
npm run dev
```

### Q: 应用启动失败
**A:** 
1. 检查 .env 文件格式是否正确
2. 确保所有必填项都已填写
3. 查看终端错误信息
4. 运行 `npm run check-oss` 检查配置

## 📝 生产环境部署

在生产环境，建议修改以下配置：

```bash
NODE_ENV=production
APOS_BASE_URL=https://yourdomain.com

# 使用强密钥
APOS_SECRET=使用至少32位的随机字符串
SESSION_SECRET=使用至少32位的随机字符串

# 配置CDN（推荐）
APOS_CDN_URL=https://cdn.yourdomain.com

# 如果使用私有Bucket + CDN
# 在 modules/@apostrophecms/uploadfs/index.js 中
# 将 bucketObjectsACL 改为 'private'
```

## 📚 更多信息

- 详细配置说明：[OSS_CONFIGURATION.md](./OSS_CONFIGURATION.md)
- 故障排查指南：[OSS_TROUBLESHOOTING.md](./OSS_TROUBLESHOOTING.md)
- 集成说明总览：[README_OSS.md](./README_OSS.md)
- 快速参考卡片：[OSS_QUICK_REFERENCE.md](./OSS_QUICK_REFERENCE.md)

## ⚠️ 安全提醒

1. ⚠️ **不要将 .env 文件提交到Git！**
2. ⚠️ **AccessKey具有高权限，请妥善保管**
3. ⚠️ **定期轮换AccessKey**
4. ⚠️ **使用RAM用户而非主账号AccessKey**

检查 `.gitignore` 文件是否包含：
```
.env
.env.*
!.env.example
```

