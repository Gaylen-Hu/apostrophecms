# Enhanced Button Widget - 增强型按钮小部件

一个功能强大、美观的按钮组件，基于 [enhanced-button](https://github.com/jakobhoeg/enhanced-button) 开源库，提供丰富的视觉效果和交互动画。

## ✨ 功能特性

- 🎨 **6种按钮变体**：默认、空心、次要、幽灵、链接、危险操作
- ✨ **9种视觉效果**：闪光、波浪、下划线、渐变流动等
- 📐 **3种尺寸选项**：小号、默认、大号
- 🎯 **15种内置图标**：箭头、下载、链接等常用图标
- 🔗 **灵活的链接方式**：页面、文件、自定义URL
- ♿ **无障碍访问**：完整的ARIA标签支持
- 📱 **完全响应式**：自适应移动端和桌面端
- 🚀 **实时预览**：编辑器中即时查看效果
- 🎛️ **高度可定制**：支持全宽、禁用等选项

## 📋 字段配置

### 内容设置
| 字段 | 类型 | 说明 |
|------|------|------|
| 链接文本 | String | 按钮显示的文字 |
| 链接类型 | Select | 页面/文件/自定义URL |
| 目标页面 | Relationship | 选择站内页面（linkType=page） |
| 目标文件 | Relationship | 选择文件（linkType=file） |
| 自定义URL | URL | 输入外部链接（linkType=custom） |
| 打开方式 | Checkboxes | 是否在新标签页打开 |
| ARIA标签 | String | 无障碍标签（SEO友好） |

### 样式设置
| 字段 | 类型 | 选项 | 默认值 |
|------|------|------|--------|
| 按钮变体 | Select | 默认/空心/次要/幽灵/链接/危险 | 默认 |
| 尺寸 | Select | 小号/默认/大号 | 默认 |
| 视觉效果 | Select | 见下方效果列表 | 无效果 |

### 高级选项
| 字段 | 类型 | 说明 |
|------|------|------|
| 图标 | Select | 15种图标可选 |
| 图标位置 | Select | 左侧/右侧 |
| 全宽按钮 | Boolean | 占据容器全宽 |
| 禁用状态 | Boolean | 不可点击 |

## 🎨 视觉效果详解

### ✨ 闪光效果 (shine)
持续的光泽扫过效果，适合突出重要按钮。

### 💫 悬停闪光 (shineHover)
鼠标悬停时触发的光泽效果，更加优雅。

### 💍 环形悬停 (ringHover)
悬停时出现光环效果，适合表单提交按钮。

### 🫧 右侧波浪 (gooeyRight)
从右侧流入的波浪效果，现代感十足。

### 🌊 左侧波浪 (gooeyLeft)
从左侧流入的波浪效果，与右侧波浪相呼应。

### 📏 下划线 (underline)
悬停时下划线消失的效果，适合链接样式按钮。

### 📐 悬停下划线 (hoverUnderline)
悬停时下划线出现的效果，更加醒目。

### 🌈 渐变流动 (gradientSlideShow)
多彩渐变持续流动效果，适合特殊活动或促销按钮。

## 🎯 使用示例

### 在 Area 中启用

```javascript
// 在页面类型中添加按钮小部件
fields: {
  add: {
    main: {
      type: 'area',
      options: {
        widgets: {
          'button': {}  // 启用增强按钮小部件
        }
      }
    }
  }
}
```

### 在模板中使用

```nunjucks
{# 在页面模板中使用 #}
{% area data.page, 'main' %}
```

### 典型使用场景

1. **CTA按钮**
   - 变体：默认
   - 效果：闪光或悬停闪光
   - 尺寸：大号
   - 图标：右箭头

2. **次要操作按钮**
   - 变体：空心或次要
   - 效果：环形悬停
   - 尺寸：默认

3. **链接风格按钮**
   - 变体：链接或幽灵
   - 效果：悬停下划线
   - 图标：外部链接

4. **危险操作**
   - 变体：危险操作
   - 效果：环形悬停
   - 图标：关闭或删除

## 🎨 样式类说明

### 主要类
| 类名 | 说明 |
|------|------|
| `.enhanced-btn` | 按钮基础类 |
| `.enhanced-btn--variant-{name}` | 变体样式 |
| `.enhanced-btn--size-{name}` | 尺寸类 |
| `.enhanced-btn--effect-{name}` | 效果类 |

### 变体类
- `.enhanced-btn--variant-default` - 默认主色调
- `.enhanced-btn--variant-destructive` - 危险操作
- `.enhanced-btn--variant-outline` - 空心边框
- `.enhanced-btn--variant-secondary` - 次要样式
- `.enhanced-btn--variant-ghost` - 幽灵按钮
- `.enhanced-btn--variant-link` - 链接样式

### 效果类
- `.enhanced-btn--effect-shine` - 闪光效果
- `.enhanced-btn--effect-shineHover` - 悬停闪光
- `.enhanced-btn--effect-ringHover` - 环形悬停
- `.enhanced-btn--effect-gooeyRight` - 右侧波浪
- `.enhanced-btn--effect-gooeyLeft` - 左侧波浪
- `.enhanced-btn--effect-underline` - 下划线
- `.enhanced-btn--effect-hoverUnderline` - 悬停下划线
- `.enhanced-btn--effect-gradientSlideShow` - 渐变流动

## 🎨 CSS变量定制

可以通过覆盖CSS变量来定制按钮颜色：

```css
:root {
  --enhanced-btn-primary: #2563eb;          /* 主色调 */
  --enhanced-btn-primary-hover: #1d4ed8;    /* 主色调悬停 */
  --enhanced-btn-destructive: #dc2626;      /* 危险色 */
  --enhanced-btn-secondary: #6b7280;        /* 次要色 */
  --enhanced-btn-border: #e5e7eb;           /* 边框色 */
  
  /* 渐变效果颜色 */
  --gradient-lime: #84cc16;
  --gradient-ocean: #06b6d4;
  --gradient-wine: #dc2626;
  --gradient-rust: #ea580c;
}
```

## 📱 响应式设计

- **桌面端**：完整尺寸和效果
- **移动端**：自动调整大号按钮尺寸，保持视觉效果

## ♿ 无障碍特性

- ✅ 完整的ARIA标签支持
- ✅ 键盘导航友好
- ✅ 屏幕阅读器优化
- ✅ 禁用状态明确指示
- ✅ 适当的颜色对比度

## 🌐 浏览器支持

| 浏览器 | 最低版本 |
|--------|---------|
| Chrome | 60+ |
| Firefox | 55+ |
| Safari | 12+ |
| Edge | 79+ |

## 📦 依赖

- **Font Awesome 6.x**：图标库（如果使用图标功能）
- **现代浏览器**：支持 CSS animations、transforms、pseudo-elements

## 🔗 相关资源

- [enhanced-button 开源库](https://github.com/jakobhoeg/enhanced-button)
- [在线演示](https://enhanced-button.vercel.app/)
- [ApostropheCMS 文档](https://docs.apostrophecms.org/)

## 🔄 版本历史

### v2.0.0 (当前版本)
- ✨ 基于 enhanced-button 完全重构
- 🎨 新增 9 种视觉效果
- 🎯 新增 15 种内置图标
- 📐 改进字段组织和用户体验
- 🚀 启用实时预览功能
- ♿ 完善无障碍支持
- 📝 详细的文档和示例

### v1.0.0
- 🎉 初始版本
- 基础按钮功能
- 简单样式选项

## 💡 最佳实践

1. **选择合适的变体**：根据按钮的重要性和页面层级选择变体
2. **谨慎使用效果**：不要在同一页面使用过多花哨效果
3. **保持一致性**：在整个网站使用一致的按钮风格
4. **测试可访问性**：确保所有用户都能轻松使用
5. **移动端优化**：在小屏幕上测试按钮的可点击性

## 🤝 贡献

基于开源库 [enhanced-button](https://github.com/jakobhoeg/enhanced-button) 开发，感谢原作者 [@jakobhoeg](https://github.com/jakobhoeg)。

