# 时间条小部件 (Timeline Widget)

一个用于展示时间线事件的响应式小部件，支持多种布局样式和动画效果。

## 功能特性

- 🎨 **多种布局样式**：支持交替、左对齐、右对齐布局
- 🎯 **丰富的图标选择**：内置8种常用图标
- 🌈 **多种颜色主题**：6种节点颜色可选
- 📱 **完全响应式**：移动端自适应布局
- ✨ **动画效果**：可选的滚动动画
- 🎛️ **灵活配置**：支持最多20个时间线项目

## 字段配置

### 基本设置
- **标题**：时间条的标题（可选）
- **时间线项目**：添加最多20个时间线项目

### 时间线项目字段
- **年份**：事件的年份（必填）
- **事件标题**：事件的主要标题（必填）
- **事件描述**：事件的详细描述（可选）
- **图标**：选择显示在节点中的图标
- **节点颜色**：选择节点的背景颜色

### 样式设置
- **布局样式**：选择整体布局方式
- **启用动画**：是否启用滚动动画效果

## 使用示例

```html
<!-- 基本用法 -->
<section class="timeline-widget">
  <div class="timeline-widget__container">
    <div class="timeline-widget__item">
      <div class="timeline-widget__content timeline-widget__content--right">
        <h3 class="timeline-widget__year">2013年</h3>
        <h4 class="timeline-widget__item-title">公司成立</h4>
        <p class="timeline-widget__description">烂笔头机械有限公司正式成立</p>
      </div>
      <div class="timeline-widget__node">
        <div class="timeline-widget__node-circle timeline-widget__node-circle--blue">
          <i class="fa-solid fa-check"></i>
        </div>
      </div>
      <div class="timeline-widget__spacer"></div>
    </div>
  </div>
</section>
```

## 样式类说明

### 主要容器类
- `.timeline-widget` - 主容器
- `.timeline-widget__container` - 时间线容器
- `.timeline-widget__item` - 单个时间线项目

### 内容类
- `.timeline-widget__content` - 内容区域
- `.timeline-widget__year` - 年份显示
- `.timeline-widget__item-title` - 事件标题
- `.timeline-widget__description` - 事件描述

### 节点类
- `.timeline-widget__node` - 中心节点容器
- `.timeline-widget__node-circle` - 节点圆圈
- `.timeline-widget__node-circle--[color]` - 颜色变体

### 布局修饰符
- `.timeline-widget__item--reverse` - 反向布局
- `.timeline-widget__content--left/right` - 内容对齐
- `.timeline-widget__item--animate` - 动画效果

## 响应式断点

- **桌面端**：> 768px - 完整布局
- **平板端**：≤ 768px - 垂直堆叠布局
- **移动端**：≤ 480px - 紧凑布局

## 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 依赖

- Font Awesome 6.x (图标)
- 现代浏览器 CSS Grid/Flexbox 支持
