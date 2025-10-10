# 阿里云OSS故障排查指南

## 常见错误及解决方案

### ❌ 错误1: "Expected uri parameter to have length >= 1, but found "" for params.Bucket"

**错误原因**: 环境变量未正确配置，`APOS_S3_BUCKET` 为空。

**解决方法**:
1. 确认 `.env` 文件已创建
2. 检查 `.env` 文件中是否配置了所有必需的变量：
   ```bash
   APOS_S3_BUCKET=your-bucket-name
   APOS_S3_KEY=your-access-key-id
   APOS_S3_SECRET=your-access-key-secret
   APOS_S3_ENDPOINT=https://oss-cn-hangzhou.aliyuncs.com
   ```
3. 重启应用：
   ```bash
   # 按 Ctrl+C 停止应用
   npm run dev
   ```

---

### ❌ 错误2: "Please use virtual hosted style to access" / "SecondLevelDomainForbidden"

**错误原因**: 阿里云OSS需要使用虚拟主机样式访问，而不是路径样式。

**解决方法**:
配置文件已更新为使用虚拟主机样式（`s3ForcePathStyle: false`），重启应用即可：
```bash
# 按 Ctrl+C 停止应用
npm run dev
```

**配置说明**:
- ✅ 正确: `s3ForcePathStyle: false` (虚拟主机样式)
- ❌ 错误: `style: 'path'` (路径样式)

---

### ❌ 错误3: "Access Denied" / "The Access Key is disabled"

**错误原因**: 
- AccessKey被禁用
- AccessKey没有OSS权限
- Bucket权限设置错误

**解决方法**:
1. **检查AccessKey状态**:
   - 访问 https://ram.console.aliyun.com/users
   - 确认AccessKey处于"启用"状态

2. **检查权限**:
   - 确保RAM用户有 `AliyunOSSFullAccess` 权限
   - 或至少有对应Bucket的读写权限

3. **检查Bucket权限**:
   - 访问 https://oss.console.aliyun.com/
   - 进入Bucket → 权限管理
   - 读写权限设置为"公共读"或"公共读写"

---

### ❌ 错误4: "NoSuchBucket" / "The specified bucket does not exist"

**错误原因**: 
- Bucket名称拼写错误
- Bucket与Endpoint地域不匹配
- Bucket不存在

**解决方法**:
1. **检查Bucket名称**:
   ```bash
   # .env 文件中
   APOS_S3_BUCKET=your-actual-bucket-name
   ```

2. **检查Bucket地域**:
   - 登录OSS控制台查看Bucket所在地域
   - 确保 `APOS_S3_ENDPOINT` 与Bucket地域匹配
   
   例如，如果Bucket在"华东1(杭州)":
   ```bash
   APOS_S3_ENDPOINT=https://oss-cn-hangzhou.aliyuncs.com
   APOS_S3_REGION=oss-cn-hangzhou
   ```

3. **确认Bucket存在**:
   - 访问 https://oss.console.aliyun.com/
   - 确认Bucket已创建

---

### ❌ 错误5: "SignatureDoesNotMatch" / "The request signature does not match"

**错误原因**: 
- AccessKey ID或Secret错误
- 配置中有多余的空格或换行
- 时间不同步

**解决方法**:
1. **重新生成并配置AccessKey**:
   - 访问RAM控制台
   - 重新创建AccessKey
   - 复制时注意不要包含空格

2. **检查.env文件格式**:
   ```bash
   # 正确格式（等号两边无空格）
   APOS_S3_KEY=LTAI5tAbCdEfGhIjKlMnO
   APOS_S3_SECRET=AbCdEfGhIjKlMnOpQrStUvWxYz1234567
   
   # 错误格式
   APOS_S3_KEY = LTAI5tAbCdEfGhIjKlMnO  # ❌ 等号两边有空格
   APOS_S3_SECRET=AbCdEf...            # ❌ 值后面有空格
   ```

3. **同步系统时间**:
   ```bash
   # Linux/Mac
   sudo ntpdate -u ntp.aliyun.com
   
   # Windows (以管理员身份运行)
   w32tm /resync
   ```

---

### ❌ 错误6: 图片上传成功但无法访问

**错误原因**: 
- Bucket设置为私有
- 对象ACL为私有
- 跨域CORS配置问题

**解决方法**:
1. **设置Bucket为公共读**:
   - OSS控制台 → 选择Bucket → 权限管理
   - 读写权限改为"公共读"

2. **检查对象ACL**:
   - 在配置文件中确认：
   ```javascript
   bucketObjectsACL: 'public-read'
   ```

3. **配置CORS（如果需要）**:
   - OSS控制台 → 选择Bucket → 权限管理 → 跨域设置
   - 添加规则允许必要的源和方法

---

### ❌ 错误7: "Network Error" / 网络连接错误

**错误原因**: 
- Endpoint配置错误
- 防火墙阻止
- 网络连接问题

**解决方法**:
1. **验证Endpoint可访问**:
   ```bash
   # 测试网络连接
   curl https://oss-cn-hangzhou.aliyuncs.com
   ```

2. **检查Endpoint格式**:
   ```bash
   # 正确格式
   APOS_S3_ENDPOINT=https://oss-cn-hangzhou.aliyuncs.com
   
   # 错误格式
   APOS_S3_ENDPOINT=oss-cn-hangzhou.aliyuncs.com  # ❌ 缺少https://
   APOS_S3_ENDPOINT=https://oss-cn-hangzhou.aliyuncs.com/  # ❌ 末尾多了斜杠
   ```

3. **检查防火墙和代理**:
   - 确保允许访问阿里云OSS
   - 如果使用代理，可能需要额外配置

---

## 🔍 调试技巧

### 1. 启用详细日志

在 `.env` 文件中添加：
```bash
DEBUG=uploadfs
APOS_LOG_LEVEL=debug
```

重启应用后会看到更详细的日志信息。

### 2. 检查配置

运行配置检查脚本：
```bash
npm run check-oss
```

### 3. 手动测试OSS连接

创建测试脚本 `test-oss.js`:
```javascript
import dotenv from 'dotenv';
import AWS from 'aws-sdk';

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.APOS_S3_KEY,
  secretAccessKey: process.env.APOS_S3_SECRET,
  endpoint: process.env.APOS_S3_ENDPOINT,
  s3ForcePathStyle: false,
  region: process.env.APOS_S3_REGION
});

s3.listBuckets((err, data) => {
  if (err) {
    console.error('错误:', err);
  } else {
    console.log('成功连接OSS!');
    console.log('可用的Buckets:', data.Buckets);
  }
});
```

运行测试：
```bash
node test-oss.js
```

### 4. 验证环境变量加载

创建测试脚本 `check-env.js`:
```javascript
import dotenv from 'dotenv';
dotenv.config();

console.log('环境变量检查:');
console.log('APOS_S3_BUCKET:', process.env.APOS_S3_BUCKET || '未设置');
console.log('APOS_S3_KEY:', process.env.APOS_S3_KEY ? '已设置' : '未设置');
console.log('APOS_S3_SECRET:', process.env.APOS_S3_SECRET ? '已设置' : '未设置');
console.log('APOS_S3_ENDPOINT:', process.env.APOS_S3_ENDPOINT || '未设置');
console.log('APOS_S3_REGION:', process.env.APOS_S3_REGION || '未设置');
```

运行：
```bash
node check-env.js
```

---

## 📋 完整配置检查清单

在遇到问题时，按照以下清单逐项检查：

- [ ] `.env` 文件已创建并位于项目根目录
- [ ] 所有必需的环境变量已配置：
  - [ ] `APOS_S3_BUCKET`
  - [ ] `APOS_S3_KEY`
  - [ ] `APOS_S3_SECRET`
  - [ ] `APOS_S3_ENDPOINT`
- [ ] 环境变量格式正确（无多余空格）
- [ ] 阿里云OSS Bucket已创建
- [ ] Bucket地域与Endpoint匹配
- [ ] Bucket权限设置为"公共读"
- [ ] RAM用户有OSS完全访问权限
- [ ] AccessKey处于启用状态
- [ ] 配置文件使用 `s3ForcePathStyle: false`
- [ ] 应用已重启以加载新配置
- [ ] 系统时间准确（误差不超过15分钟）

---

## 🆘 获取更多帮助

如果以上方法都无法解决问题：

1. **查看完整错误日志**:
   - 查看终端输出的完整错误信息
   - 包括错误代码和堆栈跟踪

2. **查看阿里云OSS文档**:
   - [OSS错误码参考](https://help.aliyun.com/document_detail/32005.html)
   - [OSS常见问题](https://help.aliyun.com/document_detail/32141.html)

3. **联系支持**:
   - 阿里云工单系统
   - ApostropheCMS社区

---

## 💡 预防性建议

1. **使用配置检查**: 在启动应用前运行 `npm run check-oss`
2. **保存配置模板**: 使用 `env.oss.template` 作为参考
3. **文档化自定义配置**: 记录任何特殊配置
4. **定期备份**: 定期备份重要数据
5. **监控告警**: 设置OSS费用和流量告警

---

**最后更新**: 2024-10-10

