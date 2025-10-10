# 阿里云OSS快速参考卡片

## 🚀 3分钟快速配置

### 1️⃣ 创建.env文件
```bash
cp env.oss.template .env
```

### 2️⃣ 填写OSS配置
```bash
APOS_S3_BUCKET=your-bucket-name
APOS_S3_KEY=your-access-key-id
APOS_S3_SECRET=your-access-key-secret
APOS_S3_ENDPOINT=https://oss-cn-hangzhou.aliyuncs.com
```

### 3️⃣ 检查配置
```bash
npm run check-oss
```

### 4️⃣ 启动应用
```bash
npm run dev
```

---

## 📍 常用Endpoint

| 地域 | Endpoint |
|------|----------|
| 杭州 | `https://oss-cn-hangzhou.aliyuncs.com` |
| 上海 | `https://oss-cn-shanghai.aliyuncs.com` |
| 北京 | `https://oss-cn-beijing.aliyuncs.com` |
| 深圳 | `https://oss-cn-shenzhen.aliyuncs.com` |
| 香港 | `https://oss-cn-hongkong.aliyuncs.com` |

---

## 🔗 快速链接

| 服务 | 链接 |
|------|------|
| OSS控制台 | https://oss.console.aliyun.com/ |
| RAM控制台 | https://ram.console.aliyun.com/users |
| CDN控制台 | https://cdn.console.aliyun.com/ |

---

## 📝 命令速查

```bash
npm run check-oss    # 检查OSS配置
npm run dev          # 开发模式启动
npm run build        # 构建生产版本
npm run serve        # 生产模式运行
```

---

## 🐛 快速排错

### 上传失败
```bash
# 1. 检查配置
npm run check-oss

# 2. 验证AccessKey权限
# 访问RAM控制台，确保有AliyunOSSFullAccess权限

# 3. 检查Bucket权限
# 访问OSS控制台，设置为"公共读"
```

### "Please use virtual hosted style"
```bash
# 配置已修复，重启应用即可
# 按 Ctrl+C 停止，然后：
npm run dev
```

### 图片无法访问
```bash
# 检查Bucket读写权限，应设置为"公共读"
# 或配置CDN加速
```

### 详细排错
查看：[OSS_TROUBLESHOOTING.md](./OSS_TROUBLESHOOTING.md)

---

## ⚙️ 配置文件位置

| 文件 | 路径 |
|------|------|
| Uploadfs配置 | `modules/@apostrophecms/uploadfs/index.js` |
| 环境变量 | `.env` (自己创建) |
| 环境变量模板 | `env.oss.template` |
| 检查脚本 | `scripts/check-oss-config.js` |

---

## 📚 文档导航

| 文档 | 说明 |
|------|------|
| [README_OSS.md](./README_OSS.md) | 集成说明总览 |
| [OSS_QUICK_START.md](./OSS_QUICK_START.md) | 详细快速开始指南 |
| [OSS_CONFIGURATION.md](./OSS_CONFIGURATION.md) | 完整配置文档 |
| [OSS_TROUBLESHOOTING.md](./OSS_TROUBLESHOOTING.md) | 故障排查指南 |
| [OSS_QUICK_REFERENCE.md](./OSS_QUICK_REFERENCE.md) | 本文件，快速参考 |

---

## ✅ 配置检查清单

- [ ] 阿里云OSS Bucket已创建
- [ ] Bucket权限设置为"公共读"
- [ ] RAM用户已创建并获取AccessKey
- [ ] .env文件已创建并填写
- [ ] 运行 `npm run check-oss` 通过
- [ ] 应用成功启动
- [ ] 图片上传测试成功
- [ ] 图片URL可以访问

---

## 🔐 安全提示

⚠️ **切记**:
- 不要提交 `.env` 文件到Git
- 使用RAM用户，不用主账号
- 定期轮换AccessKey
- 使用强密码作为密钥

---

## 💰 成本优化

1. 配置CDN减少流量费用
2. 设置生命周期规则管理旧文件
3. 选择合适的存储类型
4. 监控费用报警

---

**需要帮助？** 查看 [README_OSS.md](./README_OSS.md) 获取完整说明

