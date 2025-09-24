# 网站统计代码配置指南

## 概述

现在您可以在ApostropheCMS管理后台中轻松配置百度和谷歌统计代码。这些设置位于**全局设置**的**统计代码**标签页中。

## 配置步骤

### 1. 访问管理后台
1. 登录ApostropheCMS管理后台
2. 点击左侧菜单中的**全局设置**
3. 选择**统计代码**标签页

### 2. 配置Google Analytics

#### Google Analytics 4 (推荐)
- **字段**: `Google Analytics 4 测量ID`
- **格式**: `G-XXXXXXXXXX`
- **获取方式**: 
  1. 访问 [Google Analytics](https://analytics.google.com/)
  2. 创建新的GA4属性
  3. 在数据流设置中找到测量ID

#### 传统Google Analytics
- **字段**: `Google Analytics 跟踪ID`
- **格式**: `UA-XXXXXXXXX-X` 或 `G-XXXXXXXXXX`
- **获取方式**: 在Google Analytics管理面板中找到跟踪ID

### 3. 配置百度统计

#### 方法一：使用跟踪ID（推荐）
- **字段**: `百度统计 跟踪ID`
- **格式**: `12345678`（纯数字）
- **获取方式**:
  1. 访问 [百度统计](https://tongji.baidu.com/)
  2. 添加网站后获取统计代码
  3. 从代码中提取ID（`hm.js?`后面的数字）

#### 方法二：使用完整代码
- **字段**: `百度统计代码`
- **格式**: 完整的HTML代码（包含`<script>`标签）
- **获取方式**: 直接从百度统计后台复制完整代码

### 4. 自定义代码

#### 自定义头部代码
- **用途**: 添加到页面`<head>`标签中的代码
- **常见用途**: 
  - 其他统计代码
  - 网站验证代码
  - Meta标签
  - 第三方服务代码

#### 自定义底部代码
- **用途**: 添加到页面`</body>`标签前的代码
- **常见用途**:
  - 聊天工具代码
  - 其他JavaScript代码
  - 第三方插件代码

## 代码示例

### Google Analytics 4 示例
```
G-ABC123DEF4
```

### 百度统计ID示例
```
12345678
```

### 百度统计完整代码示例
```html
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?12345678";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
```

### 自定义头部代码示例
```html
<!-- Google Search Console 验证 -->
<meta name="google-site-verification" content="your-verification-code" />

<!-- 其他统计代码 -->
<script>
  // 其他统计代码
</script>
```

### 自定义底部代码示例
```html
<!-- 在线客服代码 -->
<script>
  // 客服代码
</script>

<!-- 其他第三方服务 -->
<div id="third-party-widget"></div>
```

## 注意事项

1. **代码安全**: 自定义代码会直接输出到页面，请确保代码来源可信
2. **性能影响**: 过多的统计代码可能影响页面加载速度
3. **隐私合规**: 确保统计代码的使用符合相关隐私法规
4. **测试验证**: 配置后请检查页面源代码确认代码正确插入

## 验证配置

### 检查Google Analytics
1. 打开网站页面
2. 按F12打开开发者工具
3. 在Network标签页中查找`google-analytics.com`或`googletagmanager.com`的请求
4. 在Console中执行`gtag`命令测试

### 检查百度统计
1. 打开网站页面
2. 按F12打开开发者工具
3. 在Network标签页中查找`hm.baidu.com`的请求
4. 在百度统计后台查看实时数据

## 故障排除

### 统计代码不生效
1. 检查ID格式是否正确
2. 确认代码没有语法错误
3. 清除浏览器缓存后重新测试
4. 检查是否有JavaScript错误阻止代码执行

### 数据延迟
- Google Analytics: 通常有24-48小时延迟
- 百度统计: 通常有1-2小时延迟

## 技术支持

如果遇到问题，请检查：
1. 浏览器控制台是否有JavaScript错误
2. 网络请求是否正常
3. 统计代码格式是否正确

更多帮助请参考：
- [Google Analytics 帮助中心](https://support.google.com/analytics/)
- [百度统计 帮助中心](https://tongji.baidu.com/web/help/)
