# 管理后台菜单分组配置指南

## 📋 概述

本文档说明如何在 ApostropheCMS 中正确配置管理后台的菜单分组。

## ✅ 正确的配置方法

### 配置位置

**唯一的配置文件**：`modules/@apostrophecms/admin-bar/index.js`

所有菜单分组都在这个文件中配置，**不需要**在各个 piece-type 模块中配置。

### 基本配置结构

```javascript
export default {
  options: {
    groups: [
      {
        name: 'content',           // 分组唯一标识
        label: '内容管理',          // 显示名称
        items: [                   // 包含的模块列表
          'news-page',
          'case',
          'product'
        ]
      }
    ]
  }
};
```

## 📝 完整配置示例

```javascript
export default {
  options: {
    groups: [
      {
        name: 'content',
        label: '内容管理',
        items: [
          'news-page',        // 新闻文章
          'news-type',        // 新闻类型
          'case',             // 案例
          'product',          // 产品
          'product-type',     // 产品类型
          'team-member'       // 团队成员
        ]
      },
      {
        name: 'forms',
        label: '表单管理',
        items: [
          '@apostrophecms/form'
        ]
      },
      {
        name: 'media',
        label: '媒体管理',
        items: [
          '@apostrophecms/image',
          '@apostrophecms/file',
          '@apostrophecms/image-tag',
          '@apostrophecms/file-tag'
        ]
      },
      {
        name: 'admin',
        label: '系统管理',
        items: [
          '@apostrophecms/user'
        ]
      }
    ]
  }
};
```

## 🎯 配置说明

### 模块名称规则

1. **核心模块**：使用完整的模块名（带前缀）
   - 例如：`'@apostrophecms/image'`, `'@apostrophecms/user'`

2. **自定义模块**：直接使用模块名
   - 例如：`'product'`, `'case'`, `'news-page'`

### 分组对象属性

| 属性 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `name` | string | ✅ | 分组的唯一标识符 |
| `label` | string | ✅ | 在管理后台显示的分组名称 |
| `items` | array | ✅ | 包含在此分组中的模块名称列表 |

### 注意事项

1. **Pages 模块特殊性**
   - `@apostrophecms/page` 总是显示在最前面
   - 不能被分组或重新排序
   - 这是 ApostropheCMS 的设计决定

2. **模块顺序**
   - `items` 数组中的顺序决定菜单显示顺序
   - 从上到下依次显示

3. **未分组的模块**
   - 未包含在任何分组中的模块会作为独立菜单项显示
   - 显示在所有分组之后

## 🔧 常见操作

### 添加新模块到分组

在对应分组的 `items` 数组中添加模块名：

```javascript
{
  name: 'content',
  label: '内容管理',
  items: [
    'news-page',
    'case',
    'your-new-module'  // 新添加的模块
  ]
}
```

### 移除模块从分组

从 `items` 数组中删除模块名：

```javascript
{
  name: 'content',
  label: '内容管理',
  items: [
    'news-page',
    // 'case'  // 已移除
    'product'
  ]
}
```

### 创建新分组

在 `groups` 数组中添加新对象：

```javascript
groups: [
  // 现有分组...
  {
    name: 'marketing',
    label: '营销工具',
    items: [
      'campaign',
      'newsletter'
    ]
  }
]
```

### 重命名分组

修改分组的 `label` 属性：

```javascript
{
  name: 'content',
  label: '内容中心',  // 从"内容管理"改为"内容中心"
  items: [...]
}
```

### 调整模块顺序

在 `items` 数组中调整模块的位置：

```javascript
items: [
  'product',      // 移到第一位
  'news-page',
  'case'
]
```

## 🌐 国际化支持

如果您的项目支持多语言，建议使用翻译键：

```javascript
{
  name: 'content',
  label: 'myproject:content',  // 使用翻译键
  items: [...]
}
```

然后在翻译文件中定义：

```json
// modules/@apostrophecms/i18n/i18n/zh.json
{
  "myproject:content": "内容管理"
}

// modules/@apostrophecms/i18n/i18n/en.json
{
  "myproject:content": "Content Management"
}
```

**重要**：不要使用 `apos` 命名空间，使用自定义前缀如 `myproject`。

## 📊 最佳实践

### 1. 按工作流分组

根据内容管理者的工作流程组织菜单：

```javascript
// ✅ 好的分组
{
  name: 'content',
  label: '内容创作',
  items: ['article', 'news', 'case']
}

// ❌ 不好的分组
{
  name: 'stuff',
  label: '其他',
  items: ['article', 'user', 'setting']
}
```

### 2. 保持分组数量合理

- 建议不超过 5-6 个分组
- 每个分组包含 3-6 个模块
- 过多的分组会降低效率

### 3. 使用清晰的标签

```javascript
// ✅ 清晰的标签
label: '媒体管理'
label: '内容创作'

// ❌ 模糊的标签
label: '东西'
label: '文件'
```

### 4. 相关功能放在一起

```javascript
{
  name: 'product',
  label: '产品管理',
  items: [
    'product',        // 产品
    'product-type',   // 产品类型
    'product-tag'     // 产品标签
  ]
}
```

## ❌ 错误的配置方法

**不要**在各个 piece-type 模块中配置 `group`：

```javascript
// ❌ 错误！不要这样做
export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: '产品',
    group: {  // 这不会起作用
      name: 'content',
      label: '内容管理'
    }
  }
};
```

**正确做法**：只在 `@apostrophecms/admin-bar` 中配置。

## 🚀 应用配置

### 步骤

1. 编辑 `modules/@apostrophecms/admin-bar/index.js`
2. 配置 `groups` 选项
3. 重启应用：`npm run dev`
4. 登录管理后台查看效果

### 验证配置

登录管理后台，检查：
- ✅ 分组是否显示
- ✅ 模块是否在正确的分组中
- ✅ 顺序是否正确
- ✅ 标签是否显示正确

## 📚 参考资源

- [ApostropheCMS Admin Bar 文档](https://docs.apostrophecms.org/reference/modules/admin-bar.html)
- [Admin Bar 最佳实践教程](https://docs.apostrophecms.org/tutorials/admin-bar-best-practices.html)

## 💡 示例场景

### 场景 1：内容网站

```javascript
groups: [
  {
    name: 'content',
    label: '内容',
    items: ['article', 'news', 'page-content']
  },
  {
    name: 'media',
    label: '媒体',
    items: ['@apostrophecms/image', '@apostrophecms/file']
  }
]
```

### 场景 2：电商网站

```javascript
groups: [
  {
    name: 'products',
    label: '产品管理',
    items: ['product', 'product-category', 'product-brand']
  },
  {
    name: 'orders',
    label: '订单管理',
    items: ['order', 'customer']
  }
]
```

### 场景 3：企业网站

```javascript
groups: [
  {
    name: 'content',
    label: '内容管理',
    items: ['news', 'case', 'product', 'team-member']
  },
  {
    name: 'marketing',
    label: '营销',
    items: ['form', 'subscription']
  }
]
```

---

**最后更新**: 2024-10-11  
**适用版本**: ApostropheCMS 4.x  
**状态**: ✅ 已验证

