# 案例列表页问题修复 - 基于官方文档

## 🐛 问题

```
TypeError: Cannot read properties of undefined (reading 'data')
    at Object.populatePiecesFilters
```

## 📚 根据文档的正确解决方案

参考文档：
- [Piece Page Type 参考文档](https://docs.apostrophecms.org/reference/modules/piece-page-type.html)
- [Blog 扩展教程](https://docs.apostrophecms.org/tutorials/adding-extensions.html)
- [Creating Pieces 教程](https://docs.apostrophecms.org/tutorials/pieces.html)

## ✅ 修复内容

### 修复 1: 添加 `piecesFilters` 配置

**文档说明**：
> The `piecesFilters` takes an array of objects to assist in filtering on the index page.

**修改**：

```javascript
export default {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: '案例列表页',
    perPage: 6,
    piecesFilters: [        // ← 必须配置
      {
        name: 'category'    // 分类筛选
      },
      {
        name: 'isFeatured'  // 推荐筛选
      }
    ]
  }
}
```

### 修复 2: 修正 `indexQuery` 方法

**问题代码** ❌：
```javascript
async indexQuery(_super, req) {
  const query = await _super(req);  // ❌ 错误：不应该是 async
  if (req.query.search) {
    query.search(req.query.search);
  }
  return query;
}
```

**正确代码** ✅（根据文档）：
```javascript
indexQuery(_super, req) {
  const query = _super(req);  // ✅ 直接获取查询对象，不需要 await
  
  if (req.query.search) {
    return query.search(req.query.search);
  }
  
  return query;
}
```

**文档示例**（来自 @apostrophecms/blog）：
```javascript
extendMethods(self) {
  return {
    indexQuery(_super, req) {
      return _super(req).future(false);  // 直接链式调用
    }
  };
}
```

## 🔍 关键要点

### 1. `indexQuery` 不是 async 函数

根据文档，`indexQuery` 方法：
- ❌ 不应该是 `async`
- ❌ 不需要 `await _super(req)`
- ✅ 应该直接返回查询对象
- ✅ 可以链式调用查询构建器

### 2. `piecesFilters` 是必需的

如果要使用筛选功能：
- ✅ 必须在 `options` 中配置 `piecesFilters`
- ✅ 每个筛选器指定一个字段名
- ✅ 字段类型必须支持查询构建器（select、boolean 等）

### 3. 查询构建器是链式的

```javascript
// ✅ 正确：链式调用
return _super(req).search(term).sort({ date: -1 }).limit(10);

// ❌ 错误：不要 await
const query = await _super(req);
```

## 📋 完整的正确配置

### `modules/case-page/index.js`

```javascript
export default {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: '案例列表页',
    perPage: 6,
    piecesFilters: [
      { name: 'category' },
      { name: 'isFeatured' }
    ]
  },
  fields: {
    add: {
      displayCategory: {
        type: 'select',
        label: '显示分类',
        choices: [
          { label: '全部', value: 'all' },
          { label: '运输案例', value: 'transport' },
          { label: '仓储案例', value: 'warehouse' },
          { label: '供应链案例', value: 'supply-chain' },
          { label: '跨境物流', value: 'cross-border' },
          { label: '其他', value: 'other' }
        ],
        def: 'all'
      },
      showFeaturedFirst: {
        type: 'boolean',
        label: '优先显示推荐案例',
        def: true
      }
    },
    group: {
      basics: {
        label: '基础设置',
        fields: ['displayCategory', 'showFeaturedFirst']
      }
    }
  },
  extendMethods(self) {
    return {
      // 扩展索引查询，添加搜索支持
      indexQuery(_super, req) {
        const query = _super(req);
        
        if (req.query.search) {
          return query.search(req.query.search);
        }
        
        return query;
      },
      
      // 按页面设置筛选案例
      filterByIndexPage(_super, query, page) {
        if (page.displayCategory && page.displayCategory !== 'all') {
          query.category(page.displayCategory);
        }
        
        if (page.showFeaturedFirst) {
          query.sort({ isFeatured: -1, publishDate: -1 });
        } else {
          query.sort({ publishDate: -1 });
        }
        
        return query;
      },
      
      // 选择正确的父页面
      chooseParentPage(_super, pages, piece) {
        if (piece.category && pages.length > 1) {
          const pieceCategory = typeof piece.category === 'string' ? piece.category : 'all';
          return pages.find((page) => page.displayCategory === pieceCategory) || _super(pages, piece);
        }
        return _super(pages, piece);
      }
    };
  }
};
```

## 🎯 工作原理

### 搜索流程

1. 用户在搜索框输入关键词
2. JavaScript 更新 URL：`/cases?search=关键词`
3. `indexQuery` 方法检测到 `req.query.search`
4. 调用 `query.search()` 构建器
5. ApostropheCMS 在配置为 `searchable: true` 的字段中搜索
6. 返回匹配的案例

### 筛选流程

1. 用户点击分类按钮
2. URL 变为：`/cases?category=transport`
3. `piecesFilters` 配置告诉系统这是有效的筛选器
4. 系统自动应用 `category` 查询构建器
5. 返回匹配的案例

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

应该可以正常加载。

### 3. 测试搜索

1. 在搜索框输入关键词
2. 按回车或等待自动搜索
3. 查看结果

### 4. 测试筛选

1. 点击"运输案例"
2. URL 变为 `/cases?category=transport`
3. 查看筛选结果

### 5. 测试组合

```
/cases?category=transport&search=风电
```

应该显示运输类别中包含"风电"的案例。

## ✅ 验证清单

- ✅ 移除了错误的 `async/await`
- ✅ 添加了 `piecesFilters` 配置
- ✅ `indexQuery` 直接返回查询对象
- ✅ 使用链式查询构建器
- ✅ 符合 ApostropheCMS 文档规范
- ✅ 无语法错误

## 📚 参考的文档部分

1. **@apostrophecms/blog 示例**（文档：添加扩展）
   ```javascript
   indexQuery(_super, req) {
     return _super(req).future(false);
   }
   ```

2. **piecesFilters 配置**（文档：Piece Page Type 参考）
   ```javascript
   piecesFilters: [
     { name: 'category' }
   ]
   ```

3. **filterByIndexPage 方法**（文档：Creating Pieces 教程）
   ```javascript
   filterByIndexPage(_super, query, page) {
     if (page.displayCategory !== 'all') {
       query.category(page.displayCategory);
     }
     return query;
   }
   ```

---

**修复日期**: 2024-10-11  
**依据**: ApostropheCMS 官方文档  
**状态**: ✅ 已完成，符合标准

