# 阿里云OSS集成说明

本项目已成功集成阿里云OSS作为文件存储服务。本文档提供完整的配置和使用说明。

## 📦 已完成的配置

### 1. 创建的文件

| 文件 | 说明 |
|------|------|
| `modules/@apostrophecms/uploadfs/index.js` | Uploadfs模块配置，使用S3兼容模式连接阿里云OSS |
| `env.oss.template` | 环境变量配置模板 |
| `scripts/check-oss-config.js` | OSS配置检查脚本 |
| `OSS_QUICK_START.md` | 快速开始指南 |
| `OSS_CONFIGURATION.md` | 详细配置文档 |
| `README_OSS.md` | 本文件，集成说明 |

### 2. 更新的文件

- `package.json`: 添加了 `check-oss` 脚本命令

### 3. 配置说明

#### Uploadfs模块配置

文件位置: `modules/@apostrophecms/uploadfs/index.js`

主要配置项:
- **storage**: 使用 `s3` 模式（阿里云OSS兼容S3协议）
- **endpoint**: 阿里云OSS的访问端点
- **s3ForcePathStyle**: 设置为 `false`，使用虚拟主机样式（阿里云OSS要求）
- **https**: 启用HTTPS传输
- **bucketObjectsACL**: 对象访问控制级别

#### 环境变量

所有敏感配置通过环境变量传递，包括:
- `APOS_S3_BUCKET`: Bucket名称
- `APOS_S3_KEY`: AccessKey ID
- `APOS_S3_SECRET`: AccessKey Secret
- `APOS_S3_ENDPOINT`: OSS Endpoint
- `APOS_S3_REGION`: OSS Region
- `APOS_CDN_URL`: CDN地址（可选）

## 🚀 快速开始

### 步骤1: 创建环境变量文件

```bash
# 复制模板文件
cp env.oss.template .env

# 编辑.env文件，填入您的阿里云OSS配置
# 使用任何文本编辑器打开.env文件进行编辑
```

### 步骤2: 配置阿里云OSS

1. **创建Bucket**
   - 访问: https://oss.console.aliyun.com/
   - 创建Bucket，选择合适的地域
   - 设置读写权限为"公共读"

2. **获取AccessKey**
   - 访问: https://ram.console.aliyun.com/users
   - 创建RAM用户并授予 `AliyunOSSFullAccess` 权限
   - 创建AccessKey

3. **填写配置**
   ```bash
   APOS_S3_BUCKET=your-bucket-name
   APOS_S3_KEY=your-access-key-id
   APOS_S3_SECRET=your-access-key-secret
   APOS_S3_ENDPOINT=https://oss-cn-hangzhou.aliyuncs.com
   APOS_S3_REGION=oss-cn-hangzhou
   ```

### 步骤3: 检查配置

```bash
npm run check-oss
```

此命令会检查您的OSS配置是否正确，并给出具体的反馈。

### 步骤4: 启动应用

```bash
npm run dev
```

### 步骤5: 测试上传

1. 访问 http://localhost:3000
2. 登录管理后台
3. 上传一张图片
4. 检查图片是否出现在阿里云OSS控制台
5. 验证图片URL是否可以正常访问

## 📋 常用命令

```bash
# 检查OSS配置
npm run check-oss

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 生产环境运行
npm run serve

# 完整发布流程
npm run release
```

## 🔧 配置选项说明

### 必需配置

| 环境变量 | 说明 | 示例 |
|---------|------|------|
| APOS_S3_BUCKET | OSS Bucket名称 | my-website-assets |
| APOS_S3_KEY | AccessKey ID | LTAI5tAbCdEfGhIjKlMnO |
| APOS_S3_SECRET | AccessKey Secret | AbCdEf... |
| APOS_S3_ENDPOINT | OSS Endpoint | https://oss-cn-hangzhou.aliyuncs.com |

### 可选配置

| 环境变量 | 说明 | 示例 |
|---------|------|------|
| APOS_S3_REGION | OSS Region | oss-cn-hangzhou |
| APOS_CDN_URL | CDN加速域名 | https://cdn.yourdomain.com |

### OSS地域和Endpoint对照表

| 地域 | Region ID | Endpoint |
|------|-----------|----------|
| 华东1(杭州) | oss-cn-hangzhou | https://oss-cn-hangzhou.aliyuncs.com |
| 华东2(上海) | oss-cn-shanghai | https://oss-cn-shanghai.aliyuncs.com |
| 华北2(北京) | oss-cn-beijing | https://oss-cn-beijing.aliyuncs.com |
| 华南1(深圳) | oss-cn-shenzhen | https://oss-cn-shenzhen.aliyuncs.com |
| 香港 | oss-cn-hongkong | https://oss-cn-hongkong.aliyuncs.com |

更多地域请查看: [阿里云OSS地域列表](https://help.aliyun.com/document_detail/31837.html)

## 🔐 安全最佳实践

1. ✅ **使用RAM用户**: 不要使用主账号AccessKey，创建专门的RAM用户
2. ✅ **最小权限原则**: 只授予必要的OSS权限
3. ✅ **定期轮换密钥**: 定期更新AccessKey
4. ✅ **不要提交.env**: 确保.env文件已被.gitignore
5. ✅ **使用强密码**: APOS_SECRET和SESSION_SECRET使用至少32位随机字符串

## 🐛 故障排查

### 常见问题快速解决

**问题1: 上传失败**
- 运行 `npm run check-oss` 检查配置
- 验证RAM用户权限
- 检查Bucket读写权限设置

**问题2: 图片无法访问**
- 检查Bucket是否设置为"公共读"
- 验证对象ACL设置

**问题3: "Please use virtual hosted style to access"**
- 配置已修复为使用虚拟主机样式
- 重启应用即可解决

### 详细故障排查

查看完整的故障排查指南：[OSS_TROUBLESHOOTING.md](./OSS_TROUBLESHOOTING.md)

包括：
- 所有常见错误及解决方案
- 详细的调试技巧
- 配置检查清单
- 测试脚本示例

## 📚 相关文档

- [快速开始指南](./OSS_QUICK_START.md) - 3分钟快速配置
- [详细配置文档](./OSS_CONFIGURATION.md) - 完整的配置说明和最佳实践
- [故障排查指南](./OSS_TROUBLESHOOTING.md) - 常见错误及解决方案
- [快速参考卡片](./OSS_QUICK_REFERENCE.md) - 速查表
- [ApostropheCMS Uploadfs文档](https://docs.apostrophecms.org/reference/modules/uploadfs.html)
- [阿里云OSS文档](https://help.aliyun.com/product/31815.html)

## 🎯 生产环境部署

生产环境额外建议:

1. **环境变量**:
   ```bash
   NODE_ENV=production
   APOS_BASE_URL=https://yourdomain.com
   ```

2. **使用CDN**:
   ```bash
   APOS_CDN_URL=https://cdn.yourdomain.com
   ```

3. **私有Bucket + CDN** (更安全):
   - 在 `modules/@apostrophecms/uploadfs/index.js` 中
   - 修改 `bucketObjectsACL: 'private'`
   - 配置阿里云CDN，源站指向OSS

4. **监控和日志**:
   - 启用OSS访问日志
   - 配置费用报警
   - 监控流量使用

## ❓ 常见问题 (FAQ)

### Q: 需要安装额外的npm包吗？

A: 不需要。ApostropheCMS的uploadfs模块已经内置了S3支持，阿里云OSS兼容S3协议，所以无需安装额外依赖。

### Q: 可以同时使用本地存储和OSS吗？

A: 不可以同时使用，但可以通过环境变量切换。开发环境使用本地存储，生产环境使用OSS。

### Q: 如何从本地存储迁移到OSS？

A: 
1. 备份 `public/uploads` 目录
2. 使用阿里云OSS工具将文件上传到Bucket
3. 更新配置为OSS
4. 重启应用

### Q: OSS费用如何？

A: 阿里云OSS按使用量计费，包括:
- 存储费用（按GB/月）
- 流量费用（按GB）
- 请求次数费用

建议配置CDN以降低流量成本。

### Q: 支持私有Bucket吗？

A: 支持。设置 `bucketObjectsACL: 'private'`，然后配合CDN使用。需要在CDN和OSS之间配置授权访问。

## 💡 性能优化建议

1. **启用CDN**: 配置阿里云CDN加速，减少OSS直接访问
2. **图片处理**: 利用OSS的图片处理服务生成不同尺寸
3. **缓存策略**: 设置合理的HTTP缓存头
4. **压缩传输**: 启用Gzip压缩（uploadfs默认支持）
5. **选择就近地域**: 选择离用户最近的OSS地域

## 📞 获取帮助

如果遇到问题:

1. 查看 [OSS_QUICK_START.md](./OSS_QUICK_START.md)
2. 查看 [OSS_CONFIGURATION.md](./OSS_CONFIGURATION.md)
3. 运行 `npm run check-oss` 检查配置
4. 查看应用日志获取详细错误信息
5. 参考阿里云OSS官方文档

## 📝 更新日志

### 2024-10-10
- ✅ 创建uploadfs模块配置
- ✅ 添加环境变量模板
- ✅ 创建配置检查脚本
- ✅ 编写完整文档
- ✅ 更新package.json添加检查命令

---

**注意**: 请确保不要将 `.env` 文件提交到版本控制系统。`.gitignore` 已经配置忽略此文件。

