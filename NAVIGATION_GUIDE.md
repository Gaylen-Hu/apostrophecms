# ApostropheCMS 导航系统指南

本指南介绍如何使用和自定义ApostropheCMS导航系统，该系统基于官方教程和现代UI设计最佳实践构建。

## 🚀 功能特性

### 核心功能
- ✅ **响应式设计** - 完美适配桌面端和移动端
- ✅ **多级子菜单** - 支持复杂的导航结构
- ✅ **徽章系统** - 显示通知数量或状态标识
- ✅ **面包屑导航** - 自动生成当前位置指示
- ✅ **用户菜单** - 集成用户操作和设置
- ✅ **搜索功能** - 可扩展的搜索接口
- ✅ **无障碍访问** - 完整的ARIA标签和键盘导航
- ✅ **深色模式** - 自动适应系统主题偏好

### 导航类型
1. **主要导航** - 页面顶部的主要导航菜单
2. **页面树导航** - 基于ApostropheCMS页面结构自动生成
3. **面包屑导航** - 显示当前页面位置
4. **页脚导航** - 快速链接和社交媒体链接

## 📁 文件结构

```
views/fragments/
├── navigation.html          # 导航片段模板
├── header.html             # 头部模板
└── footer.html             # 页脚模板

modules/asset/ui/src/
├── scss/
│   └── _navigation.scss    # 导航样式文件
└── js/
    └── navigation.js       # 导航交互功能

modules/@apostrophecms/global/
└── index.js                # 全局导航配置
```

## ⚙️ 配置导航

### 1. 在管理界面中配置

1. 登录ApostropheCMS管理界面
2. 进入"全局设置" → "导航"
3. 添加或编辑导航项目：

#### 基本配置
- **导航标签** - 显示在导航中的文本
- **链接类型** - 选择"页面"或"自定义URL"
- **目标页面** - 如果选择页面链接，选择要链接的页面
- **自定义URL** - 如果选择自定义链接，输入完整URL

#### 高级配置
- **有子菜单** - 启用多级菜单
- **子菜单项目** - 配置子菜单项
- **徽章文本** - 显示在链接旁边的徽章
- **新窗口打开** - 设置链接在新标签页打开

### 2. 配置示例

```javascript
// 在 modules/@apostrophecms/global/index.js 中
headerNav: {
  label: '头部导航项目',
  type: 'array',
  titleField: 'linkText',
  limit: 8,
  fields: {
    add: {
      // 基本链接字段
      linkText: { type: 'string', label: '链接文本' },
      linkUrl: { type: 'url', label: '链接URL' },
      
      // 子菜单支持
      hasSubmenu: { type: 'boolean', label: '有子菜单' },
      submenuItems: { type: 'array', /* 子菜单配置 */ },
      
      // 徽章系统
      badge: { type: 'string', label: '徽章文本' },
      
      // 新窗口打开
      target: { type: 'checkboxes', choices: [{ label: '新窗口打开', value: '_blank' }] }
    }
  }
}
```

## 🎨 自定义样式

### 1. 修改导航颜色

```scss
// 在 modules/asset/ui/src/scss/_navigation.scss 中
$nav-bg: #your-background-color;
$nav-text: #your-text-color;
$nav-primary: #your-primary-color;
$nav-bg-hover: #your-hover-background;
```

### 2. 调整导航高度

```scss
$nav-height: 80px; // 默认64px
```

### 3. 自定义Logo样式

```scss
.nav-logo .logo-link {
  font-size: 1.5rem;
  font-weight: 700;
  color: #your-logo-color;
}
```

### 4. 修改移动端菜单

```scss
.mobile-menu {
  background: #your-mobile-menu-bg;
  border-bottom: 2px solid #your-border-color;
}
```

## 📱 移动端优化

### 响应式断点
- **桌面端**: > 1024px - 显示完整导航菜单
- **平板端**: 768px - 1024px - 调整布局
- **移动端**: < 768px - 显示汉堡菜单

### 移动端特性
- 触摸友好的大按钮
- 全屏菜单覆盖
- 滑动手势支持
- 用户信息显示
- 键盘导航支持

## 🔧 高级功能

### 1. 添加搜索功能

```javascript
// 在 navigation.js 中扩展搜索功能
setupSearchInteractions() {
  const searchBtn = document.querySelector('.search-btn');
  
  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // 实现搜索功能
      this.openSearchModal();
    });
  }
}
```

### 2. 自定义用户菜单

```html
<!-- 在 navigation.html 中修改用户菜单 -->
<div class="user-dropdown">
  <a href="/admin" class="dropdown-item">管理面板</a>
  <a href="/profile" class="dropdown-item">个人资料</a>
  <a href="/settings" class="dropdown-item">设置</a>
  <div class="dropdown-divider"></div>
  <a href="/logout" class="dropdown-item">退出登录</a>
</div>
```

### 3. 添加滚动效果

```javascript
// 导航滚动隐藏/显示效果
addScrollEffect() {
  const nav = document.querySelector('.main-navigation');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}
```

## 🌐 国际化支持

### 1. 添加多语言导航

```html
<!-- 在模板中使用本地化 -->
<a href="{{ path }}" class="nav-link">
  {{ __t('myApp:nav_home') }}
</a>
```

### 2. 配置语言切换器

```html
<!-- 语言切换器组件 -->
<div class="language-switcher">
  <a href="{{ apos.helper.url(data.page, { locale: 'zh' }) }}">中文</a>
  <a href="{{ apos.helper.url(data.page, { locale: 'en' }) }}">English</a>
</div>
```

## 🧪 测试和调试

### 1. 测试导航功能

```bash
# 启动开发服务器
npm run dev

# 访问导航演示页面
http://localhost:3000/navigation-demo
```

### 2. 调试移动端菜单

```javascript
// 在浏览器控制台中测试
const navManager = new NavigationManager();
navManager.toggleMobileMenu();
```

### 3. 检查无障碍访问

- 使用屏幕阅读器测试
- 检查键盘导航
- 验证ARIA标签
- 测试颜色对比度

## 📚 最佳实践

### 1. 导航设计原则
- 保持导航结构简单清晰
- 限制顶级菜单项数量（建议5-7个）
- 使用描述性的链接文本
- 提供面包屑导航帮助用户定位

### 2. 性能优化
- 使用CSS动画而非JavaScript动画
- 延迟加载非关键JavaScript
- 优化图片和图标资源
- 使用CDN加速静态资源

### 3. 用户体验
- 确保导航在所有设备上都能正常工作
- 提供清晰的视觉反馈
- 支持键盘导航
- 保持一致的交互模式

## 🐛 常见问题

### Q: 移动端菜单不显示？
A: 检查CSS媒体查询和JavaScript是否正确加载。

### Q: 子菜单不工作？
A: 确保在全局设置中启用了"有子菜单"选项并配置了子菜单项。

### Q: 导航样式不正确？
A: 检查SCSS文件是否正确编译，确保没有CSS冲突。

### Q: 面包屑不显示？
A: 确保页面在ApostropheCMS中有正确的层级结构。

## 🔗 相关资源

- [ApostropheCMS官方文档](https://docs.apostrophecms.org/)
- [导航教程](https://docs.apostrophecms.org/tutorials/)
- [模板开发指南](https://docs.apostrophecms.org/guide/templating/)
- [国际化指南](https://docs.apostrophecms.org/guide/localization/)

## 📄 许可证

本项目基于MIT许可证开源。详见LICENSE文件。

---

**需要帮助？** 如果您在使用过程中遇到问题，请查看文档或提交Issue。
