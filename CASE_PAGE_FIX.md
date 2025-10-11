# 案例列表页错误修复说明

## 🐛 错误信息

```
TypeError: Cannot read properties of undefined (reading 'data')
    at Object.populatePiecesFilters
```

## 🔍 问题原因

`case-page` 模块缺少必需的 `piecesFilters` 配置。

根据 [ApostropheCMS 文档](https://docs.apostrophecms.org/reference/modules/piece-page-type.html#piecesfilters)：
- piece-page-type 模块如果要使用筛选功能，必须配置 `piecesFilters`
- `piecesFilters` 告诉系统哪些字段可以用于筛选
- 没有这个配置，`data.piecesFilters` 会是 undefined，导致模板错误

## ✅ 解决方案

在 `modules/case-page/index.js` 的 `options` 中添加 `piecesFilters` 配置。

### 修改前

```javascript
export default {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: '案例列表页',
    perPage: 6
  },
  // ...
}
```

### 修改后

```javascript
export default {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: '案例列表页',
    perPage: 6,
    piecesFilters: [
      {
        name: 'category'      // 分类筛选
      },
      {
        name: 'isFeatured'    // 推荐筛选
      }
    ]
  },
  // ...
}
```

## 📋 配置说明

### `piecesFilters` 数组

每个对象指定一个可筛选的字段：

| 配置项 | 说明 |
|-------|------|
| `name: 'category'` | 启用按分类筛选，对应 `case` 模块中的 `category` 字段 |
| `name: 'isFeatured'` | 启用按推荐状态筛选，对应 `isFeatured` 字段 |

### 可选配置

可以添加 `counts: true` 来显示每个筛选项的数量：

```javascript
piecesFilters: [
  {
    name: 'category',
    counts: true  // 显示每个分类有多少个案例
  }
]
```

### 支持的字段类型

以下字段类型会自动创建查询构建器，可以用于 `piecesFilters`：

- ✅ `boolean` - 布尔值（如 isFeatured）
- ✅ `select` - 选择框（如 category）
- ✅ `checkboxes` - 多选框
- ✅ `date` - 日期
- ✅ `integer` - 整数
- ✅ `float` - 浮点数
- ✅ `relationship` - 关系字段
- ✅ `string` - 字符串
- ✅ `slug` - URL别名
- ✅ `url` - URL

## 🎯 效果

添加 `piecesFilters` 后：

1. **前台筛选器可用**
   - URL参数 `?category=transport` 可以筛选运输案例
   - URL参数 `?isFeatured=true` 可以筛选推荐案例

2. **模板数据可用**
   - `data.piecesFilters.category` - 包含所有分类选项
   - `data.piecesFilters.isFeatured` - 包含推荐状态选项

3. **无错误**
   - `populatePiecesFilters` 方法可以正常工作
   - 页面正常加载

## 🔧 如何工作

### 后端处理

当访问案例列表页时，ApostropheCMS 会：

1. 读取 `piecesFilters` 配置
2. 查询数据库，获取所有可用的筛选值
3. 将筛选数据添加到 `req.data.piecesFilters`
4. 根据 URL 参数筛选案例

### 前端显示

在模板中使用筛选数据：

```nunjucks
{# 遍历分类筛选器 #}
{% for filter in data.piecesFilters.category %}
  <a href="{{ data.page._url | build({category: filter.value}) }}">
    {{ filter.label }}
  </a>
{% endfor %}
```

## 📚 参考文档

- [Piece Page Type 文档](https://docs.apostrophecms.org/reference/modules/piece-page-type.html#piecesfilters)
- [Query Builders 文档](https://docs.apostrophecms.org/reference/query-builders.html)
- [Piece Pages 指南](https://docs.apostrophecms.org/guide/piece-pages.html)

## 🚀 测试步骤

### 1. 重启应用

```bash
# 按 Ctrl+C 停止
npm run dev
```

### 2. 访问案例列表页

```
http://localhost:3000/cases
```

应该可以正常加载，不再报错。

### 3. 测试筛选功能

点击分类按钮，URL应该变化，案例列表应该相应筛选。

例如：
```
点击"运输案例" → URL变为 /cases?category=transport
点击"推荐案例" → URL变为 /cases?isFeatured=true
```

## ✅ 验证清单

- ✅ 添加了 `piecesFilters` 配置
- ✅ 包含 `category` 筛选器
- ✅ 包含 `isFeatured` 筛选器
- ✅ 无语法错误
- ✅ 配置符合文档规范

## 💡 扩展建议

### 添加标签筛选

```javascript
piecesFilters: [
  {
    name: 'category'
  },
  {
    name: 'isFeatured'
  },
  {
    name: 'articleTag',  // 添加标签筛选
    counts: true
  }
]
```

### 添加来源筛选

```javascript
piecesFilters: [
  // ... 现有筛选器
  {
    name: 'source',     // 添加来源筛选
    counts: true
  }
]
```

---

**修复日期**: 2024-10-11  
**问题**: 缺少 piecesFilters 配置  
**状态**: ✅ 已修复

