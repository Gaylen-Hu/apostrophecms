# 时间线小部件 (Timeline Widget)

一个功能强大、完全响应式的时间线展示小部件，支持多种布局样式、动画效果和无障碍访问。

## ✨ 功能特性

- 🎨 **多种布局样式**：支持交替、左对齐、右对齐布局
- 🎯 **丰富的图标选择**：内置12种常用图标
- 🌈 **多种颜色主题**：8种节点颜色可选（蓝、绿、红、紫、橙、灰、黄、青）
- ⭐ **高亮显示**：标记重点事件，自动应用特殊样式
- 📱 **完全响应式**：自适应桌面、平板和移动设备
- ✨ **滚动动画**：智能检测视口，流畅的入场动画
- ♿ **无障碍访问**：完整的ARIA标签支持
- 🎛️ **灵活配置**：支持最多20个时间线项目
- 🔄 **实时预览**：在编辑器中即时查看效果
- 🎨 **悬停效果**：节点交互式放大和阴影效果

## 📋 字段配置

### 内容设置
- **标题**：时间线的主标题（可选）
- **时间线项目**：数组字段，包含以下子字段：

#### 时间线项目字段
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| 年份/日期 | String | ✓ | 支持多种格式：2013年、2023-01、2024.05.20 |
| 事件标题 | String | ✓ | 事件的主要标题（最多100字符）|
| 事件描述 | Textarea | - | 详细描述（最多500字符）|
| 图标 | Select | - | 12种图标可选（默认：对勾）|
| 节点颜色 | Select | - | 8种颜色可选（默认：蓝色）|
| 高亮显示 | Boolean | - | 标记为重点事件 |

### 样式设置
- **布局样式**：
  - 标准交替布局（默认）
  - 左对齐布局
  - 右对齐布局
- **启用动画**：是否启用滚动入场动画效果

## 🎯 使用示例

### 在Area中使用

```javascript
// 在页面类型中添加时间线小部件
fields: {
  add: {
    main: {
      type: 'area',
      options: {
        widgets: {
          'timeline': {}  // 启用时间线小部件
        }
      }
    }
  }
}
```

### 模板示例

```nunjucks
{# 在页面模板中使用 #}
{% area data.page, 'main' %}
```

## 🎨 样式类说明

### 主要容器类
| 类名 | 说明 |
|------|------|
| `.timeline-widget` | 主容器 |
| `.timeline-widget--alternating` | 交替布局 |
| `.timeline-widget--left` | 左对齐布局 |
| `.timeline-widget--right` | 右对齐布局 |
| `.timeline-widget__container` | 时间线容器 |
| `.timeline-widget__header` | 标题容器 |

### 项目类
| 类名 | 说明 |
|------|------|
| `.timeline-widget__item` | 单个时间线项目 |
| `.timeline-widget__item--reverse` | 反向布局 |
| `.timeline-widget__item--animate` | 动画效果 |
| `.timeline-widget__item--highlighted` | 高亮项目 |
| `.timeline-widget__item--visible` | 可见状态（动画完成）|

### 内容类
| 类名 | 说明 |
|------|------|
| `.timeline-widget__content` | 内容区域 |
| `.timeline-widget__year` | 年份/日期显示 |
| `.timeline-widget__item-title` | 事件标题 |
| `.timeline-widget__description` | 事件描述 |
| `.timeline-widget__highlight-badge` | 高亮徽章 |

### 节点类
| 类名 | 说明 |
|------|------|
| `.timeline-widget__node` | 中心节点容器 |
| `.timeline-widget__node-circle` | 节点圆圈 |
| `.timeline-widget__node-circle--blue` | 蓝色节点 |
| `.timeline-widget__node-circle--green` | 绿色节点 |
| `.timeline-widget__node-circle--red` | 红色节点 |
| `.timeline-widget__node-circle--purple` | 紫色节点 |
| `.timeline-widget__node-circle--orange` | 橙色节点 |
| `.timeline-widget__node-circle--gray` | 灰色节点 |
| `.timeline-widget__node-circle--yellow` | 黄色节点 |
| `.timeline-widget__node-circle--cyan` | 青色节点 |

## 📱 响应式断点

| 断点 | 屏幕宽度 | 布局 |
|------|---------|------|
| 桌面端 | > 768px | 完整布局（左右分栏）|
| 平板端 | ≤ 768px | 垂直堆叠布局 |
| 移动端 | ≤ 480px | 紧凑布局（居中对齐）|

## ♿ 无障碍特性

- ✅ 完整的ARIA标签支持
- ✅ 语义化HTML标签（`<time>`, `role="list"`, `role="listitem"`）
- ✅ 键盘导航支持
- ✅ 屏幕阅读器友好

## 🔧 技术细节

### JavaScript功能
- **滚动观察器**：使用 Intersection Observer API 实现滚动动画
- **降级处理**：不支持 IntersectionObserver 的浏览器自动降级
- **错误处理**：完善的 try-catch 包裹，确保健壮性
- **性能优化**：使用事件委托和防抖处理

### CSS特性
- **Flexbox布局**：灵活的响应式布局
- **CSS变量**：易于主题定制
- **BEM命名**：清晰的类名结构
- **平滑过渡**：所有交互效果都有流畅动画

## 🌐 浏览器支持

| 浏览器 | 最低版本 | 说明 |
|--------|---------|------|
| Chrome | 60+ | 完整支持 |
| Firefox | 55+ | 完整支持 |
| Safari | 12+ | 完整支持 |
| Edge | 79+ | 完整支持 |
| IE | ❌ | 不支持 |

## 📦 依赖

- **Font Awesome 6.x**：图标库
- **现代浏览器**：支持 CSS Flexbox 和 Grid
- **Intersection Observer API**：滚动动画（可降级）

## 🔄 版本历史

### v2.0.0 (当前版本)
- ✨ 新增高亮显示功能
- 🎨 新增黄色和青色主题
- 🎯 新增4个图标选项（灯泡、日历、目标、毕业帽）
- ♿ 完善无障碍支持
- 🚀 添加实时预览功能
- 💪 增强错误处理和降级支持
- 📝 优化字段说明和帮助文本

### v1.0.0
- 🎉 初始版本发布
- 基础时间线功能
- 3种布局样式
- 8种图标和6种颜色
